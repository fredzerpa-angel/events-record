import { AppBar, Avatar, Box, Toolbar } from '@mui/material';
import { Logo } from './logo';

export const Navbar = () => (
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
      <Avatar
        alt="User"
      />
    </Toolbar>
  </AppBar>
);
