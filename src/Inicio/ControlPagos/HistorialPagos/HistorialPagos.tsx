"use client";

import React, { useState } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  Button,
  ButtonGroup,
  Tooltip,
  Chip,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Title } from "../../../Elements/Titulo/Titulo";
import { download_pdf } from "../../../Elements/DescargarDocumentos/PDF_descargar";
import { download_xls } from "../../../Elements/DescargarDocumentos/XLS_descargar";
import { api } from "../../../api/Axios";

interface Pago {
  id: number;
  mes: number;
  anio: number;
  valor_mensualidad: string;
  fecha_pago: string;
  identificacion: string;
  estudiante_nombre_completo: string;
  grado: string;
  grupo: string;
  jornada: string;
}

interface PagosResponse {
  success: boolean;
  data: Pago[];
}

export const HistorialPagos: React.FC = () => {
  const fechaActual = new Date();
  const anioActual = fechaActual.getFullYear(); // nombre diferente

  const [mes, setMes] = useState("");
  const [anio, setAnio] = useState<number>(anioActual);
  const [pagos, setPagos] = useState<Pago[]>([]);
  const [errorMes, setErrorMes] = useState(false);
  const [errorAnio, setErrorAnio] = useState(false);

  const handleBuscar = async () => {
    const isMesValid = !!mes;
    const isAnioValid = !!anio;
    setErrorMes(!isMesValid);
    setErrorAnio(!isAnioValid);

    if (!isMesValid || !isAnioValid) {
      return;
    }

    try {
      const res = await api.get<PagosResponse>(
        `/almuerzo_check/pagos/listar/?mes=${mes}&anio=${anio}`
      );

      if (res.data.success) {
        setPagos(res.data.data);
      } else {
        setPagos([]);
      }
    } catch (error: any) {
      console.error(
        error.response?.data?.detail || "Error al obtener los pagos"
      );
    }
  };

  const columns: GridColDef[] = [
    { field: "identificacion", headerName: "Identificación", flex: 1 },
    {
      field: "estudiante_nombre_completo",
      headerName: "Nombre Estudiante",
      flex: 1.5,
    },
    { field: "grado", headerName: "Grado", flex: 0.8 },
    { field: "grupo", headerName: "Grupo", flex: 0.7 },
    { field: "jornada", headerName: "Jornada", flex: 1 },
    {
      field: "valor_mensualidad",
      headerName: "Valor Mensualidad",
      flex: 1,
      renderCell: (params) => (
        <Chip
          icon={<AttachMoneyIcon />}
          label={`$${parseFloat(params.value as string).toLocaleString()}`}
          color="success"
          variant="outlined"
        />
      ),
    },
    {
      field: "fecha_pago",
      headerName: "Fecha de Pago",
      flex: 1,
      renderCell: (params) => (
        <Tooltip title="Fecha en que se realizó el pago">
          <Chip
            icon={<CalendarMonthIcon />}
            label={params.value}
            color="primary"
            variant="outlined"
          />
        </Tooltip>
      ),
    },
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
      justifyContent="center"
      alignItems="center"
    >
      <Grid size={{ xs: 12 }}>
        <Title title="Historial de Pagos por Mes y Año" />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          label="Mes"
          variant="outlined"
          type="number"
          value={mes}
          onChange={(e) => setMes(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon />
              </InputAdornment>
            ),
          }}
          sx={textFieldStyle}
          InputLabelProps={{ sx: labelStyle }}
          error={errorMes}
          helperText={errorMes ? "Mes es obligatorio" : ""}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          label="Año"
          variant="outlined"
          type="number"
          value={anio}
          onChange={(e) => setAnio(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarMonthIcon />
              </InputAdornment>
            ),
          }}
          sx={textFieldStyle}
          InputLabelProps={{ sx: labelStyle }}
          error={errorAnio}
          helperText={errorAnio ? "Año es obligatorio" : ""}
        />
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleBuscar}
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
          Buscar Pagos
        </Button>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <ButtonGroup
          style={{ margin: 1, display: "flex", justifyContent: "flex-end" }}
        >
          {download_xls({ nurseries: pagos, columns })}
          {download_pdf({
            nurseries: pagos,
            columns,
            title: `Pagos ${mes}/${anio}`,
          })}
        </ButtonGroup>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <DataGrid
          rows={pagos}
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
  );
};
