"use client";

import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox,
  Alert,
  Divider,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  ArrowForward,
  ErrorOutline,
} from "@mui/icons-material";

import { RecuperarContext } from "../../Elements/Context/RecuperarContraseña";
import { api } from "../../api/Axios";
import { useDispatch } from "react-redux";
import { EstudianteInfo, setAuthData } from "../toolkit/slice/AutenticacionRedux";
import { control_error } from "../../Elements/alertas/alertaError";
import { control_success } from "../../Elements/alertas/alertaSucces";

// ==============================
// 🔹 Tipado de respuesta del login
// ==============================
interface LoginResponse {
  detail: string;
  data: {
    id: number;
    last_login: string | null;
    username: string;
    rol: string;
    creado_en: string;
    estudiante: number;
    estudiante_info:EstudianteInfo;
  };
  token: string;
}

// ==============================
// 🔹 Componente principal Login
// ==============================
export const Login = () => {
  const [username, setUsername] = useState("djstiven3");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { setRecuperar } = useContext(RecuperarContext);
  const dispatch = useDispatch();

  // ==========================
  // 🟢 Función para enviar login
  // ==========================
  const autenticarUsuario = async () => {
    try {
      const body = { username, password };
      const res = await api.post<LoginResponse>(
        "/almuerzo_check/usuarios/autenticacion/",
        body
      );

      const { data, token } = res.data;

    dispatch(
  setAuthData({
    token,
    data: {
      id: data.id,
      username: data.username,
      rol: data.rol,
      estudiante: data.estudiante,
      estudiante_info: data.estudiante_info,
    },
  })
);

      control_success("✅ Login exitoso");
    } catch (error: any) {
      const isAxiosError = error.isAxiosError || error.response;
      const mensaje =
        (isAxiosError && error.response?.data?.detail) ||
        "❌ Error de autenticación";
      control_error(mensaje);
    }
  };

  // ==========================
  // 🟡 Manejo del submit
  // ==========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    setTimeout(() => {
      if (username && password) {
        autenticarUsuario();
      } else {
        setError("Por favor completa todos los campos");
      }
      setIsLoading(false);
    }, 1000);
  };

  // ==========================
  // 🔵 Redirigir a recuperar contraseña
  // ==========================
  const VolverLogin = () => {
    setRecuperar(true);
  };

  // ==========================
  // 🧩 Render del formulario
  // ==========================
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "background.default",
        px: 2,
      }}
    >
      <Paper
        elevation={12}
        sx={{
          width: "100%",
          maxWidth: 420,
          p: 4,
          borderRadius: 4,
          boxShadow: "0px 12px 40px rgba(0,0,0,0.15)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0px 16px 48px rgba(0,0,0,0.2)",
          },
        }}
      >
        {/* 🟣 Encabezado */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Iniciar Sesión
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Ingresa tus credenciales para acceder al sistema
          </Typography>
        </Box>

        {/* 🟠 Formulario */}
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {error && (
              <Alert
                severity="error"
                icon={<ErrorOutline />}
                sx={{
                  borderRadius: 2,
                  boxShadow: "0px 4px 12px rgba(239,68,68,0.2)",
                }}
              >
                {error}
              </Alert>
            )}

            {/* Campo usuario */}
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
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 1,
                        boxShadow: "0px 4px 12px rgba(99,102,241,0.3)",
                      }}
                    >
                      <Person sx={{ color: "white" }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
            />

            {/* Campo contraseña */}
            <TextField
              fullWidth
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: 2,
                        bgcolor: "secondary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 1,
                        boxShadow: "0px 4px 12px rgba(20,184,166,0.3)",
                      }}
                    >
                      <Lock sx={{ color: "white" }} />
                    </Box>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{
                        "&:hover": {
                          bgcolor: "secondary.light",
                          color: "white",
                        },
                      }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Recordarme y Recuperar */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    sx={{
                      "&.Mui-checked": {
                        color: "primary.main",
                      },
                    }}
                  />
                }
                label={
                  <Typography variant="body2" fontWeight={500}>
                    Recordarme
                  </Typography>
                }
              />
              <Typography
                variant="body2"
                fontWeight={600}
                onClick={VolverLogin}
                sx={{
                  color: "secondary.main",
                  "&:hover": {
                    textDecoration: "underline",
                    cursor: "pointer",
                  },
                }}
              >
                ¿Olvidaste tu contraseña?
              </Typography>
            </Box>

            {/* Botón enviar */}
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              disabled={isLoading}
              endIcon={<ArrowForward />}
              sx={{
                py: 1.5,
                fontSize: "1.1rem",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                boxShadow: "0px 6px 20px rgba(99,102,241,0.4)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #5a67d8 0%, #6b3fa0 100%)",
                  boxShadow: "0px 8px 28px rgba(99,102,241,0.5)",
                  transform: "translateY(-2px)",
                },
                "&:active": {
                  transform: "translateY(0)",
                },
                transition: "all 0.3s ease",
              }}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>

            {/* Divider de ayuda */}
            <Divider sx={{ my: 1 }}>
              <Paper
                elevation={3}
                sx={{
                  px: 2,
                  py: 0.5,
                  bgcolor: "background.paper",
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight={600}
                  color="text.secondary"
                >
                  ¿NECESITAS AYUDA?
                </Typography>
              </Paper>
            </Divider>

            {/* Información de contacto */}
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Contacta al <strong>administrador del sistema</strong>
              </Typography>
              <Typography variant="caption" color="text.secondary">
                o al departamento de TI para asistencia técnica
              </Typography>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};
