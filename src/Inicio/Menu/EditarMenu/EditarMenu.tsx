import React, { useState, useRef } from "react";
import { Button, Grid, Dialog, DialogActions, DialogContent, TextField, Avatar, Box } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import CakeIcon from "@mui/icons-material/Cake";
import Webcam from "react-webcam";
import { Title } from "../../../Elements/Titulo/Titulo";
import { control_success } from "../../../Elements/alertas/alertaSucces";
import { control_error } from "../../../Elements/alertas/alertaError";
import { api } from "../../../api/Axios";

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

export const ModalEditarMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [fotoPreview, setFotoPreview] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const [form, setForm] = useState<MenuForm>({
    fecha: "2025-10-29",
    descripcion: "Menú saludable con opciones ligeras y nutritivas.",
    plato_principal: "Pechuga de pollo a la plancha",
    acompanamiento: "Quinoa con verduras",
    bebida: "Agua de limón",
    postre: "Yogur con frutas",
    calorias_total: 650,
    fotoId: null,
  });

  const handleInputChange = (field: keyof MenuForm, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Captura foto desde la webcam
  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        fetch(imageSrc)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], "foto_menu.jpg", { type: "image/jpeg" });
            setForm({ ...form, fotoId: file });
            setFotoPreview(URL.createObjectURL(file));
          });
      }
    }
  };

  // Subir foto desde archivo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setForm({ ...form, fotoId: file });
      setFotoPreview(URL.createObjectURL(file));
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

      await api.put("/menu/editar/1/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      control_success("Menú actualizado correctamente");
      handleClose();
    } catch (error) {
      control_error("Error al actualizar menú");
      console.error(error);
    }
  };

  const handleClear = () => {
    setForm({
      fecha: "2025-10-29",
      descripcion: "Menú saludable con opciones ligeras y nutritivas.",
      plato_principal: "Pechuga de pollo a la plancha",
      acompanamiento: "Quinoa con verduras",
      bebida: "Agua de limón",
      postre: "Yogur con frutas",
      calorias_total: 650,
      fotoId: null,
    });
    setFotoPreview(null);
  };

  const textFieldStyle = { borderRadius: '20px', height: 60, fontSize: '1.2rem' };
  const labelStyle = { fontSize: '1.2rem' };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        startIcon={<RestaurantIcon />}
        onClick={handleClickOpen}
        sx={{
          fontSize: '1.2rem',
          padding: '12px 24px',
          borderRadius: '12px',
          transition: 'all 0.3s ease',
          boxShadow: 3,
          '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: '#f0f0f0',
            boxShadow: 6,
          },
        }}
      >
        Editar Menú
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

            {/* Título */}
            <Grid size={{ xs: 12 }}>
              <Title title="Editar Menú" />
            </Grid>

            {/* FOTO */}
            <Grid size={{ xs: 12 }} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}>
              {fotoPreview ? (
                <Avatar src={fotoPreview} alt="Foto menú" sx={{ width: 150, height: 150 }} />
              ) : (
                <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" width={150} height={150} />
              )}
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button variant="contained" onClick={capturePhoto}>Tomar Foto</Button>
                <Button variant="contained" component="label">
                  Subir Foto
                  <input type="file" hidden accept="image/*" onChange={handleFileUpload} />
                </Button>
              </Box>
            </Grid>

            {/* FORMULARIO */}
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
                onChange={(e) => handleInputChange("descripcion", e.target.value)}
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
                onChange={(e) => handleInputChange("plato_principal", e.target.value)}
                InputProps={{ startAdornment: <FastfoodIcon />, sx: textFieldStyle }}
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
                onChange={(e) => handleInputChange("acompanamiento", e.target.value)}
                InputProps={{ startAdornment: <FastfoodIcon />, sx: textFieldStyle }}
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
                InputProps={{ startAdornment: <LocalDrinkIcon />, sx: textFieldStyle }}
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
                InputProps={{ startAdornment: <CakeIcon />, sx: textFieldStyle }}
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
                onChange={(e) => handleInputChange("calorias_total", parseInt(e.target.value))}
                InputProps={{ sx: textFieldStyle }}
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
