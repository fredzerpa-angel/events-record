import { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import { routes } from './routes';
import { mongoApp, mongoLogIn } from './database/database';

const App = () => {
  const [user, setUser] = useState(mongoApp.currentUser);
  const content = useRoutes(routes);

  useEffect(() => {
    // Log In so we can acces the DB
    if (!user) {
      (async () => setUser(await mongoLogIn()))();
    }

    if (user) console.log(user);
  }, [user]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {content}
    </ThemeProvider>
  );
};

export default App;
