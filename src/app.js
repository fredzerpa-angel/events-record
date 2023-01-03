import { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import routes from './routes';
import { mongoApp, mongoLogIn } from './database/mongo';
import { AuthProvider } from './hooks/auth.hooks';

const App = () => {
  const [dbUser, setDbUser] = useState(mongoApp.currentUser);
  const content = useRoutes(routes);

  useEffect(() => {
    // Log In so we can acces the DB
    if (!dbUser) {
      (async () => setDbUser(await mongoLogIn()))();
    }
  }, [dbUser]);

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {content}
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
