import React from "react";
import { Box, Grid } from "@mui/material";
import { RecoverPasswordPageInfo } from "./RecuperarContasenaInfo";
import { RecuperarContasena } from "./RecuperarContasena";

export const IndexRecuperarContrasena = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        bgcolor: "#f4f6f8",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        sx={{
          height: "100%",
          width: "100%",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        {/* Panel izquierdo */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#e0f7fa",
            height: { xs: "50vh", md: "100vh" },
          }}
        >
          <RecoverPasswordPageInfo />
        </Grid>

        {/* Panel derecho */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#ffffff",
            height: { xs: "50vh", md: "100vh" },
          }}
        >
          <RecuperarContasena />
        </Grid>
      </Grid>
    </Box>
  );
};
