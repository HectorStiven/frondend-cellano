"use client";

import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import {
  School,
  ArrowBack,
  Email,
  Security,
  HelpOutline,
  SupportAgent,
} from "@mui/icons-material";

export const RecoverPasswordPageInfo = () => {
  return (
    <Box
      sx={{
        height: { xs: "auto", md: "100vh" }, // ✅ Auto en móvil, 100vh en escritorio
        width: "100%",
        display: "flex",
        background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 50%, #3b82f6 100%)",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      <Grid
        container
        sx={{
          height: { xs: "auto", md: "100vh" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: { xs: 3, md: 8 },
          py: { xs: 6, md: 0 },
          color: "white",
          position: "relative",
        }}
      >
        {/* Fondo decorativo */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: "url(/abstract-security-pattern.png)",
            opacity: 0.08,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* Contenido */}
        <Box sx={{ position: "relative", zIndex: 1, width: "100%" }}>
          {/* Botón volver */}
          <Paper
            elevation={6}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 1.5,
              p: 1.5,
              mb: 4,
              background: "rgba(255,255,255,0.15)",
              backdropFilter: "blur(10px)",
              borderRadius: 2,
              border: "2px solid rgba(255,255,255,0.2)",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": {
                background: "rgba(255,255,255,0.25)",
                transform: "translateX(-4px)",
              },
            }}
          >
            <ArrowBack />
            <Typography variant="body1" fontWeight={600}>
              Volver al inicio
            </Typography>
          </Paper>

          {/* Encabezado */}
          <Paper
            elevation={8}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 2,
              p: 2,
              mb: 4,
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
                Recuperación de Cuenta
              </Typography>
            </Box>
          </Paper>

          {/* Título principal */}
          <Typography
            variant="h2"
            fontWeight={700}
            gutterBottom
            sx={{
              mb: 3,
              fontSize: { xs: "2rem", md: "3rem" },
              lineHeight: 1.2,
            }}
          >
            Recupera el acceso a tu cuenta
          </Typography>

          <Typography
            variant="h6"
            sx={{
              mb: 5,
              opacity: 0.95,
              lineHeight: 1.6,
              fontSize: { xs: "1rem", md: "1.2rem" },
              maxWidth: 600,
            }}
          >
            Te ayudaremos a restablecer tu contraseña de forma rápida y segura.
            Sigue las instrucciones para continuar.
          </Typography>

          {/* Tarjetas informativas */}
          <Grid container spacing={3}>
            {[
              {
                icon: <Email sx={{ fontSize: 32 }} />,
                title: "Verifica tu correo",
                desc: "Te enviaremos un enlace seguro al correo registrado.",
              },
              {
                icon: <Security sx={{ fontSize: 32 }} />,
                title: "Proceso seguro",
                desc: "El enlace expirará en 24 horas para proteger tu información.",
              },
              {
                icon: <HelpOutline sx={{ fontSize: 32 }} />,
                title: "¿Olvidaste tu correo?",
                desc: "Contacta con soporte si no tienes acceso a tu cuenta.",
              },
              {
                icon: <SupportAgent sx={{ fontSize: 32 }} />,
                title: "Soporte técnico",
                desc: "Nuestro equipo está disponible 24/7 para ayudarte.",
              },
            ].map((item, i) => (
              <Grid key={i} size={{ xs: 12, sm: 6 }}>
                <Card
                  elevation={8}
                  sx={{
                    height: "100%",
                    background: "rgba(255,255,255,0.15)",
                    backdropFilter: "blur(10px)",
                    border: "2px solid rgba(255,255,255,0.2)",
                    color: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0px 10px 24px rgba(0,0,0,0.25)",
                    },
                  }}
                >
                  <CardContent sx={{ display: "flex", gap: 2 }}>
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        background: "rgba(255,255,255,0.25)",
                        borderRadius: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" fontWeight={600}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Footer */}
          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              mt: 6,
              textAlign: "center",
              fontSize: "0.9rem",
            }}
          >
            © 2025 Portal Educativo. Todos los derechos reservados.
          </Typography>
        </Box>
      </Grid>
    </Box>
  );
};
