import React, { useState } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Avatar,
  Box,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import EventIcon from "@mui/icons-material/Event";
import HomeIcon from "@mui/icons-material/Home";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { Title } from "../../../Elements/Titulo/Titulo";
import { api } from "../../../api/Axios";

interface Estudiante {
  id: number;
  identificacion: string;
  tipo_documento: string;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  genero: string;
  fecha_nacimiento: string;
  direccion: string;
  telefono: string;
  correo?: string;
  grado: string;
  grupo: string;
  jornada: string;
  año_ingreso: number;
  creditos: string;
  estado: boolean;
  fotoId?: string | null;
}

interface ApiResponse {
  success: boolean;
  detail: string;
  data: Estudiante;
}

export const InformacionEstudiante: React.FC<{ id: number }> = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [estudiante, setEstudiante] = useState<Estudiante | null>(null);
  const [loading, setLoading] = useState(false);

  const handleOpen = async () => {
    setOpen(true);
    await fetchEstudiante();
  };

  const handleClose = () => {
    setOpen(false);
    setEstudiante(null);
  };

  const fetchEstudiante = async () => {
    try {
      setLoading(true);
      const res = await api.get<ApiResponse>(
        `/almuerzo_check/usuarios/obtener_estudiante/${id}/`
      );
      if (res.data.success) setEstudiante(res.data.data);
    } catch (error) {
      console.error("Error al obtener estudiante:", error);
    } finally {
      setLoading(false);
    }
  };

  const textFieldStyle = { borderRadius: "20px", height: 60, fontSize: "1.1rem" };
  const labelStyle = { fontSize: "1.1rem" };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
        sx={{ minWidth: "40px", backgroundColor: "#6a1b9a" }}
      >
        <VisibilityIcon />
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        sx={{ "& .MuiPaper-root": { borderRadius: "16px" } }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
          </Box>
        ) : (
          <DialogContent>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12 }}>
                <Title title="Información del Estudiante" />
              </Grid>

              {/* Foto más grande y centrada */}
              <Grid
                size={{ xs: 12, md: 4 }}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Avatar
                    src={estudiante?.fotoId || ""}
                    alt="Foto del estudiante"
                    sx={{
                      width: 220,
                      height: 220,
                      border: "3px solid #1976d2",
                      boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
                      bgcolor: "#e0e0e0",
                    }}
                  />
                  <Box
                    sx={{
                      mt: 1.5,
                      fontWeight: "bold",
                      color: "#555",
                      fontSize: "1rem",
                    }}
                  >
                  </Box>
                </Box>
              </Grid>

              {/* Datos personales */}
              <Grid size={{ xs: 12, md: 8 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Tipo Documento"
                      value={estudiante?.tipo_documento || ""}
                      InputProps={{ startAdornment: <BadgeIcon />, sx: textFieldStyle }}
                      InputLabelProps={{ sx: labelStyle }}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Identificación"
                      value={estudiante?.identificacion || ""}
                      InputProps={{ startAdornment: <BadgeIcon />, sx: textFieldStyle }}
                      InputLabelProps={{ sx: labelStyle }}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Primer Nombre"
                      value={estudiante?.primer_nombre || ""}
                      InputProps={{ startAdornment: <PersonIcon />, sx: textFieldStyle }}
                      InputLabelProps={{ sx: labelStyle }}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Segundo Nombre"
                      value={estudiante?.segundo_nombre || ""}
                      InputProps={{ startAdornment: <PersonIcon />, sx: textFieldStyle }}
                      InputLabelProps={{ sx: labelStyle }}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Primer Apellido"
                      value={estudiante?.primer_apellido || ""}
                      InputProps={{ startAdornment: <PersonIcon />, sx: textFieldStyle }}
                      InputLabelProps={{ sx: labelStyle }}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Segundo Apellido"
                      value={estudiante?.segundo_apellido || ""}
                      InputProps={{ startAdornment: <PersonIcon />, sx: textFieldStyle }}
                      InputLabelProps={{ sx: labelStyle }}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>

              {/* Datos académicos */}
              <Grid size={{ xs: 12 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      fullWidth
                      label="Género"
                      value={estudiante?.genero || ""}
                      InputProps={{ startAdornment: <PersonIcon />, sx: textFieldStyle }}
                      InputLabelProps={{ sx: labelStyle }}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Fecha de Nacimiento"
                      value={estudiante?.fecha_nacimiento || ""}
                      InputLabelProps={{ shrink: true, sx: labelStyle }}
                      InputProps={{ startAdornment: <EventIcon />, sx: textFieldStyle }}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      fullWidth
                      label="Grupo"
                      value={estudiante?.grupo || ""}
                      InputProps={{ startAdornment: <GroupIcon />, sx: textFieldStyle }}
                      InputLabelProps={{ sx: labelStyle }}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Dirección"
                      value={estudiante?.direccion || ""}
                      InputProps={{ startAdornment: <HomeIcon />, sx: textFieldStyle }}
                      InputLabelProps={{ sx: labelStyle }}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField
                      fullWidth
                      label="Teléfono"
                      value={estudiante?.telefono || ""}
                      InputProps={{ startAdornment: <PhoneIcon />, sx: textFieldStyle }}
                      InputLabelProps={{ sx: labelStyle }}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12 }}>
                    <TextField
                      fullWidth
                      label="Correo Electrónico"
                      value={estudiante?.correo || ""}
                      InputProps={{ startAdornment: <EmailIcon />, sx: textFieldStyle }}
                      InputLabelProps={{ sx: labelStyle }}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      fullWidth
                      label="Grado"
                      value={estudiante?.grado || ""}
                      InputProps={{ startAdornment: <SchoolIcon />, sx: textFieldStyle }}
                      InputLabelProps={{ sx: labelStyle }}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      fullWidth
                      label="Jornada"
                      value={estudiante?.jornada || ""}
                      InputProps={{ startAdornment: <AccessTimeIcon />, sx: textFieldStyle }}
                      InputLabelProps={{ sx: labelStyle }}
                      disabled
                    />
                  </Grid>

                  <Grid size={{ xs: 12, md: 4 }}>
                    <TextField
                      fullWidth
                      label="Año de Ingreso"
                      value={estudiante?.año_ingreso || ""}
                      InputProps={{ startAdornment: <CalendarTodayIcon />, sx: textFieldStyle }}
                      InputLabelProps={{ sx: labelStyle }}
                      disabled
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContent>
        )}

        <DialogActions>
          <Button
            variant="contained"
            color="error"
            startIcon={<CloseIcon />}
            onClick={handleClose}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
