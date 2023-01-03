import { useEffect, useState, useContext, createContext } from "react";
import { useNavigate } from 'react-router-dom';
import useCookies from 'react-cookie/cjs/useCookies';
import { DateTime } from 'luxon';
import { googleLogout } from "@react-oauth/google";
import { useCallback } from "react";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';

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

  const signIn = useCallback(() => { }, []) // Use for Log-In Form
  const signOut = useCallback(() => {
    googleLogout();
    removeCookie('profile');
    setProfile(null);
  }, [removeCookie])

  const onGoogleLoginSuccess = (credentialData = {}) => {
    const currentDateTime = DateTime.now();
    const twoMonthsDate = currentDateTime.plus({ months: 2 }).diffNow();

    // Take only required information - Remove unnecessary info
    const { picture, email, name: fullName, given_name: firstName, family_name: lastName } = credentialData;
    const googleProfile = { picture, email, fullName, firstName, lastName };
    setCookie('profile', googleProfile, {
      path: '/',
      secure: true,
      maxAge: twoMonthsDate.as('seconds'), // Indicates the number of seconds until the cookie expires. 
    });
    navigate('/');
  }

  const onGoogleLoginFailure = (err) => {
    console.log('failed:', err);
    signOut();
  };

  // Load logged in user
  useEffect(() => {
    const { profile } = cookies;
    profile ? setProfile(profile) : navigate('/login');
    console.log({ profile });
  }, [cookies, setProfile, navigate])

  return {
    profile,
    onGoogleLoginSuccess,
    onGoogleLoginFailure,
    signIn,
    signOut,
  };
}