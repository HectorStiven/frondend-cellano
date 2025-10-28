import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Card,
  Typography,
  Modal,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import PersonIcon from "@mui/icons-material/Person";
import BadgeIcon from "@mui/icons-material/Badge";
import Webcam from "react-webcam";
import { control_error } from "../../Elements/alertas/alertaError";
import { control_success } from "../../Elements/alertas/alertaSucces";
import { Title } from "../../Elements/Titulo/Titulo";

interface Estudiante {
  id: number;
  identificacion: string;
  primer_nombre: string;
  primer_apellido: string;
  correo: string;
  grado: string;
  grupo: string;
  jornada: string;
  estado: boolean;
  creditos: string;
}

export const CheckEstudiante: React.FC = () => {
  const estudiantes: Estudiante[] = [
    {
      id: 1,
      identificacion: "12345",
      primer_nombre: "Juan",
      primer_apellido: "Pérez",
      correo: "juan.perez@example.com",
      grado: "10",
      grupo: "A",
      jornada: "Mañana",
      estado: true,
      creditos: "15",
    },
    {
      id: 2,
      identificacion: "67890",
      primer_nombre: "María",
      primer_apellido: "López",
      correo: "maria.lopez@example.com",
      grado: "9",
      grupo: "B",
      jornada: "Tarde",
      estado: false,
      creditos: "10",
    },
    {
      id: 3,
      identificacion: "55555",
      primer_nombre: "Carlos",
      primer_apellido: "Gómez",
      correo: "carlos.gomez@example.com",
      grado: "11",
      grupo: "C",
      jornada: "Mañana",
      estado: true,
      creditos: "20",
    },
  ];

  const [form, setForm] = useState({
    correo: "",
    primer_nombre: "",
    identificacion: "",
  });

  const [resultado, setResultado] = useState<Estudiante | null>(null);

  // Modal cámara
  const [openCam, setOpenCam] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const [captura, setCaptura] = useState<string | null>(null);

  const handleInputChange = (campo: keyof typeof form, valor: string) => {
    setForm({ ...form, [campo]: valor });
  };

  const handleBuscar = () => {
    const { correo, primer_nombre, identificacion } = form;

    if (!correo && !primer_nombre && !identificacion) {
      control_error("Debes ingresar al menos un campo para buscar");
      return;
    }

    const encontrado = estudiantes.find(
      (e) =>
        (correo && e.correo.toLowerCase() === correo.toLowerCase()) ||
        (primer_nombre &&
          e.primer_nombre.toLowerCase() === primer_nombre.toLowerCase()) ||
        (identificacion && e.identificacion === identificacion)
    );

    if (encontrado) {
      setResultado(encontrado);
      control_success("Estudiante encontrado correctamente");
    } else {
      setResultado(null);
      control_error("No se encontró el estudiante");
    }
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCaptura(imageSrc);
      console.log("Imagen capturada:", imageSrc);
      setOpenCam(false);
    }
  };

  return (
    <Grid
      container
      spacing={3}
      sx={{
        p: 4,
        backgroundColor: "#fafafa",
        borderRadius: 4,
        boxShadow: 4,
        m: 3,
      }}
    >
      {/* Título */}
      <Grid size={{ xs: 12 }}>
        <Title title="Check Estudiante" />
      </Grid>

      {/* Inputs */}
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          label="Correo"
          value={form.correo}
          onChange={(e) => handleInputChange("correo", e.target.value)}
          InputProps={{ startAdornment: <EmailIcon sx={{ mr: 1 }} /> }}
          size="small"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          label="Primer Nombre"
          value={form.primer_nombre}
          onChange={(e) => handleInputChange("primer_nombre", e.target.value)}
          InputProps={{ startAdornment: <PersonIcon sx={{ mr: 1 }} /> }}
          size="small"
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          label="Identificación"
          value={form.identificacion}
          onChange={(e) => handleInputChange("identificacion", e.target.value)}
          InputProps={{ startAdornment: <BadgeIcon sx={{ mr: 1 }} /> }}
          size="small"
        />
      </Grid>

      {/* Botones */}
      <Grid container size={{ xs: 12 }} justifyContent="center" alignItems="center" spacing={2}>
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontSize: "1rem",
            borderRadius: "10px",
            boxShadow: 3,
            "&:hover": { backgroundColor: "#1565c0", transform: "scale(1.05)" },
          }}
          onClick={() => setOpenCam(true)}
        >
          Reconocimiento Facial
        </Button>

        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleBuscar}
          sx={{
            fontSize: "1rem",
            borderRadius: "10px",
            boxShadow: 3,
            "&:hover": { backgroundColor: "#2e7d32", transform: "scale(1.05)" },
          }}
          color="success"
        >
          Buscar Estudiante
        </Button>
      </Grid>

      {/* Resultado */}
      {resultado && (
        <Grid size={{ xs: 12 }}>
          <Card sx={{ mt: 3, p: 2, backgroundColor: "#e8f5e9" }}>
            <Typography variant="h6" gutterBottom>
              ✅ Resultado de la búsqueda
            </Typography>
            <Typography variant="body1">
              <strong>Nombre:</strong> {resultado.primer_nombre} {resultado.primer_apellido}
            </Typography>
            <Typography variant="body1">
              <strong>Identificación:</strong> {resultado.identificacion}
            </Typography>
            <Typography variant="body1">
              <strong>Grado:</strong> {resultado.grado} | <strong>Grupo:</strong>{" "}
              {resultado.grupo} | <strong>Jornada:</strong> {resultado.jornada}
            </Typography>
            <Typography variant="body1">
              <strong>Créditos:</strong> {resultado.creditos}
            </Typography>
            <Typography variant="body1">
              <strong>Estado:</strong> {resultado.estado ? "Activo" : "Inactivo"}
            </Typography>
          </Card>
        </Grid>
      )}

      {/* Modal Cámara */}
    <Modal open={openCam} onClose={() => setOpenCam(false)}>
  <Box
    sx={{
      position: "absolute" as "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      borderRadius: 2,
      textAlign: "center",
      width: 450,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Typography variant="h6" gutterBottom>
      Captura Facial
    </Typography>

    {/* Siempre renderiza Webcam */}
    <Webcam
      audio={false}
      ref={webcamRef}
      screenshotFormat="image/jpeg"
      videoConstraints={{ facingMode: "user" }}
      style={{
        width: 400,
        height: 300,
        borderRadius: "10px",
        display: openCam ? "block" : "none", // Se muestra solo si openCam es true
      }}
    />

    <Button
      variant="contained"
      color="primary"
      sx={{ mt: 2 }}
      onClick={handleCapture}
    >
      Tomar Foto
    </Button>

    {captura && (
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">Previsualización:</Typography>
        <img src={captura} alt="captura facial" style={{ width: "100%" }} />
      </Box>
    )}
  </Box>
</Modal>

    </Grid>
  );
};
