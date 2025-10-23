import React from 'react';
import { Avatar, Grid, Typography, Box, Button } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

export const MenuUsuarioVisual: React.FC = () => {
  const userData = {
    name: "Nombre de Usuario",
    email: "usuario@example.com",
    role: "Administrador",
    creditos: 120,
    creditosEstado: "Activo",
    sugerencias: 5,
    sugerenciasEstado: "Enviado",
  };

  const items = [
    {
      titulo: 'Créditos',
      valor: userData.creditos,
      estado: userData.creditosEstado,
    },
    {
      titulo: 'Sugerencias',
      valor: userData.sugerencias,
      estado: userData.sugerenciasEstado,
    },
  ];

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      spacing={4}
      sx={{ minHeight: '100vh', textAlign: 'center', px: 4 }}
    >
      {/* Avatar e info del usuario */}
      <Grid >
        <Avatar alt="Usuario" src="/static/images/avatar.jpg" sx={{ width: 140, height: 140 }} />
      </Grid>
      <Grid >
        <Typography variant="h5">{userData.name}</Typography>
        <Typography variant="body1">{userData.email}</Typography>
        <Typography variant="body1">Rol: {userData.role}</Typography>
      </Grid>

      {/* Tarjetas una debajo de la otra */}
      <Grid container direction="column" spacing={3} sx={{ mt: 3, width: '100%', maxWidth: 500 }}>
        {items.map((item) => (
          <Grid  key={item.titulo}>
            <Box
              sx={{
                p: 4,
                borderRadius: 3,
                boxShadow: '0px 6px 15px rgba(0,0,0,0.25)',
                textAlign: 'center',
                backgroundColor: 'white',
              }}
            >
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 700 }}>
                {item.titulo}
              </Typography>
              <Typography variant="h2" sx={{ fontWeight: 900, color: 'primary.main' }}>
                {item.valor}
              </Typography>
              <Typography variant="body1" sx={{ mt: 1, color: 'green' }}>
                {item.estado}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Botón salir siempre al final */}
      <Grid  sx={{ mt: 5 }}>
        <Button
          variant="contained"
          color="error"
          startIcon={<ExitToApp />}
          sx={{ width: 180 }}
        >
          Salir
        </Button>
      </Grid>
    </Grid>
  );
};
