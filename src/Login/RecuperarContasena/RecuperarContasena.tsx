"use client";

import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  Alert,
} from "@mui/material";
import { Person, Send, CheckCircle, ErrorOutline } from "@mui/icons-material";

export const RecuperarContasena: React.FC = () => {
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (username) {
        setSuccess(true);
        console.log("Password recovery for user:", username);
      } else {
        setError("Por favor ingresa un nombre de usuario válido");
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        background: "linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)",
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: { xs: "100%", sm: 400 },
          p: 4,
          borderRadius: 4,
          boxShadow: "0px 12px 40px rgba(0,0,0,0.15)",
        }}
      >
        {success ? (
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                width: 80,
                height: 80,
                borderRadius: 3,
                background: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                mb: 2,
                boxShadow: "0px 8px 24px rgba(16,185,129,0.4)",
              }}
            >
              <CheckCircle sx={{ fontSize: 48, color: "white" }} />
            </Box>
            <Typography
              variant="h4"
              fontWeight={700}
              gutterBottom
              sx={{
                background: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              ¡Solicitud Enviada!
            </Typography>
            <Typography variant="body1" color="text.secondary" mb={2}>
              Hemos recibido tu solicitud de recuperación de contraseña
            </Typography>

            <Alert
              severity="success"
              icon={<Person />}
              sx={{
                borderRadius: 2,
                mb: 2,
                "& .MuiAlert-message": { fontWeight: 500 },
              }}
            >
              Contacta al administrador del sistema o al departamento de TI con tu
              nombre de usuario para restablecer tu contraseña.
            </Alert>

            <Paper
              elevation={4}
              sx={{
                p: 2,
                borderRadius: 2,
                bgcolor: "grey.50",
                border: "2px solid",
                borderColor: "grey.200",
                mb: 2,
              }}
            >
              <Typography
                variant="body2"
                fontWeight={600}
                textAlign="center"
                color="text.secondary"
              >
                Usuario solicitado:
              </Typography>
              <Typography
                variant="h5"
                fontWeight={700}
                textAlign="center"
                color="primary.main"
              >
                {username}
              </Typography>
            </Paper>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => {
                setSuccess(false);
                setUsername("");
              }}
              sx={{ py: 1.5, borderRadius: 2, fontWeight: 600 }}
            >
              Hacer otra solicitud
            </Button>
          </Box>
        ) : (
          <Box>
            <Typography
              variant="h4"
              fontWeight={700}
              gutterBottom
              sx={{
                background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                textAlign: "center",
              }}
            >
              Recuperar Acceso
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              textAlign="center"
              mb={3}
            >
              Ingresa tu nombre de usuario para solicitar ayuda
            </Typography>

            {error && (
              <Alert severity="error" icon={<ErrorOutline />} sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Usuario"
                placeholder="nombre.usuario"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 2 }}
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                fullWidth
                disabled={isLoading}
                endIcon={<Send />}
                sx={{
                  py: 1.5,
                  fontSize: "1.1rem",
                  background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #0f9488 0%, #0284c7 100%)",
                  },
                }}
              >
                {isLoading ? "Enviando..." : "Enviar Solicitud"}
              </Button>
            </form>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
