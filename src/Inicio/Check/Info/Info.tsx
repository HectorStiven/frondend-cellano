import {
  Grid,
  Card,
  Box,
  Avatar,
  Typography,
  IconButton,

} from "@mui/material";
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
  estudiante: Estudiante | null;
  onClose: () => void;
}

export const Info: React.FC<InfoProps> = ({ estudiante, onClose }) => {



  if (!estudiante || estudiante.id === 0) return null;

  const creditos = Number(estudiante.creditos) || 0;
  const estaActivo = creditos > 0;




  return (
    <Grid size={{ xs: 12 }} sx={{ mt: 3 }}>
      <Card
        sx={{
          p: 2,
          pr: 8,
          borderRadius: 3,
          boxShadow: 6,
          backgroundColor: "#fafafa",
          position: "relative",
        }}
      >
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10, color: "#f44336" }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
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

          <Box sx={{ flex: 1, mx: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {`${estudiante.primer_nombre} ${
                estudiante.segundo_nombre || ""
              } ${estudiante.primer_apellido} ${
                estudiante.segundo_apellido || ""
              }`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              📘 ID: {estudiante.identificacion}
            </Typography>
            {estudiante.correo && (
              <Typography variant="body2">✉️ {estudiante.correo}</Typography>
            )}
            {estudiante.grado && estudiante.grupo && estudiante.jornada && (
              <Typography variant="body2">
                🎓 {estudiante.grado}° {estudiante.grupo} - {estudiante.jornada}
              </Typography>
            )}
          </Box>

        

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Box
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 2,
                backgroundColor: estaActivo ? "#4caf50" : "#f44336",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.2rem",
                textAlign: "center",
                cursor: "default",
                boxShadow: estaActivo
                  ? "0 4px 10px rgba(76, 175, 80, 0.7)"
                  : "0 4px 10px rgba(244, 67, 54, 0.7)",
              }}
            >
              {estaActivo ? "Activo" : "Inactivo"}
            </Box>


          </Box>
        </Box>
      </Card>
    </Grid>
  );
};
