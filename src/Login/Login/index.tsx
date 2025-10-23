import React from "react";
import { Box, Grid } from "@mui/material";
import { LoginPageInfo } from "./LoginPageInfo";
import { Login } from "./LoginInicio";

export const IndexLogin = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Grid container sx={{ flex: 1, height: "100%" }}>
        {/* Sección izquierda */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: "100%", overflow: "hidden" }}>
          <LoginPageInfo />
        </Grid>

        {/* Sección derecha */}
        <Grid size={{ xs: 12, md: 6 }} sx={{ height: "100%", overflow: "hidden" }}>
          <Login />
        </Grid>
      </Grid>
    </Box>
  );
};
