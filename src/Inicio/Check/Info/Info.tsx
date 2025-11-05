import React, { useState } from "react";
import {
  Grid,
  Card,
  Box,
  Avatar,
  Typography,
  IconButton,
  MenuItem,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { api } from "../../../api/Axios";
import { control_error } from "../../../Elements/alertas/alertaError";
import { control_success } from "../../../Elements/alertas/alertaSucces";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";

interface Estudiante {
  id: number;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  identificacion: string;
  correo?: string;
  telefono?: string;
  direccion?: string;
  fecha_nacimiento?: string;
  genero?: string;
  creditos?: string;
  grado?: string;
  grupo?: string;
  jornada?: string;
  fotoId?: string;
  estado: boolean;
}

interface InfoProps {
  estudiante: Estudiante;
  onClose: () => void;
}

export const Info: React.FC<InfoProps> = ({ estudiante, onClose }) => {
  const [menuSeleccionado, setMenuSeleccionado] = useState("");
  if (!estudiante || estudiante.id === 0) return null;

  const creditos = Number(estudiante.creditos) || 0;
  const estaActivo = creditos > 0;

  // ✅ Estado del menú seleccionado

  const obtenerFechaHoraActual = () => {
    const ahora = new Date();
    const fecha = ahora.toISOString().split("T")[0]; // YYYY-MM-DD
    const hora = ahora.toTimeString().split(" ")[0]; // HH:MM:SS
    return { fecha, hora };
  };

  // ✅ Función del botón "Confirmar"
  const handleConfirmar = async () => {
    if (!menuSeleccionado) {
      control_error("Por favor selecciona un menú antes de confirmar.");
      return;
    }

    try {
      const { fecha, hora } = obtenerFechaHoraActual();
      const body = {
        estudiante: estudiante.id,
        menu: menuSeleccionado, // 👈 se envía el valor seleccionado
        fecha,
        hora,
      };

      const res = await api.post("/almuerzo_check/consumos/crear/", body);
      control_success("Consumo creado correctamente");
      console.log("✅ Respuesta del servidor:", res.data);
    } catch (error) {
      console.error("❌ Error al crear consumo:", error);
      control_error("Error al crear consumo");
    }
  };

  // Lista de menús para pruebas
  const menus = [
    { id: 1, nombre: "Arroz con pollo" },
    { id: 2, nombre: "Lentejas con carne" },
    { id: 3, nombre: "Pasta boloñesa" },
    { id: 4, nombre: "Sopa de verduras" },
    { id: 5, nombre: "Pollo al horno" },
  ];

  console.log("Renderizando Info para el estudiante:", estudiante.creditos);

  return (
    <Grid size={{ xs: 12 }} sx={{ mt: 3 }}>
      <Card
        sx={{
          p: 2,
          pr: 8, // 🔹 le damos más espacio al lado derecho (antes p:2 en todos los lados)
          borderRadius: 3,
          boxShadow: 6,
          backgroundColor: "#fafafa",
          position: "relative",
        }}
      >
        {/* Botón cerrar */}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", top: 10, right: 10, color: "#f44336" }}
        >
          <CloseIcon />
        </IconButton>

        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
          {/* Foto */}
          <Avatar
            src={estudiante.fotoId}
            alt="foto estudiante"
            sx={{
              width: 100,
              height: 100,
              border: "3px solid #1976d2",
              flexShrink: 0,
            }}
          />

          {/* Info estudiante */}
          <Box sx={{ flex: 1, mx: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {`${estudiante.primer_nombre} ${
                estudiante.segundo_nombre || ""
              } ${estudiante.primer_apellido} ${
                estudiante.segundo_apellido || ""
              }`}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              📘 ID: {estudiante.identificacion}
            </Typography>
            {estudiante.correo && (
              <Typography variant="body2">✉️ {estudiante.correo}</Typography>
            )}
            {estudiante.grado && estudiante.grupo && estudiante.jornada && (
              <Typography variant="body2">
                🎓 {estudiante.grado}° {estudiante.grupo} - {estudiante.jornada}
              </Typography>
            )}
          </Box>

          {/* Selector de menú */}
          {estaActivo && (
            <Box sx={{ width: 300, mr: 2 }}>
              <TextField
                select
                fullWidth
                label="Seleccionar Menú"
                value={menuSeleccionado}
                InputProps={{
                  startAdornment: <RestaurantMenuIcon />,
                  sx: { borderRadius: "20px", height: 60, fontSize: "1.2rem" },
                }}
                onChange={(e) => setMenuSeleccionado(e.target.value)}
              >
                {menus.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.nombre}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          )}

          {/* Botones de estado */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {/* Estado */}
            <Box
              sx={{
                px: 3,
                py: 1.5,
                borderRadius: 2,
                backgroundColor: estaActivo ? "#4caf50" : "#f44336",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "1.2rem",
                textAlign: "center",
                cursor: "default",
                boxShadow: estaActivo
                  ? "0 4px 10px rgba(76, 175, 80, 0.7)"
                  : "0 4px 10px rgba(244, 67, 54, 0.7)",
              }}
            >
              {estaActivo ? "Activo" : "Inactivo"}
            </Box>

            {/* Confirmar (solo si activo) */}
            {estaActivo && (
              <>
                <Box
                  onClick={handleConfirmar}
                  sx={{
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    backgroundColor: "#ff9800",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    textAlign: "center",
                    cursor: "pointer",
                    boxShadow:
                      "0 4px 10px rgba(255, 152, 0, 0.7), 0 0 10px rgba(255, 152, 0, 0.5)",
                    "&:hover": {
                      transform: "translateY(-3px) scale(1.05)",
                    },
                  }}
                >
                  Confirmar
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Card>
    </Grid>
  );
};
