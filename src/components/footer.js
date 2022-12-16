import { Box, Container, Link, Typography } from '@mui/material';

export const Footer = () => (
  <Box component="footer">
    <Container maxWidth="lg">
      <Box
        sx={{
          backgroundColor: '#F5F5F5',
          display: 'flex',
          flexDirection: {
            md: 'row',
            xs: 'column'
          },
          marginBottom: 6,
          p: 3,
          '& a': {
            mt: {
              md: 0,
              xs: 2
            }
          }
        }}
      >
        <Typography
          color="textSecondary"
          variant="body2"
        >
          © {new Date().getFullYear()} ASOCOL
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Link
          color="textSecondary"
          href="https://elangel.edu.ve/"
          sx={{ px: 1 }}
          target="_blank"
          underline="hover"
          variant="body2"
        >
          U.E. El Angel
        </Link>
      </Box>
    </Container>
  </Box>
);
