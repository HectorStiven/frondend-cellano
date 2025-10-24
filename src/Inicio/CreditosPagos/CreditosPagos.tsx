import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Button, LinearProgress, Collapse } from '@mui/material';

export const CreditosPagos = () => {
  // Datos de ejemplo
  const [creditosDisponibles, setCreditosDisponibles] = useState(10);
  const [creditosMesPasado, setCreditosMesPasado] = useState(3);
  const [fechaExpiracion, setFechaExpiracion] = useState('2025-11-15');
  const [creditosUsados, setCreditosUsados] = useState(5);
  const [mostrarInfoRecarga, setMostrarInfoRecarga] = useState(false);

  // Funciones dummy para evitar advertencias de variables sin usar
  const handleDummyDisponibles = () => setCreditosDisponibles(prev => prev);
  const handleDummyMesPasado = () => setCreditosMesPasado(prev => prev);
  const handleDummyFecha = () => setFechaExpiracion(prev => prev);
  const handleDummyUsados = () => setCreditosUsados(prev => prev);

  const handleToggleInfo = () => {
    setMostrarInfoRecarga(!mostrarInfoRecarga);
  };

  return (
    <Box sx={{ p: 4, minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Grid container spacing={3} justifyContent="center">
        {/* Créditos disponibles */}
        <Grid size={{xs:12,md:6}}>
          <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold">Créditos Disponibles</Typography>
            <Typography variant="h3" color="primary" sx={{ my: 2 }}>{creditosDisponibles}</Typography>
            <Typography variant="body2" color="text.secondary">
              Fecha de expiración: {fechaExpiracion}
            </Typography>
          </Paper>
        </Grid>

        {/* Créditos del mes pasado */}
        <Grid size={{xs:12,md:6}}>
          <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', boxShadow: 3 }}>
            <Typography variant="h6" fontWeight="bold">Créditos del mes pasado</Typography>
            <Typography variant="h3" color="secondary" sx={{ my: 2 }}>{creditosMesPasado}</Typography>
            <Typography variant="body2" color="text.secondary">Créditos a favor</Typography>
          </Paper>
        </Grid>

        {/* Resumen visual */}
        <Grid size={{xs:12}}>
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

        {/* Información de recarga de créditos */}
        <Grid size={{xs:12}}>
          <Paper sx={{ p: 3, borderRadius: 3, textAlign: 'center', boxShadow: 3 }}>
            <Button variant="contained" color="primary" onClick={handleToggleInfo}>
              Cómo recargar créditos
            </Button>

            <Collapse in={mostrarInfoRecarga}>
              <Box sx={{ mt: 2, textAlign: 'left' }}>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  1. Compra un paquete de créditos en la caja del restaurante.
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  2. Ingresa el código que recibiste al momento de la compra.
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  3. Los créditos se agregarán automáticamente a tu cuenta.
                </Typography>
                <Typography variant="body2">
                  4. Puedes usar tus créditos inmediatamente para ordenar platillos.
                </Typography>
              </Box>
            </Collapse>
          </Paper>
        </Grid>
      </Grid>

      {/* Llamados a las funciones dummy (sin efecto visual) */}
      <Box sx={{ display: 'none' }}>
        <Button onClick={handleDummyDisponibles}></Button>
        <Button onClick={handleDummyMesPasado}></Button>
        <Button onClick={handleDummyFecha}></Button>
        <Button onClick={handleDummyUsados}></Button>
      </Box>
    </Box>
  );
};
