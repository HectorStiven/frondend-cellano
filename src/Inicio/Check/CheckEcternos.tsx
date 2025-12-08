import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  TextField,
  MenuItem,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { control_error } from "../../Elements/alertas/alertaError";
import { control_success } from "../../Elements/alertas/alertaSucces";
import { api } from "../../api/Axios";
import { Title } from "../../Elements/Titulo/Titulo";

export const ModalCheckExternos: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [codigoFactura, setCodigoFactura] = useState("");
  const [tipoConsumo, setTipoConsumo] = useState("");

  const textFieldStyle = {
    borderRadius: "20px",
    height: 60,
    fontSize: "1.2rem",
  };
  const labelStyle = { fontSize: "1.2rem" };

  const TIPO_CONSUMO_CHOICES = [
    { value: "ATENCION", label: "Atención" },
    { value: "PROFESORES", label: "Profesores" },
    { value: "SEGURIDAD", label: "Seguridad" },
    { value: "AFUERA", label: "Afuera" },
    { value: "KINDER", label: "Kinder" },
  ];

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setCodigoFactura("");
    setTipoConsumo("");
  };

  const handleSave = async () => {
    try {
      if (!codigoFactura || !tipoConsumo) {
        control_error("Por favor completa todos los campos");
        return;
      }

      const data = {
        consumo_externo: true,
        tipo_consumo: tipoConsumo,
        codigo_factura: codigoFactura,
      };

      const res = await api.post(
        "/almuerzo_check/consumos/crear/externos/",
        data
      );

      control_success("Consumo externo registrado correctamente");
      console.log(res.data);
      handleClose();
    } catch (error) {
      control_error("Error al registrar consumo externo");
      console.error(error);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        color="success"
        startIcon={<PersonIcon />}
        onClick={handleClickOpen}
        fullWidth
        sx={{
          borderRadius: "12px",

          "&:hover": {
            transform: "scale(1.05)",
            backgroundColor: "#0E2050",
            boxShadow: 6,
          },
        }}
      >
        Consumo Externo
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        sx={{ "& .MuiPaper-root": { borderRadius: "16px" } }}
      >
        <DialogContent>
          <Grid container spacing={2} sx={{ p: 3 }}>
            <Grid size={{ xs: 12 }}>
              <Title title="Registrar Consumo Externo" />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Número de Factura"
                variant="outlined"
                value={codigoFactura}
                onChange={(e) => setCodigoFactura(e.target.value)}
                InputProps={{ sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
              />
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                select
                label="Tipo de Consumo"
                variant="outlined"
                value={tipoConsumo}
                onChange={(e) => setTipoConsumo(e.target.value)}
                InputProps={{ sx: textFieldStyle }}
                InputLabelProps={{ sx: labelStyle }}
              >
                {TIPO_CONSUMO_CHOICES.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
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
