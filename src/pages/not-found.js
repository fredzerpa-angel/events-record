import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, Typography } from '@mui/material';

export const NotFound = () => (
  <Box
    sx={{
      width: '100%',
      height: '100vh',
      background: `url('/static/404-background.jpg') center center no-repeat`,
      backgroundSize: 'cover'
    }}
  >
    <Container
      maxWidth="md"
      sx={{
        height: '100%',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <img
        src='/static/404-message.png'
        width='100%'
        height='auto'
        alt='404 Not Found'
      />
      <Typography
        align="center"
        color="white"
        variant="body2"
        mt={3}
      >
        Te has salido de las trayectorias programadas.
      </Typography>
      <Button
        color="primary"
        component={RouterLink}
        sx={{ mt: 2 }}
        to="/"
        variant='contained'
        size='large'
      >
        Regresar a casa
      </Button>
    </Container>
  </Box>
);
