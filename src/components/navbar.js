import { AppBar, Box, Toolbar } from '@mui/material';
import AccountMenu from './account-menu';
import { Logo } from './logo';

const Navbar = () => (
  <AppBar
    elevation={1}
    sx={{ backgroundColor: '#ffffff' }}

  >
    <Toolbar
      disableGutters
      sx={{
        alignItems: 'center',
        display: 'flex',
        minHeight: 64,
        px: 3,
        py: 1
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          height: '48px',
          width: '200px',
          overflow: 'hidden'
        }}
      >
        <Logo />
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <AccountMenu />
    </Toolbar>
  </AppBar>
);

export default Navbar;