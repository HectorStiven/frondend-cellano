"use client"

import type React from "react"

import { useState } from "react"
import { Box, Button, TextField, Typography, Paper, InputAdornment, Alert } from "@mui/material"
import { Person, Send, CheckCircle, ErrorOutline, Info } from "@mui/icons-material"

export const RecuperarContasena: React.FC = () => {
  const [username, setUsername] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    setTimeout(() => {
      if (username) {
        setSuccess(true)
        console.log("Password recovery for user:", username)
      } else {
        setError("Por favor ingresa un nombre de usuario válido")
      }
      setIsLoading(false)
    }, 1500)
  }

  if (success) {
    return (
      <Paper
        elevation={12}
        sx={{
          p: 4,
          borderRadius: 4,
          boxShadow: "0px 12px 40px rgba(0,0,0,0.15)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0px 16px 48px rgba(0,0,0,0.2)",
          },
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 3,
              background: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              mb: 3,
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
          <Typography variant="body1" color="text.secondary">
            Hemos recibido tu solicitud de recuperación de contraseña
          </Typography>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
          <Alert
            severity="success"
            icon={<Person />}
            sx={{
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(16,185,129,0.2)",
              "& .MuiAlert-message": {
                fontWeight: 500,
              },
            }}
          >
            Contacta al administrador del sistema o al departamento de TI con tu nombre de usuario para restablecer tu
            contraseña.
          </Alert>

          <Paper
            elevation={4}
            sx={{
              p: 3,
              borderRadius: 2,
              bgcolor: "grey.50",
              border: "2px solid",
              borderColor: "grey.200",
            }}
          >
            <Typography variant="body2" fontWeight={600} textAlign="center" color="text.secondary" mb={1}>
              Usuario solicitado:
            </Typography>
            <Typography variant="h5" fontWeight={700} textAlign="center" color="primary.main">
              {username}
            </Typography>
          </Paper>

          <Box sx={{ textAlign: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 2 }}>
              <Info fontSize="small" color="action" />
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Guarda esta información para tu solicitud
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => {
                setSuccess(false)
                setUsername("")
              }}
              sx={{
                py: 1.5,
                borderWidth: 2,
                fontWeight: 600,
                borderRadius: 2,
                boxShadow: "0px 4px 12px rgba(0,0,0,0.08)",
                "&:hover": {
                  borderWidth: 2,
                  boxShadow: "0px 6px 16px rgba(0,0,0,0.12)",
                },
              }}
            >
              Hacer otra solicitud
            </Button>
          </Box>
        </Box>
      </Paper>
    )
  }

  return (
    <Paper
      elevation={12}
      sx={{
        p: 4,
        borderRadius: 4,
        boxShadow: "0px 12px 40px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0px 16px 48px rgba(0,0,0,0.2)",
        },
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{
            background: "linear-gradient(135deg, #14b8a6 0%, #06b6d4 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Recuperar Acceso
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Ingresa tu nombre de usuario para solicitar ayuda
        </Typography>
      </Box>

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

          <Box>
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
                        bgcolor: "secondary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mr: 1,
                        boxShadow: "0px 4px 12px rgba(20,184,166,0.3)",
                      }}
                    >
                      <Person sx={{ color: "white" }} />
                    </Box>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  pl: 1,
                },
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
              <Info sx={{ fontSize: 16, color: "text.secondary" }} />
              <Typography variant="caption" color="text.secondary" fontWeight={500}>
                Debe ser tu usuario registrado en el sistema del colegio
              </Typography>
            </Box>
          </Box>

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
              boxShadow: "0px 6px 20px rgba(20,184,166,0.4)",
              "&:hover": {
                background: "linear-gradient(135deg, #0f9488 0%, #0284c7 100%)",
                boxShadow: "0px 8px 28px rgba(20,184,166,0.5)",
                transform: "translateY(-2px)",
              },
              "&:active": {
                transform: "translateY(0)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {isLoading ? "Enviando..." : "Enviar Solicitud"}
          </Button>

          <Alert
            severity="warning"
            icon={<ErrorOutline />}
            sx={{
              borderRadius: 2,
              boxShadow: "0px 4px 12px rgba(245,158,11,0.2)",
              "& .MuiAlert-message": {
                fontWeight: 500,
              },
            }}
          >
            Si no recuerdas tu usuario, contacta al <strong>departamento de TI</strong> del colegio
          </Alert>
        </Box>
      </form>
    </Paper>
  )
}
