import React, { useState } from "react";
import { Button, Grid, Dialog, DialogActions, DialogContent, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalDrinkIcon from "@mui/icons-material/LocalDrink";
import CakeIcon from "@mui/icons-material/Cake";
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
}

export const ModalCrearMenu: React.FC = () => {
  const [open, setOpen] = useState(false);

  const [form, setForm] = useState<MenuForm>({
    fecha: new Date().toISOString().split("T")[0],
    descripcion: "",
    plato_principal: "",
    acompanamiento: "",
    bebida: "",
    postre: "",
    calorias_total: 0,
  });

  const handleInputChange = (field: keyof MenuForm, value: any) => {
    setForm({ ...form, [field]: value });
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = async () => {
    try {
      const res = await api.post("/menu/crear/", form);
      control_success("Menú creado correctamente");
      console.log(res.data);
      handleClose();
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
    });
  };

  const textFieldStyle = { borderRadius: '20px', height: 60, fontSize: '1.2rem' };
  const labelStyle = { fontSize: '1.2rem' };

  return (
    <>
      <Button
        variant="contained"
        color="success"
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
        Crear Menú
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
              <Title title="Crear Menú" />
            </Grid>

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
