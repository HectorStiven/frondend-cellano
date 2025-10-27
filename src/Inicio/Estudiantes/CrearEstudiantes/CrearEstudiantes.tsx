import React, { useState } from "react";
import { Button, Grid, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { Title } from "../../../Elements/Titulo/Titulo";
import PersonIcon from '@mui/icons-material/Person';
import BadgeIcon from '@mui/icons-material/Badge';
import EventIcon from '@mui/icons-material/Event';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { control_success } from "../../../Elements/alertas/alertaSucces";
import { control_error } from "../../../Elements/alertas/alertaError";
import { api } from "../../../api/Axios";

interface EstudiantesForm {
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
  creditos: number;
}

export const ModalCrearEstudiantes: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<EstudiantesForm>({
    identificacion: "",
    tipo_documento: "",
    primer_nombre: "",
    segundo_nombre: "",
    primer_apellido: "",
    segundo_apellido: "",
    genero: "",
    fecha_nacimiento: "",
    direccion: "",
    telefono: "",
    correo: "",
    grado: "",
    grupo: "",
    jornada: "",
    año_ingreso: new Date().getFullYear(),
    creditos: 0,
  });

  const handleInputChange = (field: keyof EstudiantesForm, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      const res = await api.post("/estudiantes/crear/", form);
      control_success("Estudiante creado correctamente");
      console.log(res.data);
      handleClose();
    } catch (error) {
      control_error("Error al crear estudiante");
      console.error(error);
    }
  };

  const handleClear = () => {
    setForm({
      identificacion: "",
      tipo_documento: "",
      primer_nombre: "",
      segundo_nombre: "",
      primer_apellido: "",
      segundo_apellido: "",
      genero: "",
      fecha_nacimiento: "",
      direccion: "",
      telefono: "",
      correo: "",
      grado: "",
      grupo: "",
      jornada: "",
      año_ingreso: new Date().getFullYear(),
      creditos: 0,
    });
  };

  const textFieldStyle = { borderRadius: '20px', height: 60, fontSize: '1.2rem' };
  const labelStyle = { fontSize: '1.2rem' };

  return (
    <>
   <Button
  variant="contained"
  color="success"
  startIcon={<PersonIcon />} // Cambia por el icono que quieras
  onClick={handleClickOpen}
  sx={{
    fontSize: '1.2rem',        // Tamaño de texto más grande
    padding: '12px 24px',      // Botón más grande
    borderRadius: '12px',      // Esquinas redondeadas
    transition: 'all 0.3s ease', // Animación suave
    boxShadow: 3,              // Sombra
    '&:hover': {
      transform: 'scale(1.05)', // Crece ligeramente al pasar el mouse
      backgroundColor: '#f0f0f0', // Cambia color al hover
      boxShadow: 6,            // Sombra más intensa
    },
  }}
>
  Crear Estudiante
</Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="lg"
        fullWidth
        sx={{ "& .MuiPaper-root": { borderRadius: '16px' } }}
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Title title="Crear Estudiante" />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Identificación"
                value={form.identificacion}
                onChange={(e) => handleInputChange("identificacion", e.target.value)}
                InputProps={{ startAdornment: <BadgeIcon />, sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Tipo Documento"
                value={form.tipo_documento}
                onChange={(e) => handleInputChange("tipo_documento", e.target.value)}
                InputProps={{ startAdornment: <BadgeIcon />, sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
                placeholder="CC, TI, RC"
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Primer Nombre"
                value={form.primer_nombre}
                onChange={(e) => handleInputChange("primer_nombre", e.target.value)}
                InputProps={{ startAdornment: <PersonIcon />, sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Segundo Nombre"
                value={form.segundo_nombre}
                onChange={(e) => handleInputChange("segundo_nombre", e.target.value)}
                InputProps={{ startAdornment: <PersonIcon />, sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Primer Apellido"
                value={form.primer_apellido}
                onChange={(e) => handleInputChange("primer_apellido", e.target.value)}
                InputProps={{ startAdornment: <PersonIcon />, sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Segundo Apellido"
                value={form.segundo_apellido}
                onChange={(e) => handleInputChange("segundo_apellido", e.target.value)}
                InputProps={{ startAdornment: <PersonIcon />, sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="Género"
                value={form.genero}
                onChange={(e) => handleInputChange("genero", e.target.value)}
                InputProps={{ startAdornment: <PersonIcon />, sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
                placeholder="M/F"
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="date"
                size="small"
                label="Fecha de Nacimiento"
                value={form.fecha_nacimiento}
                onChange={(e) => handleInputChange("fecha_nacimiento", e.target.value)}
                InputLabelProps={{ shrink: true, sx: labelStyle }}
                InputProps={{ startAdornment: <EventIcon />, sx: textFieldStyle }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="Grupo"
                value={form.grupo}
                onChange={(e) => handleInputChange("grupo", e.target.value)}
                InputProps={{ startAdornment: <GroupIcon />, sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Dirección"
                value={form.direccion}
                onChange={(e) => handleInputChange("direccion", e.target.value)}
                InputProps={{ startAdornment: <HomeIcon />, sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Teléfono"
                value={form.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
                InputProps={{ startAdornment: <PhoneIcon />, sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 8 }}>
              <TextField
                fullWidth
                type="email"
                size="small"
                label="Correo Electrónico"
                value={form.correo}
                onChange={(e) => handleInputChange("correo", e.target.value)}
                InputProps={{ startAdornment: <EmailIcon />, sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="Grado"
                value={form.grado}
                onChange={(e) => handleInputChange("grado", e.target.value)}
                InputProps={{ startAdornment: <SchoolIcon />, sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="Jornada"
                value={form.jornada}
                onChange={(e) => handleInputChange("jornada", e.target.value)}
                InputProps={{ startAdornment: <AccessTimeIcon />, sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
                placeholder="Mañana, Tarde, Nocturna"
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Año de Ingreso"
                value={form.año_ingreso}
                onChange={(e) => handleInputChange("año_ingreso", parseInt(e.target.value))}
                InputProps={{ startAdornment: <CalendarTodayIcon />, sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                type="number"
                label="Créditos"
                value={form.creditos}
                onChange={(e) => handleInputChange("creditos", parseFloat(e.target.value))}
                InputProps={{ startAdornment: <SchoolIcon />, sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" startIcon={<CancelIcon />} onClick={handleClear}>
            Limpiar
          </Button>
          <Button variant="contained" color="primary" startIcon={<SaveIcon />} onClick={handleSave}>
            Guardar
          </Button>
          <Button variant="contained" color="error" startIcon={<CloseIcon />} onClick={handleClose}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
