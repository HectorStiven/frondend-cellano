import React, { useState, useRef } from "react";
import {
  Button,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
  Avatar,
  Tooltip,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import CakeIcon from "@mui/icons-material/Cake";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Title } from "../../../Elements/Titulo/Titulo";
import { control_success } from "../../../Elements/alertas/alertaSucces";
import { control_error } from "../../../Elements/alertas/alertaError";
import { api } from "../../../api/Axios";
import Webcam from "react-webcam";

interface MenuForm {
  fecha: string;
  descripcion: string;
  plato_principal: string;
  acompanamiento: string;
  bebida: string;
  postre: string;
  calorias_total: number;
  fotoId?: File | null;
}

export const ModalCrearMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const [form, setForm] = useState<MenuForm>({
    fecha: new Date().toISOString().split("T")[0],
    descripcion: "",
    plato_principal: "",
    acompanamiento: "",
    bebida: "",
    postre: "",
    calorias_total: 0,
    fotoId: null,
  });

  const handleInputChange = (field: keyof MenuForm, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setShowCamera(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleInputChange("fotoId", e.target.files[0]);
    }
  };

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const byteString = atob(imageSrc.split(",")[1]);
        const mimeString = imageSrc.split(",")[0].split(":")[1].split(";")[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const file = new File([ab], "foto_menu.jpg", { type: mimeString });
        handleInputChange("fotoId", file);
        setShowCamera(false);
      }
    }
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("fecha", form.fecha);
      formData.append("descripcion", form.descripcion);
      formData.append("plato_principal", form.plato_principal);
      formData.append("acompanamiento", form.acompanamiento);
      formData.append("bebida", form.bebida);
      formData.append("postre", form.postre);
      formData.append("calorias_total", String(form.calorias_total));
      if (form.fotoId) formData.append("fotoId", form.fotoId);

      await api.post("almuerzo_check/menu/crear/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      control_success("Menú creado correctamente");
      handleClose();
      handleClear();
    } catch (error) {
      control_error("Error al crear menú");
      console.error(error);
    }
  };

  const handleClear = () => {
    setForm({
      fecha: new Date().toISOString().split("T")[0],
      descripcion: "",
      plato_principal: "",
      acompanamiento: "",
      bebida: "",
      postre: "",
      calorias_total: 0,
      fotoId: null,
    });
    setShowCamera(false);
  };

  const textFieldStyle = {
    borderRadius: "20px",
    height: 60,
    fontSize: "1.2rem",
  };
  const labelStyle = { fontSize: "1.2rem" };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        startIcon={<RestaurantIcon />}
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
        Crear Menú
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        sx={{ "& .MuiPaper-root": { borderRadius: "16px" } }}
      >
        <DialogContent>
          <Grid container spacing={2} justifyContent="center">
            <Grid size={{ xs: 12 }} display="flex" justifyContent="center">
              <Title title="Crear Menú" />
            </Grid>

            {/* Foto al principio */}
            <Grid
              size={{ xs: 12 }}
              display="flex"
              justifyContent="center"
              flexDirection="column"
              alignItems="center"
            >
              <Box display="flex" gap={1} mb={1}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<UploadFileIcon />}
                >
                  {form.fotoId ? "Foto seleccionada" : "Subir Foto"}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<CameraAltIcon />}
                  onClick={() => setShowCamera(!showCamera)}
                >
                  Tomar Foto
                </Button>
              </Box>

              {showCamera && (
                <Box mt={1}>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={300}
                    videoConstraints={{ facingMode: "user" }}
                  />
                  <Button
                    variant="contained"
                    sx={{ mt: 1 }}
                    onClick={handleCapture}
                  >
                    Capturar
                  </Button>
                </Box>
              )}

              {form.fotoId && !showCamera && (
                <Tooltip title={form.fotoId.name}>
                  <Avatar
                    src={URL.createObjectURL(form.fotoId)}
                    sx={{ width: 120, height: 120, mt: 1 }}
                  />
                </Tooltip>
              )}
            </Grid>

            {/* Campos del formulario */}
            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                type="date"
                size="small"
                label="Fecha"
                value={form.fecha}
                onChange={(e) => handleInputChange("fecha", e.target.value)}
                InputLabelProps={{ shrink: true, sx: labelStyle }}
                InputProps={{ sx: textFieldStyle }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Descripción"
                value={form.descripcion}
                onChange={(e) =>
                  handleInputChange("descripcion", e.target.value)
                }
                InputProps={{ sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Plato Principal"
                value={form.plato_principal}
                onChange={(e) =>
                  handleInputChange("plato_principal", e.target.value)
                }
                InputProps={{
                  startAdornment: <FastfoodIcon />,
                  sx: textFieldStyle,
                }}
                InputLabelProps={{ sx: labelStyle }}
                required
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                size="small"
                label="Acompañamiento"
                value={form.acompanamiento}
                onChange={(e) =>
                  handleInputChange("acompanamiento", e.target.value)
                }
                InputProps={{
                  startAdornment: <FastfoodIcon />,
                  sx: textFieldStyle,
                }}
                InputLabelProps={{ sx: labelStyle }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="Bebida"
                value={form.bebida}
                onChange={(e) => handleInputChange("bebida", e.target.value)}
                InputProps={{
                  startAdornment: <LocalDrinkIcon />,
                  sx: textFieldStyle,
                }}
                InputLabelProps={{ sx: labelStyle }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                size="small"
                label="Postre"
                value={form.postre}
                onChange={(e) => handleInputChange("postre", e.target.value)}
                InputProps={{
                  startAdornment: <CakeIcon />,
                  sx: textFieldStyle,
                }}
                InputLabelProps={{ sx: labelStyle }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <TextField
                fullWidth
                type="number"
                size="small"
                label="Calorías Totales"
                value={form.calorias_total}
                onChange={(e) =>
                  handleInputChange("calorias_total", parseInt(e.target.value))
                }
                InputProps={{ sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
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
            color="primary"
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
