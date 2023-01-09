import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import {
  Avatar,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { AuthContext } from '../hooks/auth.hooks';
import SquaresBG from 'react-animated-squares';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://elangel.edu.ve/">
        U.E. El Angel
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Login = () => {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { onGoogleLoginSuccess, onGoogleLoginFailure } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();

  const onFormSubmit = async (data, e) => {
    setIsLoggingIn(true);
    console.log({ data })
    // const response = await loginByEmail(data);
    setIsLoggingIn(false);
  };
  const onFormError = (errors, e) => console.error(errors, e);

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={false} sm={4} md={7}>
        <SquaresBG count={20} speed={0.7} />
      </Grid>
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={0} square alignSelf='center'>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar
            alt='El Angel Logo'
            src={`${process.env.PUBLIC_URL}/logo.png`}
            sx={{
              m: 1, height: 200, width: 200
            }}
            variant='square'
          />
          <Typography component="h1" variant="h3" mb={2}>
            ¡Bienvenido de vuelta!
          </Typography>
          <Typography component="h2" variant="h5">
            Accede con tu cuenta Google
          </Typography>
          <Grid
            item
            xs={12}
            container
            justifyContent='center'
            sx={{
              mt: 1, mb: 2, width: '60%',
              // Google Button Style
              button: {
                width: '100%',
                maxWidth: '250px',
                span: {
                  width: '100%',
                  justifySelf: 'center'
                }
              }
            }}>
            <GoogleLogin
              onSuccess={credentialResponse => {
                const credentialData = jwtDecode(credentialResponse.credential); // Decode Token
                onGoogleLoginSuccess(credentialData)
              }}
              onError={onGoogleLoginFailure}
              useOneTap
              cancel_on_tap_outside={false}
            />
          </Grid>
          <Typography component="h2" variant="h5">
            O Accede con tu Email
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit(onFormSubmit, onFormError)}>
            <TextField
              {...register('email')}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              autoComplete="email"
              autoFocus
              disabled
              sx={{ mt: 1 }}
            />
            <TextField
              {...register('password')}
              margin="normal"
              required
              fullWidth
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              disabled
            />
            <FormControlLabel
              control={<Checkbox {...register('remember')} color="primary" />}
              label="Recuerdame"
              disabled
            />
            <LoadingButton
              loading={isLoggingIn}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled
            >
              Sign In
            </LoadingButton>
            <Copyright sx={{ mt: 5 }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Login;