import React from "react";
import { Box, Grid } from "@mui/material";
import { RecoverPasswordPageInfo } from "./RecuperarContasenaInfo";
import { RecuperarContasena } from "./RecuperarContasena";

export const IndexRecuperarContrasena = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Grid container sx={{ flex: 1, height: "100%" }}>
        {/* Sección izquierda */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ height: "100%", overflow: "hidden" }}
        >
          <RecoverPasswordPageInfo />
        </Grid>

        {/* Sección derecha */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{ height: "100%", overflow: "hidden" }}
        >
          <RecuperarContasena />
        </Grid>
      </Grid>
    </Box>
  );
};
