import { useEffect, useState, useContext, createContext } from "react";
import { useLocation, useNavigate } from 'react-router-dom';
import useCookies from 'react-cookie/cjs/useCookies';
import { DateTime } from 'luxon';
import { googleLogout } from "@react-oauth/google";
import { useCallback } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';
import { mongoLogIn } from "../database/mongo";

export const AuthContext = createContext({ profile: null });

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({ children }) {
  const auth = useAuthProvider();
  return (
    <AuthContext.Provider value={auth}>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <CookiesProvider>
          {children}
        </CookiesProvider>
      </GoogleOAuthProvider>
    </AuthContext.Provider>
  );
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(AuthContext);
};

const useAuthProvider = () => {
  const [profile, setProfile] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['profile']);
  const navigate = useNavigate();
  const location = useLocation();

  const loadUser = useCallback(async (userData) => {
    // No need to repeat everythin if profile is already setted
    if (profile) return;

    // Set Database Auth
    await mongoLogIn();
    // Set Auth hook data
    setProfile(userData);

    // Go to Dashboard
    const isOnLoginPage = location.pathname.includes('login');
    if (isOnLoginPage) navigate('/', { replace: true });
  }, [location, navigate, profile]);

  const goToLoginPage = useCallback(() => {
    const isOnLoginPage = location.pathname.includes('login');
    if (!isOnLoginPage) navigate('/login', { replace: true });
  }, [location, navigate])

  // Load logged-in user
  useEffect(() => {
    const { profile } = cookies;
    profile ? loadUser(profile) : goToLoginPage();
    console.log({ profile });
  }, [cookies, goToLoginPage, loadUser])

  const login = useCallback((profile) => {
    const currentDateTime = DateTime.now();
    const twoMonthsDate = currentDateTime.plus({ months: 2 }).diffNow();
    setCookie('profile', profile, {
      path: '/',
      secure: true,
      maxAge: twoMonthsDate.as('seconds'), // Remember user profile for 2 months 
    });
    // Do not use Load User here, because the setCookie will render the useEffect again
  }, [setCookie])

  const logout = useCallback(() => {
    googleLogout();
    removeCookie('profile');
    setProfile(null);
  }, [removeCookie])

  const onEmailSignIn = useCallback(() => { }, []) // TODO

  const onGoogleLoginSuccess = useCallback((credentialData = {}) => {
    // Take only required information - Remove unnecessary info
    const { picture, email, name: fullName, given_name: firstName, family_name: lastName } = credentialData;
    const googleProfile = { picture, email, fullName, firstName, lastName };
    login(googleProfile);
  }, [login])

  const onGoogleLoginFailure = useCallback((err) => {
    console.log('Google failed:', err);
    logout();
  }, [logout]);

  return {
    profile,
    onGoogleLoginSuccess,
    onGoogleLoginFailure,
    onEmailSignIn,
    logout,
  };
}