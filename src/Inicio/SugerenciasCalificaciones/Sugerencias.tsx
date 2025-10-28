import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Zoom,
  Rating,
} from "@mui/material";
import { Feedback, Send, PhotoCamera } from "@mui/icons-material";
import { Title } from "../../Elements/Titulo/Titulo";



export const Sugerencias = () => {
  const [nombre, setNombre] = useState("");
  const [platillo, setPlatillo] = useState("");
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState<number | null>(0);
  const [foto, setFoto] = useState<string | null>(null);
  const [enviada, setEnviada] = useState(false);
  const [error, setError] = useState(false);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEnviar = () => {
    if (
      !nombre.trim() ||
      !platillo.trim() ||
      !comentario.trim() ||
      !calificacion
    ) {
      setError(true);
      return;
    }

    // Simula envío exitoso
    setNombre("");
    setPlatillo("");
    setComentario("");
    setCalificacion(0);
    setFoto(null);
    setError(false);
    setEnviada(true);

    setTimeout(() => setEnviada(false), 2000);
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#fafafa",
        borderRadius: 4,
        boxShadow: 4,
        m: 3,
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        {/* Título principal */}
        <Grid size={{ xs: 12 }}>
          <Title title="Sugerencias del Restaurante Escolar" />
        </Grid>

        {/* Ícono principal */}
        <Grid size={{ xs: 12 }}>
          <Feedback sx={{ fontSize: 70, color: "#1976d2", mb: 1 }} />

          <Zoom in={enviada}>
            <Typography
              variant="h6"
              color="success.main"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              ¡Sugerencia enviada con éxito!
            </Typography>
          </Zoom>

          {error && (
            <Typography variant="body2" color="error" sx={{ mb: 1 }}>
              Por favor, completa todos los campos antes de enviar.
            </Typography>
          )}
        </Grid>

        {/* Campos del formulario */}
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            label="Nombre del estudiante"
            variant="outlined"
            fullWidth
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              },
            }}
          />
          <TextField
            label="Platillo sugerido"
            variant="outlined"
            fullWidth
            value={platillo}
            onChange={(e) => setPlatillo(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              },
            }}
          />
          <TextField
            label="Comentario"
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              },
            }}
          />

          {/* Calificación */}
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <Typography sx={{ mr: 1 }}>Calificación:</Typography>
            <Rating
              value={calificacion}
              onChange={(_, newValue) => setCalificacion(newValue)}
            />
          </Box>

          {/* Subir foto */}
          <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Agregar foto
              <input type="file" hidden accept="image/*" onChange={handleFotoChange} />
            </Button>
          </Box>

          {/* Vista previa */}
          {foto && (
            <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
              <img
                src={foto}
                alt="Vista previa"
                style={{
                  maxWidth: "200px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              />
            </Box>
          )}
        </Grid>

        {/* Botón centrado */}
        <Grid size={{ xs: 12, md: 6 }} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<Send />}
            onClick={handleEnviar}
            sx={{
              borderRadius: 3,
              p: 1.2,
              boxShadow: 2,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Enviar sugerencia
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
