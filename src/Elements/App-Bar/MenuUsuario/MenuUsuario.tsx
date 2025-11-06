import React from "react";
import { Avatar, Grid, Typography, Box, Button } from "@mui/material";
import { ExitToApp, Send } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthData } from "../../../Login/toolkit/slice/AutenticacionRedux";
import { RootState } from "../../../store";
import { useNavigate } from "react-router-dom";
import { AttachMoney } from "@mui/icons-material"; // agrega este import

interface UserData {
  name: string;
  email: string;
  role: string;
  creditos: number;
  creditosEstado: string;
  sugerencias: number;
  foto: string;
}

export const MenuUsuarioVisual: React.FC = () => {
  const dispatch = useDispatch();
  const authState = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearAuthData());
  };

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
  const sugerencias = 5;

  const userData: UserData = {
    name: fullName || "Usuario",
    email: authState.estudiante_info?.correo || "usuario@example.com",
    role: authState.tipoUsuario || "Usuario",
    creditos,
    creditosEstado,
    sugerencias,
    foto: authState.estudiante_info?.fotoId || "/image/menu/profe.jpg",
  };

  const items = [
    {
      titulo: "Créditos",
      valor: userData.creditos,
      estado: userData.creditosEstado,
      color: creditos === 0 ? "error.main" : "success.main",
      tipo: "texto",
    },
    {
      titulo: "Sugerencias",
      valor: userData.sugerencias,
      color: "primary.main",
      tipo: "boton",
    },
  ];

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="flex-start"
      spacing={0}
      padding={1}
      sx={{ backgroundColor: "#f5f7fa", minHeight: "100vh" }}
    >
      {/* Avatar e información */}
      <Grid size={{ xs: 12 }} textAlign="center" sx={{ mb: 2 }}>
        <Avatar
          alt={userData.name}
          src={userData.foto}
          sx={{
            width: 100,
            height: 100,
            mx: "auto",
            mb: 1.5,
            boxShadow: "0 3px 15px rgba(0,0,0,0.12)",
          }}
        />
        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
          {userData.name}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {userData.email}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Rol: {userData.role}
        </Typography>
      </Grid>

    <Grid container spacing={2} sx={{ width: "100%", maxWidth: 150, padding: 0 }}>
  {items.map((item) => (
    <Grid size={{ xs: 12, sm: 6, md: 12 }} key={item.titulo}>
      <Box
        sx={{
          p: 2.5,
          borderRadius: 3,
          boxShadow: "0px 4px 12px rgba(0,0,0,0.12)",
          textAlign: "center",
          backgroundColor: "white",
          transition: "transform 0.3s, box-shadow 0.3s",
          "&:hover": {
            transform: "translateY(-3px)",
            boxShadow: "0px 8px 20px rgba(0,0,0,0.2)",
          },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 700 }}>
          {item.titulo}
        </Typography>

        <Typography
          variant="h5"
          sx={{ fontWeight: 900, color: "primary.main", mb: 1 }}
        >
          {item.valor}
        </Typography>

        {item.tipo === "texto" ? (
          <>
            <Typography variant="body2" sx={{ mt: 0.5, color: item.color }}>
              {item.estado}
            </Typography>

            {/* Nuevo botón para ir a Créditos */}
            {item.titulo === "Créditos" && (
              <Button
                variant="contained"
                    startIcon={<AttachMoney />}  // <--- ícono agregado

                color="secondary"
                fullWidth
                sx={{
                  mt: 1.5,
                  fontWeight: "bold",
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "scale(1.05)",
                    boxShadow: "0px 4px 15px rgba(0,0,0,0.25)",
                  },
                }}
                onClick={() => navigate("/Credito")}
              >
              Créditos
              </Button>
            )}
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            startIcon={<Send />}
            onClick={() => navigate("/Sugerencias")}
            sx={{
              mt: 1,
              transition: "all 0.3s",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.25)",
              },
            }}
          >
            Enviar
          </Button>
        )}
      </Box>
    </Grid>
  ))}
</Grid>


      {/* Botón salir fijo al final */}
      <Grid
        size={{ xs: 12 }}
        sx={{ mt: "auto", width: "100%", maxWidth: 180, mb: 0 }}
      >
        <Button
          variant="contained"
          color="error"
          fullWidth
          startIcon={<ExitToApp />}
          sx={{
            py: 1.5,
            fontWeight: 700,
            transition: "all 0.3s",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0px 6px 20px rgba(0,0,0,0.35)",
            },
          }}
          onClick={handleLogout}
        >
          Salir
        </Button>
      </Grid>
    </Grid>
  );
};
