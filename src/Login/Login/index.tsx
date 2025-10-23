import React from "react";
import { Box, Grid } from "@mui/material";
import { LoginPageInfo } from "./LoginPageInfo";
import { Login } from "./LoginInicio";

export const IndexLogin = () => {
  return (
    <Box
      sx={{
        height: "100vh", // altura exacta de la pantalla
        width: "100vw", // ancho exacto de la pantalla
        overflow: "hidden",
        bgcolor: "#f4f6f8",
        display: "flex",
      }}
    >
      <Grid
        container
        sx={{
          flex: 1,
          height: "100%",
          width: "100%",
          flexDirection: { xs: "column", md: "row" }, // apilado en móvil, lado a lado en escritorio
        }}
      >
        {/* Sección izquierda */}
        <Grid
          size={{ xs: 12, md: 6 }}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            bgcolor: "#f4f6f8",
            height: { xs: "50vh", md: "100vh" },
          }}
        >
          <LoginPageInfo />
        </Grid>

        {/* Sección derecha */}
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
          <Login />
        </Grid>
      </Grid>
    </Box>
  );
};
