import React from "react";
import { Box, Grid, Modal, Typography, Avatar, Button } from "@mui/material";
import { Title } from "../../../Elements/Titulo/Titulo";

interface Estudiante {
  fotoId: string;
  identificacion: string;
  grado: string;
}

interface Sugerencia {
  id: number;
  estudiante: Estudiante;
  comentario: string;
  calificacion: number;
  fecha: string;
  fotoId: string;
  menu: number;
}

interface ModalDetalleSugerenciasProps {
  open: boolean;
  onClose: () => void;
  sugerencia: Sugerencia;
}

export const ModalDetalleSugerencias: React.FC<ModalDetalleSugerenciasProps> = ({
  open,
  onClose,
  sugerencia,
}) => {
  return (
    <Modal open={open} onClose={onClose} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box
        sx={{
          bgcolor: "#fafafa",
          borderRadius: 4,
          boxShadow: 4,
          p: 4,
          maxWidth: 600,          // ancho máximo
          width: "90%",            // se adapta al contenido en pantallas pequeñas
          maxHeight: "90vh",       // altura máxima
          overflowY: "auto",       // scroll solo si es necesario
          textAlign: "center",
        }}
      >
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {/* Título */}
          <Grid size={12}>
            <Title title="Detalle de Sugerencia" />
          </Grid>

          {/* Foto + Datos del estudiante */}
          <Grid size={{ xs: 12 }} display="flex" flexDirection="column" alignItems="center">
            <Avatar
              src={sugerencia.estudiante.fotoId}
              sx={{ width: 120, height: 120, mb: 1 }}
            />
            <Typography variant="body1">
              <strong>Identificación:</strong> {sugerencia.estudiante.identificacion}
            </Typography>
            <Typography variant="body1">
              <strong>Grado:</strong> {sugerencia.estudiante.grado}
            </Typography>
          </Grid>

          {/* Comentario grande */}
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 2,
                fontWeight: "bold",
                fontSize: "1.2rem",
                wordBreak: "break-word",
              }}
            >
              {sugerencia.comentario}
            </Typography>
          </Grid>

          {/* Foto de la sugerencia */}
          <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
            <Box>
              <img
                src={sugerencia.fotoId}
                alt="Sugerencia"
                style={{
                  width: "100%",
                  maxHeight: 300,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
              />
            </Box>
          </Grid>

          {/* Detalles de la sugerencia */}
          <Grid size={{ xs: 12 }} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Calificación:</strong> {"⭐".repeat(sugerencia.calificacion)}
            </Typography>
            <Typography variant="body1">
              <strong>Fecha:</strong> {new Date(sugerencia.fecha).toLocaleString()}
            </Typography>
            <Typography variant="body2" sx={{ mt: 1 }}>
              <strong>Menú:</strong> {sugerencia.menu}
            </Typography>
          </Grid>

          {/* Botón Cerrar */}
          <Grid size={{ xs: 12 }} display="flex" justifyContent="center" mt={3}>
            <Button variant="contained" color="error" onClick={onClose}>
              Cerrar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};
