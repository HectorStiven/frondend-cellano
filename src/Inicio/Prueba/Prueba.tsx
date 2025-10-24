import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store"; // ajusta la ruta según tu estructura
import { Box, Button, Typography, Paper } from "@mui/material";
import { clearAuthData, setAccess, setAuthData } from "../../Login/toolkit/slice/AutenticacionRedux";

export const Prueba = () => {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);

  const handleLogin = () => {
    dispatch(setAuthData({ token: "ABC123TOKEN", nombreUsuario: "Stiven" }));
  };

  const handleLogout = () => {
    dispatch(clearAuthData());
  };

  const handleAccessToggle = () => {
    dispatch(setAccess(!auth.access));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper sx={{ p: 4, borderRadius: 3, textAlign: "center", boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          🔐 Prueba del Redux de Autenticación
        </Typography>

        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Token:</strong> {auth.token ?? "Ninguno"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Usuario:</strong> {auth.nombreUsuario ?? "Ninguno"}
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Acceso:</strong> {auth.access ? "✅ Permitido" : "❌ Denegado"}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mr: 1 }}
          onClick={handleLogin}
        >
          Iniciar Sesión
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          sx={{ mr: 1 }}
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Button>
        <Button variant="contained" color="warning" onClick={handleAccessToggle}>
          Cambiar Acceso
        </Button>
      </Paper>
    </Box>
  );
};
