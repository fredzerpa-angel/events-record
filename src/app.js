import { useRoutes } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { theme } from './theme';
import routes from './routes';
import { AuthProvider } from './hooks/auth.hooks';

const App = () => {
  const content = useRoutes(routes);

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
