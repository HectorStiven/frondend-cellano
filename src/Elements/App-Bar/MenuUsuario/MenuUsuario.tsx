import React from "react";
import { Avatar, Grid, Typography, Box, Button } from "@mui/material";
import { ExitToApp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData } from "../../../Login/toolkit/slice/AutenticacionRedux";
import { RootState } from "../../../store";

interface UserData {
  name: string;
  email: string;
  role: string;
  creditos: number;
  creditosEstado: string;
  sugerencias: number;
  sugerenciasEstado: string;
  foto: string;
}

export const MenuUsuarioVisual: React.FC = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);

  const handleLogout = () => {
    dispatch(clearAuthData());
  };

  // Nombre completo limpio
  const fullName = [
    authState.estudiante_info?.primer_nombre,
    authState.estudiante_info?.segundo_nombre,
    authState.estudiante_info?.primer_apellido,
    authState.estudiante_info?.segundo_apellido,
  ]
    .filter(Boolean)
    .join(" ");

  const creditos = Number(authState.estudiante_info?.creditos) || 0;
  const creditosEstado = creditos === 0 ? "Inactivo" : "Activo";

  const userData: UserData = {
    name: fullName || "Usuario",
    email: authState.estudiante_info?.correo || "usuario@example.com",
    role: authState.tipoUsuario || "Usuario",
    creditos,
    creditosEstado,
    sugerencias: 5, // Puedes traer esto desde tu API si aplica
    sugerenciasEstado: "Enviado",
    foto: authState.estudiante_info?.fotoId || "/image/menu/profe.jpg",
  };

  const items = [
    {
      titulo: "Créditos",
      valor: userData.creditos,
      estado: userData.creditosEstado,
      color: creditos === 0 ? "error.main" : "success.main",
    },
    {
      titulo: "Sugerencias",
      valor: userData.sugerencias,
      estado: userData.sugerenciasEstado,
      color: "primary.main",
    },
  ];

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={4}
      sx={{ minHeight: "100vh", textAlign: "center", px: 4 }}
    >
      {/* Avatar e info del usuario */}
      <Grid>
        <Avatar
          alt={userData.name}
          src={userData.foto}
          sx={{ width: 140, height: 140 }}
        />
      </Grid>
      <Grid>
        <Typography variant="h5">{userData.name}</Typography>
        <Typography variant="body1">{userData.email}</Typography>
        <Typography variant="body1">Rol: {userData.role}</Typography>
      </Grid>

      {/* Tarjetas una debajo de la otra */}
      <Grid container direction="column" spacing={3} sx={{ mt: 3, width: "100%", maxWidth: 500 }}>
        {items.map((item) => (
          <Grid key={item.titulo}>
            <Box
              sx={{
                p: 4,
                borderRadius: 3,
                boxShadow: "0px 6px 15px rgba(0,0,0,0.25)",
                textAlign: "center",
                backgroundColor: "white",
              }}
            >
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                {item.titulo}
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 900, color: "primary.main" }}>
                {item.valor}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, color: item.color }}>
                {item.estado}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Botón salir siempre al final */}
      <Grid sx={{ mt: 0 }}>
        <Button
          variant="contained"
          color="error"
          onClick={handleLogout}
          startIcon={<ExitToApp />}
          sx={{ width: 180 }}
        >
          Salir
        </Button>
      </Grid>
    </Grid>
  );
};
