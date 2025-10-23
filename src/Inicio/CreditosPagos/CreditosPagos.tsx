import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, LinearProgress } from '@mui/material';

export const CreditosPagos = () => {
  // Datos de ejemplo
  const [creditosDisponibles, setCreditosDisponibles] = useState(10);
  const [creditosMesPasado, setCreditosMesPasado] = useState(3);
  const [fechaExpiracion, setFechaExpiracion] = useState('2025-11-15');
  const [creditosUsados, setCreditosUsados] = useState(5);

  const handleRecargar = () => {
    // Simula recarga de créditos
    setCreditosDisponibles(creditosDisponibles + 5);
  };

  return (
    <Box sx={{ p: 4, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Typography variant="h4" sx={{ mb: 4, textAlign: 'center', fontWeight: 'bold' }}>
        Mis Créditos
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {/* Créditos disponibles */}
        <Grid size={{ xs: 12, md: 6}}>
          <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold">Créditos Disponibles</Typography>
            <Typography variant="h3" color="primary" sx={{ my: 2 }}>{creditosDisponibles}</Typography>
            <Typography variant="body2" color="text.secondary">Fecha de expiración: {fechaExpiracion}</Typography>
          </Paper>
        </Grid>

        {/* Créditos del mes pasado */}
        <Grid size={{ xs: 12, md: 6}}>
          <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold">Créditos del mes pasado</Typography>
            <Typography variant="h3" color="secondary" sx={{ my: 2 }}>{creditosMesPasado}</Typography>
            <Typography variant="body2" color="text.secondary">Créditos a favor</Typography>
          </Paper>
        </Grid>

        {/* Resumen visual */}
        <Grid size={{ xs: 12, md: 6}}>
          <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Resumen de Créditos</Typography>
            <Typography variant="body2">Usados: {creditosUsados}</Typography>
            <Typography variant="body2">Disponibles: {creditosDisponibles}</Typography>
            <Box sx={{ mt: 2 }}>
              <LinearProgress
                variant="determinate"
                value={(creditosUsados / (creditosDisponibles + creditosUsados)) * 100}
              />
            </Box>
          </Paper>
        </Grid>

        {/* Botón de recarga */}
        <Grid size={{ xs: 12, md: 6}}>
          <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>Recargar Créditos</Typography>
            <Button variant="contained" color="primary" onClick={handleRecargar}>
              Añadir 5 Créditos
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
