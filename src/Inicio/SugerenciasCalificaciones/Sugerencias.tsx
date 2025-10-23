import React, { useState } from 'react';
import { Box, TextField, Button, Grid, Paper, Typography, Zoom } from '@mui/material';
import { Feedback } from '@mui/icons-material';

interface Sugerencia {
  nombre: string;
  platillo: string;
  comentario: string;
}

export const Sugerencias = () => {
  const [nombre, setNombre] = useState('');
  const [platillo, setPlatillo] = useState('');
  const [comentario, setComentario] = useState('');
  const [sugerencias, setSugerencias] = useState<Sugerencia[]>([]);
  const [enviada, setEnviada] = useState(false);
  const [error, setError] = useState(false);

  const handleEnviar = () => {
    if (!nombre.trim() || !platillo.trim() || !comentario.trim()) {
      setError(true);
      return;
    }

    setSugerencias([...sugerencias, { nombre, platillo, comentario }]);
    setNombre('');
    setPlatillo('');
    setComentario('');
    setError(false);
    setEnviada(true);

    // Ocultar animación después de 2 segundos
    setTimeout(() => setEnviada(false), 2000);
  };

  return (
    <Box sx={{ p: 4, minHeight: '100vh', background: '#f5f5f5' }}>
      <Grid container spacing={2} justifyContent="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <Paper sx={{ p: 4, borderRadius: 3, boxShadow: 4, textAlign: 'center' }}>
            {/* Ícono grande */}
            <Feedback sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />

            {/* Animación enviada */}
            <Zoom in={enviada}>
              <Typography
                variant="h6"
                color="success.main"
                sx={{
                  mb: 2,
                  fontWeight: 'bold',
                  transition: 'all 0.5s ease',
                }}
              >
                ¡Sugerencia enviada!
              </Typography>
            </Zoom>

            {/* Mensaje de error */}
            {error && (
              <Typography variant="body2" color="error" sx={{ mb: 2 }}>
                Por favor, completa todos los campos.
              </Typography>
            )}

            {/* Formulario */}
            <TextField
              label="Nombre"
              variant="outlined"
              fullWidth
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Platillo"
              variant="outlined"
              fullWidth
              required
              value={platillo}
              onChange={(e) => setPlatillo(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Sugerencia"
              variant="outlined"
              fullWidth
              multiline
              minRows={3}
              required
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleEnviar}
            >
              Enviar
            </Button>
          </Paper>
        </Grid>
      </Grid>

      {/* Lista de sugerencias */}
      {sugerencias.length > 0 && (
        <Box mt={4}>
          <Grid container spacing={2}>
            {sugerencias.map((sug, index) => (
              <Grid size={{ xs: 12, md: 6 }} key={index}>
                <Paper sx={{ p: 2, borderRadius: 2, boxShadow: 2 }}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {sug.nombre} - {sug.platillo}
                  </Typography>
                  <Typography variant="body2">{sug.comentario}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
