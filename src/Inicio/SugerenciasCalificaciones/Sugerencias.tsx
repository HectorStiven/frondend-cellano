import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Grid,
  Typography,
  Zoom,
  Rating,
} from "@mui/material";
import { Feedback, Send, PhotoCamera } from "@mui/icons-material";
import { Title } from "../../Elements/Titulo/Titulo";
import { control_error } from "../../Elements/alertas/alertaError";
import { control_success } from "../../Elements/alertas/alertaSucces";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { api } from "../../api/Axios";

export const Sugerencias = () => {
  const [platillo, setPlatillo] = useState("");
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState<number | null>(0);
  const [foto, setFoto] = useState<string | null>(null);
  const estudianteInfo = useSelector(
    (state: RootState) => state.auth.estudiante_info
  );
  const [enviada, setEnviada] = useState(false);

  const handleFotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFoto(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleEnviar = async () => {
    if (!platillo.trim() || !comentario.trim() || !calificacion) {
      control_error("❌ Por favor, completa todos los campos antes de enviar.");
      return;
    }

    if (!estudianteInfo) {
      control_error("❌ No se encontró información del estudiante.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("estudiante", estudianteInfo.id.toString());
      formData.append("menu",platillo); // Cambiar según corresponda
      formData.append("comentario", comentario);
      formData.append("calificacion", calificacion!.toString());

      if (foto) {
        const blob = await fetch(foto).then((res) => res.blob());
        formData.append("fotoId", blob, "foto.jpg");
      }

      // Envío con la misma forma que tu login
      const res = await api.post(
        "/almuerzo_check/sugerencias/crear/",
        formData
      );
      console.log(res.data);
      control_success("✅ Sugerencia enviada con éxito!");
      setEnviada(true);

      // Limpiar formulario
      setPlatillo("");
      setComentario("");
      setCalificacion(0);
      setFoto(null);

      // Opcional: reset estado del icono después de 2s
      setTimeout(() => setEnviada(false), 2000);
    } catch (error: any) {
      const isAxiosError = error.isAxiosError || error.response;
      const mensaje =
        (isAxiosError && error.response?.data?.detail) ||
        "❌ Error al enviar sugerencia";
      control_error(mensaje);
    }
  };

  return (
    <Box
      sx={{
        p: 4,
        backgroundColor: "#fafafa",
        borderRadius: 4,
        boxShadow: 4,
        m: 3,
      }}
    >
      <Grid
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        {/* Título principal */}
        <Grid size={{ xs: 12 }}>
          <Title title="Sugerencias del Restaurante Escolar" />
        </Grid>

        {/* Ícono principal con animación */}
        <Grid size={{ xs: 12 }}>
          <Box sx={{ mb: 1, display: "flex", justifyContent: "center" }}>
            <Feedback
              sx={{
                fontSize: enviada ? 90 : 70,
                color: enviada ? "success.main" : "#1976d2",
                transition: "all 0.5s ease",
              }}
            />
          </Box>

          <Zoom in={enviada}>
            <Typography
              variant="h6"
              color="success.main"
              sx={{ fontWeight: "bold", mb: 1 }}
            >
              ¡Sugerencia enviada con éxito!
            </Typography>
          </Zoom>
        </Grid>

        {/* Campos del formulario */}
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            label="Platillo sugerido"
            variant="outlined"
            fullWidth
            value={platillo}
            onChange={(e) => setPlatillo(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              },
            }}
          />
          <TextField
            label="Comentario"
            variant="outlined"
            fullWidth
            multiline
            minRows={3}
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            sx={{
              mb: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: "12px",
                backgroundColor: "#fff",
                boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
              },
            }}
          />

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <Typography sx={{ mr: 1 }}>Calificación:</Typography>
            <Rating
              value={calificacion}
              onChange={(_, newValue) => setCalificacion(newValue)}
            />
          </Box>

          <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<PhotoCamera />}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Agregar foto
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFotoChange}
              />
            </Button>
          </Box>

          {foto && (
            <Box display="flex" justifyContent="center" sx={{ mb: 2 }}>
              <img
                src={foto}
                alt="Vista previa"
                style={{
                  maxWidth: "200px",
                  borderRadius: "12px",
                  boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                }}
              />
            </Box>
          )}
        </Grid>

        {/* Botón centrado */}
        <Grid size={{ xs: 12, md: 6 }} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            fullWidth
            startIcon={<Send />}
            onClick={handleEnviar}
            sx={{
              borderRadius: 3,
              p: 1.2,
              boxShadow: 2,
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Enviar sugerencia
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};
