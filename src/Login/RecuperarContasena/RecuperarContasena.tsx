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
import { Person, Send, CheckCircle, ErrorOutline, Lock } from "@mui/icons-material";
import { api } from "../../api/Axios";

interface RecuperarResponse {
  success: boolean;
  detail: string;
  codigo_generado?: number;
  expira?: string;
}

interface ActualizarResponse {
  success: boolean;
  detail: string;
}

export const RecuperarContasena: React.FC = () => {
  const [username, setUsername] = useState("");
  const [codigo, setCodigo] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  // ✅ Paso 1: Enviar solicitud de recuperación
  const handleEnviarSolicitud = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMensaje("");
    setIsLoading(true);

    try {
      const res = await api.post<RecuperarResponse>(
        "/almuerzo_check/usuarios/recuperar_contrasena/",
        { username }
      );

      if (res.data.success) {
        setMensaje("✅ Código enviado a tu correo registrado.");
        setStep(2);
      } else {
        setError(res.data.detail || "Error al procesar la solicitud.");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "No se pudo enviar la solicitud.");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Paso 2: Actualizar la contraseña
  const handleActualizarContrasena = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMensaje("");
    setIsLoading(true);

    try {
      const res = await api.post<ActualizarResponse>(
        "/almuerzo_check/usuarios/actualizar_contrasena/",
        {
          username,
          password,
          codigo,
        }
      );

      if (res.data.success) {
        setMensaje("🎉 Tu contraseña ha sido actualizada correctamente.");
        setStep(1);
        setUsername("");
        setPassword("");
        setCodigo("");
      } else {
        setError(res.data.detail || "Error al actualizar la contraseña.");
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || "No se pudo actualizar la contraseña.");
    } finally {
      setIsLoading(false);
    }
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
        {/* Paso 1 */}
        {step === 1 && (
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
              Ingresa tu nombre de usuario para recibir un código de verificación.
            </Typography>

            {error && (
              <Alert severity="error" icon={<ErrorOutline />} sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {mensaje && (
              <Alert severity="success" icon={<CheckCircle />} sx={{ mb: 2 }}>
                {mensaje}
              </Alert>
            )}

            <form onSubmit={handleEnviarSolicitud}>
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
                  fontWeight: 600,
                  borderRadius: 2,
                  background:
                    "linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #0f9488 0%, #0284c7 100%)",
                  },
                }}
              >
                {isLoading ? "Enviando..." : "Enviar Código"}
              </Button>
            </form>
          </Box>
        )}

        {/* Paso 2 */}
        {step === 2 && (
          <Box>
            <Box sx={{ textAlign: "center", mb: 2 }}>
              <CheckCircle sx={{ fontSize: 60, color: "#10b981", mb: 1 }} />
              <Typography variant="h5" fontWeight={700}>
                ¡Solicitud Enviada!
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Hemos enviado un código de verificación a tu correo.
              </Typography>
            </Box>

            {error && (
              <Alert severity="error" icon={<ErrorOutline />} sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            {mensaje && (
              <Alert severity="success" icon={<CheckCircle />} sx={{ mb: 2 }}>
                {mensaje}
              </Alert>
            )}

            <form onSubmit={handleActualizarContrasena}>
              <TextField
                fullWidth
                label="Código de verificación"
                placeholder="Ej: 4965"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                required
                sx={{ mb: 2 }}
              />

              <TextField
                fullWidth
                type="password"
                label="Nueva contraseña"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                }}
                sx={{ mb: 3 }}
              />

              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={isLoading}
                endIcon={<Send />}
                sx={{
                  py: 1.4,
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
                  "&:hover": {
                    background:
                      "linear-gradient(135deg, #0f766e 0%, #0d9488 100%)",
                  },
                }}
              >
                {isLoading ? "Actualizando..." : "Actualizar Contraseña"}
              </Button>
            </form>

            <Button
              variant="text"
              fullWidth
              onClick={() => setStep(1)}
              sx={{ mt: 2 }}
            >
              ← Volver al inicio
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};
