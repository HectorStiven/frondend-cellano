import React from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Card,
  CardContent,
  Grid
} from "@mui/material";
import { School, MenuBook, People, EmojiEvents } from "@mui/icons-material";

export const LoginPageInfo = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        overflowY: "auto", // ✅ permite hacer scroll si el contenido es más grande que la pantalla
      }}
    >
      <Grid
        container
        spacing={0}
        sx={{
          minHeight: "100vh",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* 🔹 Panel principal (ocupa todo el ancho disponible, 12 columnas) */}
        <Grid
          size={{ xs: 12 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            textAlign: "center",
            position: "relative",
            overflow: "hidden",
            p: { xs: 3, sm: 6 },
          }}
        >
          {/* Fondo decorativo */}
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              backgroundImage: "url(/abstract-geometric-education-pattern.jpg)",
              opacity: 0.1,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Contenido */}
          <Container maxWidth="md" sx={{ position: "relative", zIndex: 1 }}>
            {/* Encabezado */}
            <Paper
              elevation={8  }
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 2,
                p: 2,
                mb: 4,
                mx: "auto",
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                borderRadius: 3,
                border: "2px solid rgba(255,255,255,0.2)",
              }}
            >
              <Box
                sx={{
                  width: 56,
                  height: 56,
                  background: "rgba(255,255,255,0.25)",
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <School sx={{ fontSize: 32 }} />
              </Box>
              <Box>
                <Typography variant="h5" fontWeight={700}>
                  Portal Educativo
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Sistema de Gestión Escolar
                </Typography>
              </Box>
            </Paper>

            {/* Título */}
            <Typography
              variant="h2"
              fontWeight={700}
              gutterBottom
              sx={{
                mb: 3,
                fontSize: { xs: "2rem", sm: "3rem", md: "3.5rem" },
              }}
            >
              Bienvenido a tu espacio de aprendizaje
            </Typography>
        

            {/* Instrucciones */}
            <Paper
              elevation={8}
              sx={{
                p: 3,
                mb: 6,
                background: "rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
                border: "2px solid rgba(255,255,255,0.2)",
                borderRadius: 3,
                textAlign: "left",
              }}
            >
              <Typography variant="h6" fontWeight={700} gutterBottom>
                📋 Instrucciones de Acceso
              </Typography>
              <Box component="ul" sx={{ pl: 2, m: 0 }}>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Ingresa tu nombre de usuario asignado por el colegio.
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Usa la contraseña que recibiste en tu correo institucional.
                </Typography>
                <Typography component="li" variant="body2" sx={{ mb: 1 }}>
                  Si es tu primer acceso, se te pedirá cambiar la contraseña.
                </Typography>
                <Typography component="li" variant="body2">
                  ¿Problemas? Contacta al departamento de TI.
                </Typography>
              </Box>
            </Paper>

            {/* Cuadrícula de tarjetas */}
          












<Grid container spacing={3} justifyContent="center">
  {/* Tarjeta superior */}
  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
        <Card
      elevation={6}
      sx={{
        height: 150,
        width: 140,
        margin: "auto",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
        border: "2px solid rgba(255,255,255,0.2)",
        color: "white",
        textAlign: "center",
        p: 0.5,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.3)",
        },
      }}
    >
      <CardContent sx={{ p: 0.5 }}>
        <MenuBook sx={{ fontSize: 24, mb: 0.5 }} />
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Recursos
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.7rem" }}>
          Material educativo digital
        </Typography>
      </CardContent>
    </Card>
  </Grid>

  {/* Tarjetas inferiores */}
  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>    <Card
      elevation={6}
      sx={{
        height: 150,
        width: 140,
        margin: "auto",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
        border: "2px solid rgba(255,255,255,0.2)",
        color: "white",
        textAlign: "center",
        p: 0.5,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.3)",
        },
      }}
    >
      <CardContent sx={{ p: 0.5 }}>
        <People sx={{ fontSize: 24, mb: 0.5 }} />
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Comunidad
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.7rem" }}>
          Conecta con tu clase
        </Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>    <Card
      elevation={6}
      sx={{
        height: 150,
        width: 140,
        margin: "auto",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
        border: "2px solid rgba(255,255,255,0.2)",
        color: "white",
        textAlign: "center",
        p: 0.5,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.3)",
        },
      }}
    >
      <CardContent sx={{ p: 0.5 }}>
        <EmojiEvents sx={{ fontSize: 24, mb: 0.5 }} />
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Logros
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.7rem" }}>
          Sigue tu progreso
        </Typography>
      </CardContent>
    </Card>
  </Grid>

  <Grid size={{ xs: 12, sm: 6, md: 6, lg: 3 }}>
    <Card
      elevation={6}
      sx={{
        height: 150,
        width: 140,
        margin: "auto",
        background: "rgba(255,255,255,0.15)",
        backdropFilter: "blur(10px)",
        border: "2px solid rgba(255,255,255,0.2)",
        color: "white",
        textAlign: "center",
        p: 0.5,
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.3)",
        },
      }}
    >
      <CardContent sx={{ p: 0.5 }}>
        <School sx={{ fontSize: 24, mb: 0.5 }} />
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          Certificados
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9, fontSize: "0.7rem" }}>
          Obtén reconocimientos
        </Typography>
      </CardContent>
    </Card>
  </Grid>
</Grid>





























            {/* Footer */}
            <Typography
              variant="body2"
              sx={{
                mt: 8,
                opacity: 0.8,
                fontSize: "0.9rem",
              }}
            >
              © 2025 Portal Educativo. Todos los derechos reservados.
            </Typography>
          </Container>
        </Grid>
      </Grid>
    </Box>
  );
};
