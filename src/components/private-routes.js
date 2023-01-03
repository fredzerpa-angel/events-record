import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { Outlet } from "react-router"
import { useAuth } from "../hooks/auth.hooks";

const Loader = () => (
  <Box
    sx={{
      display: 'flex',
      width: '100%',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <CircularProgress />
  </Box>
);


const PrivateRoutes = () => {
  const { profile } = useAuth();

  return (profile ? <Outlet /> : <Loader />)
}

export default PrivateRoutes;