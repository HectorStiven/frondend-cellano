import React from "react";
import { Grid, Card, Box, Avatar, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface Estudiante {
  id: number;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  identificacion: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
  fecha_nacimiento?: string;
  genero?: string;
  creditos?: string;
  grado?: string;
  grupo?: string;
  jornada?: string;
  fotoId?: string;
  estado: boolean;
}

interface InfoProps {
  estudiante: Estudiante;
  onClose: () => void; // función para cerrar
}

export const Info: React.FC<InfoProps> = ({ estudiante, onClose }) => {
  if (!estudiante || estudiante.id === 0) return null;

  return (
    <Grid size={{ xs: 12 }} sx={{ mt: 3, margin: "0 auto" }}>
      <Card
        sx={{
          p: 2,
          borderRadius: 3,
          boxShadow: 6,
          backgroundColor: "#fafafa",
          position: "relative",
        }}
      >
        {/* Botón cerrar */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10, color: "#f44336" }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          {/* Foto izquierda */}
          <Avatar
            src={estudiante.fotoId}
            alt="foto estudiante"
            sx={{
              width: 100,
              height: 100,
              border: "3px solid #1976d2",
              flexShrink: 0,
            }}
          />

          {/* Información centro */}
          <Box sx={{ flex: 1, mx: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {`${estudiante.primer_nombre} ${estudiante.segundo_nombre || ""} ${estudiante.primer_apellido} ${estudiante.segundo_apellido || ""}`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              📘 ID: {estudiante.identificacion}
            </Typography>
            {estudiante.correo && <Typography variant="body2">✉️ {estudiante.correo}</Typography>}
            {estudiante.grado && estudiante.grupo && estudiante.jornada && (
              <Typography variant="body2">
                🎓 {estudiante.grado}° {estudiante.grupo} - {estudiante.jornada}
              </Typography>
            )}
          </Box>

          {/* Botón estado alineado abajo */}
          <Box
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              backgroundColor: estudiante.estado ? "#4caf50" : "#f44336",
              color: "#fff",
              fontWeight: "bold",
              fontSize: "1.2rem",
              flexShrink: 0,
              cursor: "default",
              textAlign: "center",
              marginTop: "auto", // Empuja el botón hacia abajo
              boxShadow: estudiante.estado
                ? "0 4px 10px rgba(76, 175, 80, 0.7), 0 0 10px rgba(76, 175, 80, 0.5)"
                : "0 4px 10px rgba(244, 67, 54, 0.7), 0 0 10px rgba(244, 67, 54, 0.5)",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)" },
                "50%": { transform: "scale(1.05)" },
                "100%": { transform: "scale(1)" },
              },
              animation: "pulse 1.5s infinite",
              transition: "transform 0.2s, box-shadow 0.2s",
              "&:hover": {
                transform: "translateY(-3px) scale(1.1)",
                boxShadow: estudiante.estado
                  ? "0 8px 20px rgba(76, 175, 80, 0.8), 0 0 15px rgba(76, 175, 80, 0.6)"
                  : "0 8px 20px rgba(244, 67, 54, 0.8), 0 0 15px rgba(244, 67, 54, 0.6)",
              },
            }}
          >
            {estudiante.estado ? "Activo" : "Inactivo"}
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};
