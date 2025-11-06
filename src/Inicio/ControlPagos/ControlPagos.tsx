"use client";

import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  Button,
  Chip,
  ButtonGroup,
  Tooltip,
  Avatar,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import Swal from "sweetalert2";
import { api } from "../../api/Axios";
import { download_pdf } from "../../Elements/DescargarDocumentos/PDF_descargar";
import { download_xls } from "../../Elements/DescargarDocumentos/XLS_descargar";
import { CreditCard, HourglassEmpty } from "@mui/icons-material";
import { CheckCircle, Block } from "@mui/icons-material";
import { Title } from "../../Elements/Titulo/Titulo";
import { HistorialPagos } from "./HistorialPagos/HistorialPagos";

interface Estudiante {
  id: number;
  identificacion: string;
  primer_nombre: string;
  primer_apellido: string;
  grado: string;
  grupo: string;
  jornada: string;
  estado: boolean;
  pago_confirmado?: boolean;
}

const initialData = {
  identificacion: "",
  primer_nombre: "",
  grado: "",
};

export const ControlPagos: React.FC = () => {
  const [formData, setFormData] = useState(initialData);
  const [estudiantes, setEstudiantes] = useState<Estudiante[]>([]);

  const handleInputChange = (
    field: keyof typeof initialData,
    value: string
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const fetchEstudiantes = async () => {
    try {
      const res = await api.get<{ data: Estudiante[] }>(
        "/almuerzo_check/usuarios/listar_estudiantes/"
      );
      const dataConPago = res.data.data.map((e) => ({
        ...e,
        pago_confirmado: false,
      }));
      setEstudiantes(dataConPago);
    } catch (error: any) {
      console.error(
        error.response?.data?.detail || "Error al obtener los estudiantes"
      );
    }
  };



  
  const handleEnviarSolicitud = async (id: number) => {
    try {
      const fechaActual = new Date();
      const mes = fechaActual.getMonth() + 1;
      const anio = fechaActual.getFullYear();

      const res = await api.post("/almuerzo_check/pagos/crear/", {
        estudiante: id,
        mes,
        anio,
        valor_mensualidad: 25000,
      });

      console.log("Pago creado correctamente:", res.data);

      Swal.fire({
        title: "Pago confirmado",
        text: `El pago se ha registrado correctamente.`,
        icon: "success",
        timer: 1800,
        showConfirmButton: false,
      });
    } catch (err: any) {
      console.error(
        "Error al crear el pago:",
        err.response?.data || err.message
      );

      Swal.fire({
        title: "Error",
        text: "No se pudo registrar el pago, intente de nuevo.",
        icon: "error",
        timer: 2000,
        showConfirmButton: false,
      });
    }
  };



  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const handleSearch = () => fetchEstudiantes();

  const handleTogglePago = (id: number, nuevoEstado: boolean) => {
    const estudiante = estudiantes.find((e) => e.id === id);
    if (!estudiante) return;

    Swal.fire({
      title: `${nuevoEstado ? "¿Confirmar" : "¿Anular"} pago de ${
        estudiante.primer_nombre
      } ${estudiante.primer_apellido}?`,
      text: nuevoEstado
        ? "El pago quedará registrado como confirmado."
        : "El pago volverá a estado pendiente.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#1976d2",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        const actualizados = estudiantes.map((e) =>
          e.id === id ? { ...e, pago_confirmado: nuevoEstado } : e
        );
        setEstudiantes(actualizados);

        // 🔹 Aquí agregamos el console.log
        if (nuevoEstado) {
          handleEnviarSolicitud(estudiante.id);
          console.log(
            `✅ Pago confirmado para: ${estudiante.id} ${estudiante.primer_apellido}`
          );
        } else {
          console.log(
            `❌ Pago anulado para: ${estudiante.primer_nombre} ${estudiante.primer_apellido}`
          );
        }
      }
    });
  };

  // Ejemplo de columnas
  const columns: GridColDef[] = [
    {
      field: "fotoId",
      headerName: "Foto",
      width: 80,
      renderCell: (params) => (
        <Tooltip title={params.row.primer_nombre}>
          <Avatar
            src={params.value}
            alt={params.row.primer_nombre}
            sx={{ width: 45, height: 45 }}
          />
        </Tooltip>
      ),
    },
    { field: "identificacion", headerName: "Identificación", flex: 1 },
    { field: "primer_nombre", headerName: "Primer Nombre", flex: 1 },
    { field: "primer_apellido", headerName: "Primer Apellido", flex: 1 },
    {
      field: "estado",
      headerName: "Estado",
      flex: 0.7,
      renderCell: (params) => (
        <Chip
          icon={params.value ? <CheckCircle /> : <Block />}
          label={params.value ? "Activo" : "Inactivo"}
          color={params.value ? "success" : "error"}
          variant="outlined"
          sx={{ fontWeight: "bold" }}
        />
      ),
    },
    { field: "grado", headerName: "Grado", flex: 0.7 },
  {
  field: "acciones",
  headerName: "Acciones",
  flex: 1.2,
  renderCell: (params) => {
    const pagado = params.row.pago_confirmado;
    const activo = params.row.estado; // ✅ estudiante activo

    // Si está activo, no mostrar nada
    if (activo) return null;

    return (
      <Box display="flex" alignItems="center" gap={1}>
        {pagado ? (
          <Tooltip title="Pago confirmado">
            <CreditCard color="success" />
          </Tooltip>
        ) : (
          <Tooltip title="Pago pendiente">
            <HourglassEmpty color="error" />
          </Tooltip>
        )}

        <FormControlLabel
          control={
            <Switch
              checked={pagado}
              onChange={(e) =>
                handleTogglePago(params.row.id, e.target.checked)
              }
              sx={{
                "& .MuiSwitch-switchBase.Mui-checked": {
                  color: "white",
                },
                "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
                  backgroundColor: "green",
                },
                "& .MuiSwitch-switchBase:not(.Mui-checked) + .MuiSwitch-track": {
                  backgroundColor: "red",
                },
              }}
            />
          }
          label={
            <Chip
              label={pagado ? "Pagado" : "Pendiente"}
              color={pagado ? "success" : "error"}
              size="small"
            />
          }
        />
      </Box>
    );
  },
}

  ];

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
    <>
      <Grid
        sx={{
          p: 4,
          backgroundColor: "#fafafa",
          borderRadius: 4,
          boxShadow: 4,
          m: 3,
        }}
        container
        spacing={3}
        justifyContent="center"
        alignItems="center"
      >
        <Grid size={{ xs: 12 }}>
          <Title title="Control dePagos" />
        </Grid>

        {/* Campos de búsqueda */}
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Identificación"
            variant="outlined"
            value={formData.identificacion}
            onChange={(e) =>
              handleInputChange("identificacion", e.target.value)
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BadgeIcon />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
            InputLabelProps={{ sx: labelStyle }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Primer Nombre"
            variant="outlined"
            value={formData.primer_nombre}
            onChange={(e) => handleInputChange("primer_nombre", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            sx={textFieldStyle}
            InputLabelProps={{ sx: labelStyle }}
          />
        </Grid>
        {/* Botón Buscar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            onClick={handleSearch}
            sx={{
              width: "100%",
              height: 56,
              borderRadius: 3,
              backgroundColor: "green",
              fontSize: "1rem",
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Buscar
          </Button>
        </Grid>

        {/* Exportar */}
        <Grid size={{ xs: 12 }}>
          <ButtonGroup
            style={{ margin: 1, display: "flex", justifyContent: "flex-end" }}
          >
            {download_xls({ nurseries: estudiantes, columns })}
            {download_pdf({
              nurseries: estudiantes,
              columns,
              title: "Estudiantes",
            })}
          </ButtonGroup>
        </Grid>

        {/* Tabla */}
        <Grid size={{ xs: 12 }}>
          <DataGrid
            rows={estudiantes}
            columns={columns}
            autoHeight
            getRowId={(row) => row.id}
            sx={{
              backgroundColor: "#fff",
              borderRadius: 2,
              boxShadow: 2,
              p: 1,
            }}
          />
        </Grid>
      </Grid>

      <HistorialPagos />
    </>
  );
};
