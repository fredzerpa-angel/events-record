import { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import routes from './routes';
import { mongoApp, mongoLogIn } from './database/mongo';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { CookiesProvider } from 'react-cookie';

const App = () => {
  const [dbUser, setDbUser] = useState(mongoApp.currentUser);
  const [oAuthScriptLoaded, setOAuthScriptLoaded] = useState(false);
  const content = useRoutes(routes);

  useEffect(() => {
    // Log In so we can acces the DB
    if (!dbUser) {
      (async () => setDbUser(await mongoLogIn()))();
    }
  }, [dbUser]);

  return (
    <CookiesProvider>
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} onScriptLoadSuccess={() => setOAuthScriptLoaded(true)}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {/* oAuthScriptLoaded helps with bugs on the oAuth library triggered because the script is not initialized */}
          {oAuthScriptLoaded ? content : null}
        </ThemeProvider>
      </GoogleOAuthProvider>
    </CookiesProvider>
  );
};

export default App;
