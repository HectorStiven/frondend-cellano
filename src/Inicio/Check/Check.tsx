import React, { useState, useRef } from "react";
import { Box, Button, Grid, TextField, Typography, Modal } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EmailIcon from "@mui/icons-material/Email";
import BadgeIcon from "@mui/icons-material/Badge";
import UploadIcon from "@mui/icons-material/Upload";
import Webcam from "react-webcam";
import { control_error } from "../../Elements/alertas/alertaError";
import { control_success } from "../../Elements/alertas/alertaSucces";
import { Title } from "../../Elements/Titulo/Titulo";
import { api } from "../../api/Axios";
import { Info } from "./Info/Info";

// Interfaz del estudiante
interface Estudiante {
  id: number;
  identificacion: string;
  tipo_documento: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  foto: string | null;
  genero: string;
  fecha_nacimiento: string;
  direccion: string;
  telefono: string;
  correo: string;
  grado: string;
  grupo: string;
  jornada: string;
  año_ingreso: number;
  estado: boolean;
  creditos: string;
  creado_en: string;
  fotoId?: string;
}

const estudianteInicial: Estudiante = {
  id: 0,
  identificacion: "",
  tipo_documento: "",
  primer_nombre: "",
  segundo_nombre: "",
  primer_apellido: "",
  segundo_apellido: "",
  foto: null,
  genero: "",
  fecha_nacimiento: "",
  direccion: "",
  telefono: "",
  correo: "",
  grado: "",
  grupo: "",
  jornada: "",
  año_ingreso: 0,
  estado: false,
  creditos: "",
  creado_en: "",
  fotoId: "",
};

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

  const [openCam, setOpenCam] = useState(false);
  const webcamRef = useRef<Webcam>(null);
  const [captura, setCaptura] = useState<string | null>(
    "https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif"
  );
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

    // Petición a la API enviando ambos campos
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

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setCaptura(imageSrc);
      control_success("Foto capturada correctamente ✅");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setCaptura(reader.result as string);
        control_success("Imagen cargada correctamente ✅");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEnviarFoto = async () => {
    if (!captura) {
      control_error("Primero toma o sube una foto.");
      return;
    }

    try {
      setEnviando(true);

      const byteString = atob(captura.split(",")[1]);
      const mimeString = captura.split(",")[0].split(":")[1].split(";")[0];
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

        console.log("Estudiante reconocido:", info);
        control_success(
          response.data.detail || "Rostro reconocido correctamente ✅"
        );
        setOpenCam(false);
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
      <Grid size={{ xs: 12 }}>
        <Title title="Check Estudiante" />
      </Grid>

      {/* Inputs */}
      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Correo"
          variant="outlined"
          value={form.correo}
          onChange={(e) => handleInputChange("correo", e.target.value)}
          InputProps={{ startAdornment: <EmailIcon sx={{ mr: 1 }} /> }}
          sx={textFieldStyle}
          InputLabelProps={{ sx: labelStyle }}
        />
      </Grid>


      <Grid size={{ xs: 12, md: 6 }}>
        <TextField
          fullWidth
          label="Identificación"
          value={form.identificacion}
          onChange={(e) => handleInputChange("identificacion", e.target.value)}
          InputProps={{ startAdornment: <BadgeIcon sx={{ mr: 1 }} /> }}
       sx={textFieldStyle}
          InputLabelProps={{ sx: labelStyle }}
        />
      </Grid>

      {/* Botones */}
      <Grid size={{ xs: 12 }} display="flex" justifyContent="center" gap={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenCam(true)}
        >
          Reconocimiento Facial
        </Button>

        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleBuscar}
          color="success"
        >
          Buscar Estudiante
        </Button>
      </Grid>

      <Info estudiante={estudiante} onClose={handleClose} />

      {/* Modal cámara */}
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
          }}
        >
          <Typography variant="h6" gutterBottom>
            Captura Facial
          </Typography>

          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: "user" }}
            style={{
              width: 400,
              height: 300,
              borderRadius: "10px",
            }}
          />

          <Box sx={{ mt: 2 }}>
            <Button variant="contained" color="primary" onClick={handleCapture}>
              Tomar Foto
            </Button>

            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadIcon />}
              sx={{ ml: 2 }}
            >
              Subir Imagen
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
          </Box>

          {captura && (
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
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

          <Button
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
            onClick={handleEnviarFoto}
            disabled={enviando}
          >
            {enviando ? "Enviando..." : "Enviar Foto"}
          </Button>
        </Box>
      </Modal>
    </Grid>
  );
};
