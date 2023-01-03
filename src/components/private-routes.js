import React from "react";
import { Box, CircularProgress } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router"
import useAuth from "../hooks/auth.hooks";

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


const PrivateRoutes = (props) => {
  const { profile } = useAuth();

  useEffect(() => {
    console.log({ profile });
  }, [profile]);

  return (profile ? <Outlet {...props} profile={profile} /> : <Loader />)
}

export default PrivateRoutes;