import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Avatar,
  MenuItem,
  Box,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import UploadIcon from "@mui/icons-material/Upload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Title } from "../../../Elements/Titulo/Titulo";
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
import { control_success } from "../../../Elements/alertas/alertaSucces";
import { control_error } from "../../../Elements/alertas/alertaError";
import { api } from "../../../api/Axios";
import Webcam from "react-webcam";
import {
  EstudiantesForm,
  Grado,
  GradosResponse,
  initialFormState,
} from "./CrearEstudiantesInterfaces";
import MaleIcon from "@mui/icons-material/Male";
import FemaleIcon from "@mui/icons-material/Female";
import TransgenderIcon from "@mui/icons-material/Transgender";
export const ModalCrearEstudiantes: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<EstudiantesForm>(initialFormState);
  const [grados, setGrados] = useState<Grado[]>([]);
  const tiposDocumento = ["CC", "TI", "CE", "RC"];
  const jornadas = ["Mañana", "Tarde", "Noche"];
  const textFieldStyle = {
    borderRadius: "20px",
    height: 60,
    fontSize: "1.2rem",
  };
  const labelStyle = { fontSize: "1.2rem" };
  const [preview, setPreview] = useState<string | null>(null);
  const [usingCamera, setUsingCamera] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const handleInputChange = (field: keyof EstudiantesForm, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm({ ...form, fotoId: file });
      setPreview(URL.createObjectURL(file));
      setUsingCamera(false);
    }
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setPreview(imageSrc);
        const blob = dataURLtoFile(imageSrc, "captura.jpg");
        setForm({ ...form, fotoId: blob });
        setUsingCamera(false);
      }
    }
  };

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(",");
    const mime = arr[0].match(/:(.*?);/)?.[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setUsingCamera(false);
  };

  console.log(form);

  const handleSave = async () => {
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== null && value !== undefined)
          formData.append(key, value as any);
      });

      // créditos siempre 0 por defecto
      formData.append("creditos", "0");

      const res = await api.post(
        "/almuerzo_check/usuarios/crear_estudiante/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      control_success("Estudiante creado correctamente");
      console.log(res.data);
      handleClose();
    } catch (error) {
      control_error("Error al crear estudiante");
      console.error(error);
    }
  };

  const handleClear = () => {
    setForm(initialFormState);
    setPreview(null);
    setUsingCamera(false);
  };

  const handleGetGrados = async () => {
    try {
      const res = await api.get<GradosResponse>(
        "/almuerzo_check/grados/listar/"
      );
      if (res.data.success) {
        setGrados(res.data.data);
      } else {
        control_error("No se pudieron cargar los grados");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleGetGrados();
  }, []);

  return (
    <>
      <Button
        variant="contained"
        color="success"
        startIcon={<PersonIcon />}
        onClick={handleClickOpen}
        sx={{
          fontSize: "1.2rem",
          padding: "12px 24px",
          borderRadius: "12px",
          transition: "all 0.3s ease",
          boxShadow: 3,
          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor: "#f0f0f0",
            boxShadow: 6,
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
        sx={{ "& .MuiPaper-root": { borderRadius: "16px" } }}
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Title title="Crear Estudiante" />
            </Grid>

            {/* Foto */}
            <Grid
              size={{ xs: 12, md: 4 }}
              display="flex"
              flexDirection="column"
              alignItems="center"
            >
              {usingCamera ? (
                <Box display="flex" flexDirection="column" alignItems="center">
                  <Webcam
                    ref={webcamRef}
                    audio={false}
                    screenshotFormat="image/jpeg"
                    width={220}
                    videoConstraints={{ facingMode: "user" }}
                    style={{ borderRadius: "10px", marginBottom: "10px" }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCapture}
                  >
                    Capturar
                  </Button>
                </Box>
              ) : (
                <>
                  <Avatar
                    src={preview || ""}
                    sx={{
                      width: 140,
                      height: 140,
                      mb: 1,
                      border: "2px solid #ccc",
                    }}
                  />
                  <Box display="flex" gap={1}>
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<UploadIcon />}
                      sx={{ borderRadius: "10px" }}
                    >
                      Subir Foto
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleFileChange}
                      />
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<CameraAltIcon />}
                      onClick={() => setUsingCamera(true)}
                      sx={{ borderRadius: "10px" }}
                    >
                      Tomar Foto
                    </Button>
                  </Box>
                </>
              )}
            </Grid>

            {/* Campos generales */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container spacing={2}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    select
                    label="Tipo Documento"
                    value={form.tipo_documento}
                    onChange={(e) =>
                      handleInputChange("tipo_documento", e.target.value)
                    }
                    InputProps={{
                      startAdornment: <BadgeIcon />,
                      sx: textFieldStyle,
                    }}
                    InputLabelProps={{ sx: labelStyle }}
                    required
                  >
                    {tiposDocumento.map((tipo) => (
                      <MenuItem key={tipo} value={tipo}>
                        {tipo}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Identificación"
                    value={form.identificacion}
                    onChange={(e) =>
                      handleInputChange("identificacion", e.target.value)
                    }
                    InputProps={{
                      startAdornment: <BadgeIcon />,
                      sx: textFieldStyle,
                    }}
                    InputLabelProps={{ sx: labelStyle }}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Primer Nombre"
                    value={form.primer_nombre}
                    onChange={(e) =>
                      handleInputChange("primer_nombre", e.target.value)
                    }
                    InputProps={{
                      startAdornment: <PersonIcon />,
                      sx: textFieldStyle,
                    }}
                    InputLabelProps={{ sx: labelStyle }}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Segundo Nombre"
                    value={form.segundo_nombre}
                    onChange={(e) =>
                      handleInputChange("segundo_nombre", e.target.value)
                    }
                    InputProps={{
                      startAdornment: <PersonIcon />,
                      sx: textFieldStyle,
                    }}
                    InputLabelProps={{ sx: labelStyle }}
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Primer Apellido"
                    value={form.primer_apellido}
                    onChange={(e) =>
                      handleInputChange("primer_apellido", e.target.value)
                    }
                    InputProps={{
                      startAdornment: <PersonIcon />,
                      sx: textFieldStyle,
                    }}
                    InputLabelProps={{ sx: labelStyle }}
                    required
                  />
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Segundo Apellido"
                    value={form.segundo_apellido}
                    onChange={(e) =>
                      handleInputChange("segundo_apellido", e.target.value)
                    }
                    InputProps={{
                      startAdornment: <PersonIcon />,
                      sx: textFieldStyle,
                    }}
                    InputLabelProps={{ sx: labelStyle }}
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Resto de campos */}

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel sx={labelStyle}>Género</InputLabel>

                <Select
                  label="Género"
                  value={form.genero}
                  onChange={(e) => handleInputChange("genero", e.target.value)}
                  sx={textFieldStyle}
                  required
                >
                  <MenuItem value="M">
                    <MaleIcon style={{ color: "blue", marginRight: 8 }} />
                    Hombre
                  </MenuItem>

                  <MenuItem value="F">
                    <FemaleIcon style={{ color: "deeppink", marginRight: 8 }} />
                    Mujer
                  </MenuItem>

                  <MenuItem value="O">
                    <TransgenderIcon
                      style={{ color: "gray", marginRight: 8 }}
                    />
                    Otro
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="date"
                label="Fecha de Nacimiento"
                value={form.fecha_nacimiento}
                onChange={(e) =>
                  handleInputChange("fecha_nacimiento", e.target.value)
                }
                InputLabelProps={{ shrink: true, sx: labelStyle }}
                InputProps={{
                  startAdornment: <EventIcon />,
                  sx: textFieldStyle,
                }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                label="Condición Especial"
                value={form.grupo}
                onChange={(e) => handleInputChange("grupo", e.target.value)}
                InputProps={{
                  startAdornment: <GroupIcon />,
                  sx: textFieldStyle,
                }}
                InputLabelProps={{ sx: labelStyle }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Dirección"
                value={form.direccion}
                onChange={(e) => handleInputChange("direccion", e.target.value)}
                InputProps={{
                  startAdornment: <HomeIcon />,
                  sx: textFieldStyle,
                }}
                InputLabelProps={{ sx: labelStyle }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Teléfono"
                value={form.telefono}
                onChange={(e) => handleInputChange("telefono", e.target.value)}
                InputProps={{
                  startAdornment: <PhoneIcon />,
                  sx: textFieldStyle,
                }}
                InputLabelProps={{ sx: labelStyle }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                type="email"
                label="Correo Electrónico"
                value={form.correo}
                onChange={(e) => handleInputChange("correo", e.target.value)}
                InputProps={{
                  startAdornment: <EmailIcon />,
                  sx: textFieldStyle,
                }}
                InputLabelProps={{ sx: labelStyle }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                select
                label="Grado"
                value={form.grado}
                onChange={(e) => handleInputChange("grado", e.target.value)}
                InputProps={{
                  startAdornment: <SchoolIcon />,
                  sx: textFieldStyle,
                }}
                InputLabelProps={{ sx: labelStyle }}
                required
              >
                {grados.map((g) => (
                  <MenuItem key={g.id} value={g.id}>
                    {g.nombre_grado}- {g.salon}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                select
                label="Jornada"
                value={form.jornada}
                onChange={(e) => handleInputChange("jornada", e.target.value)}
                InputProps={{
                  startAdornment: <AccessTimeIcon />,
                  sx: textFieldStyle,
                }}
                InputLabelProps={{ sx: labelStyle }}
                required
              >
                {jornadas.map((j) => (
                  <MenuItem key={j} value={j}>
                    {j}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="number"
                label="Año de Ingreso"
                value={form.año_ingreso}
                onChange={(e) =>
                  handleInputChange("año_ingreso", parseInt(e.target.value))
                }
                InputProps={{
                  startAdornment: <CalendarTodayIcon />,
                  sx: textFieldStyle,
                }}
                InputLabelProps={{ sx: labelStyle }}
                required
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<CancelIcon />}
            onClick={handleClear}
          >
            Limpiar
          </Button>
          <Button
            variant="contained"
            color="success"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Guardar
          </Button>
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
