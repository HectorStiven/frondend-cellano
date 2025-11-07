import React, { useState, useRef } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import Webcam from "react-webcam";
import { control_error } from "../../Elements/alertas/alertaError";
import { control_success } from "../../Elements/alertas/alertaSucces";
import { Title } from "../../Elements/Titulo/Titulo";
import { api } from "../../api/Axios";
import { Info } from "./Info/Info";
import { Estudiante, estudianteInicial } from "./CheckInterfaces";
import { motion } from "framer-motion";
import { Face6Rounded } from "@mui/icons-material"; // ✅ ícono de rostro disponible

interface ReconocimientoResponse {
  success: boolean;
  detail: string;
  data: Estudiante;
}

export const CheckEstudiante: React.FC = () => {
  const [form, setForm] = useState({
    correo: "",
    primer_nombre: "",
    identificacion: "",
    segundo_nombre: "",
    segundo_apellido: "",
    grado: "",
    grupo: "",
    jornada: "",
    año_ingreso: 0,
  });

  const webcamRef = useRef<Webcam>(null);
  const [captura, setCaptura] = useState<string | null>(null);
  const [enviando, setEnviando] = useState(false);
  const [estudiante, setEstudiante] = useState<Estudiante>(estudianteInicial);

  const handleInputChange = (campo: keyof typeof form, valor: string) => {
    setForm({ ...form, [campo]: valor });
  };

  const handleBuscar = async () => {
    if (!form.identificacion && !form.correo) {
      control_error("Debe ingresar identificación o correo.");
      return;
    }

    try {
      setEnviando(true);
      const response = await api.post<ReconocimientoResponse>(
        "/almuerzo_check/webcam/manual/",
        {
          identificacion: form.identificacion,
          correo: form.correo,
        }
      );

      if (response.data.success) {
        const info = response.data.data;

        setEstudiante({
          ...info,
          fotoId:
            info.fotoId ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        });

        control_success(response.data.detail || "Estudiante encontrado ✅");
      } else {
        control_error(response.data.detail || "No se encontró estudiante 😢");
      }
    } catch (error: any) {
      control_error(
        error?.response?.data?.detail || "Error al buscar estudiante."
      );
    } finally {
      setEnviando(false);
    }
  };

  const handleEnviarFoto = async () => {
    if (!webcamRef.current) {
      control_error("Webcam no disponible.");
      return;
    }

    try {
      setEnviando(true);

      // Tomar captura directamente de la webcam
      const imageSrc = webcamRef.current.getScreenshot();
      if (!imageSrc) {
        control_error("No se pudo capturar la imagen.");
        setEnviando(false);
        return;
      }

      setCaptura(imageSrc); // actualizar previsualización

      // Convertir a Blob para enviar
      const byteString = atob(imageSrc.split(",")[1]);
      const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++)
        ia[i] = byteString.charCodeAt(i);
      const blob = new Blob([ab], { type: mimeString });

      const formData = new FormData();
      formData.append("fotoId", blob, "captura.jpg");

      const response = await api.post<ReconocimientoResponse>(
        "/almuerzo_check/webcam/service/",
        formData
      );

      if (response.data.success) {
        const info = response.data.data;

        setEstudiante({
          ...info,
          fotoId:
            info.fotoId ||
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        });

        control_success(
          response.data.detail || "Rostro reconocido correctamente ✅"
        );
      } else {
        control_error("No se reconoció ningún rostro 😢");
      }
    } catch (error: any) {
      control_error("Error al enviar la foto.");
    } finally {
      setEnviando(false);
    }
  };

  const handleClose = () => {
    setEstudiante({ ...estudiante, id: 0 }); // borra la info para que desaparezca
  };

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "20px",
      backgroundColor: "#fff",
      boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    },
  };

  const labelStyle = {
    fontSize: "1.1rem",
    letterSpacing: 0.5,
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

      {/* Lado izquierdo: Cámara */}
      <Grid size={{ xs: 12, md: 5 }}>
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          videoConstraints={{ facingMode: "user" }}
          style={{
            width: "100%",
            height: 300,
            borderRadius: "10px",
          }}
        />

        {captura && (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
              mt: 2,
            }}
          >
            <Typography variant="body2" sx={{ mb: 1 }}>
              Previsualización:
            </Typography>
            <img
              src={captura}
              alt="captura facial"
              style={{
                width: "150px",
                height: "auto",
                borderRadius: "10px",
                border: "2px solid #ccc",
                boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
              }}
            />
          </Box>
        )}

        <Grid container justifyContent="center" mt={2}>
          <Button
            variant="contained"
            color="success"
            onClick={handleEnviarFoto}
            disabled={enviando}
            fullWidth
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
              width: "50%",
              textTransform: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 1,
              borderRadius: 3,
              boxShadow: 3,
            }}
          >
            {enviando ? (
              <>
                <CircularProgress size={22} color="inherit" />
                <motion.span
                  animate={{ opacity: [1, 0.6, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  Escaneando...
                </motion.span>
              </>
            ) : (
              <>
                <Face6Rounded sx={{ fontSize: 24 }} />
                Escanear Rostro
              </>
            )}
          </Button>
        </Grid>
      </Grid>

      {/* Divisor vertical */}
      <Grid
        size={{ xs: 12, md: 1 }}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: "2px",
            height: "80%",
            background: "linear-gradient(to bottom, #0d47a1, #42a5f5, #0d47a1)",
            borderRadius: "2px",
          }}
        />
      </Grid>

      {/* Lado derecho: Formulario */}
      <Grid size={{ xs: 12, md: 6 }}>
        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Correo"
            variant="outlined"
            value={form.correo}
            onChange={(e) => handleInputChange("correo", e.target.value)}
            InputProps={{
              startAdornment: <EmailIcon sx={{ mr: 1, color: "#1976d2" }} />,
            }}
            sx={textFieldStyle}
            InputLabelProps={{ sx: labelStyle }}
            margin="normal"
          />
        </Grid>

        <Grid size={{ xs: 12 }}>
          <TextField
            fullWidth
            label="Identificación"
            value={form.identificacion}
            onChange={(e) =>
              handleInputChange("identificacion", e.target.value)
            }
            InputProps={{
              startAdornment: <BadgeIcon sx={{ mr: 1, color: "#388e3c" }} />,
            }}
            sx={textFieldStyle}
            InputLabelProps={{ sx: labelStyle }}
            margin="normal"
          />
        </Grid>

        <Grid
          size={{ xs: 4 }}
          display="flex"
          justifyContent="center"
          gap={2}
          mt={2}
        >
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleBuscar}
            color="success"
            sx={{ borderRadius: 5 }}
          >
            Buscar Estudiante
          </Button>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Info estudiante={estudiante} onClose={handleClose} />
        </Grid>
      </Grid>
    </Grid>
  );
};
