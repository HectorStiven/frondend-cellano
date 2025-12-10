import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ButtonGroup,
  Chip,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SearchIcon from "@mui/icons-material/Search";
import { api } from "../../api/Axios";
import { download_xls } from "../../Elements/DescargarDocumentos/XLS_descargar";
import { download_pdf } from "../../Elements/DescargarDocumentos/PDF_descargar";
import { Title } from "../../Elements/Titulo/Titulo";

interface ReporteMensual {
  fecha: string;
  ATENCION: number;
  PROFESORES: number;
  SEGURIDAD: number;
  AFUERA: number;
  KINDER: number;
  "2K-2": number;
  "3-11": number;
  "180K": number;
  "240K": number;
  Subsidiado: number;
}

interface ApiResponseMensual {
  success: boolean;
  detail: string;
  data: ReporteMensual[];
}

export const ReporteControl: React.FC = () => {
  const [reportesMensual, setReportesMensual] = useState<ReporteMensual[]>([]);
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);
  const [anio, setAnio] = useState<number>(new Date().getFullYear());
  const [cargando, setCargando] = useState(false);

  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const textFieldStyle = {
    borderRadius: 3,
    "& .MuiOutlinedInput-root": { borderRadius: 3 },
  };
  const labelStyle = { fontWeight: "bold" };

  const columns: GridColDef[] = [
    {
      field: "fecha",
      headerName: "📅 Fecha",
      flex: 1.5,
      renderCell: (params) => (
        <Chip
          label={params.value}
          color="primary"
          sx={{
            fontWeight: "bold",
            fontSize: "0.9rem",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            "&:hover": {
              boxShadow: "0 6px 12px rgba(0,0,0,0.15)",
              transform: "translateY(-2px)",
            },
          }}
        />
      ),
      headerClassName: "header-fecha",
    },
    {
      field: "2K-2",
      headerName: "2K-2",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "3-11",
      headerName: "3-11",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "180K",
      headerName: "180K",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "240K",
      headerName: "240K",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "Subsidiado",
      headerName: "Subsidiado",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
        {
      field: "total_grupo_1",
      headerName: "🔢 Total Interna",
      flex: 1.2,
      align: "center",
      headerAlign: "center",
      valueGetter: (value, row) => {
        return (
          (row["2K-2"] || 0) +
          (row["3-11"] || 0) +
          (row["180K"] || 0) +
          (row["240K"] || 0) +
          (row["Subsidiado"] || 0)
        );
      },
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
            color: "white",
            minWidth: "60px",
            boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
            "&:hover": {
              boxShadow: "0 5px 10px rgba(0,0,0,0.3)",
            },
          }}
        />
      ),
      headerClassName: "header-total",
    },
    {
      field: "AFUERA",
      headerName: "Afuera",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "KINDER",
      headerName: "Kinder",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "PROFESORES",
      headerName: "Profesores",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "SEGURIDAD",
      headerName: "Seguridad",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "ATENCION",
      headerName: "Atención",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },

    {
      field: "total_grupo_2",
      headerName: "🔢 Total Externo",
      flex: 1.2,
      align: "center",
      headerAlign: "center",
      valueGetter: (value, row) => {
        return (
          (row["AFUERA"] || 0) +
          (row["KINDER"] || 0) +
          (row["PROFESORES"] || 0) +
          (row["SEGURIDAD"] || 0) +
          (row["ATENCION"] || 0)
        );
      },
      renderCell: (params) => (
        <Chip
          label={params.value}
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
            color: "white",
            minWidth: "60px",
            boxShadow: "0 3px 5px rgba(0,0,0,0.2)",
            "&:hover": {
              boxShadow: "0 5px 10px rgba(0,0,0,0.3)",
            },
          }}
        />
      ),
      headerClassName: "header-total",
    },
  ];

  const handleBuscar = async () => {
    setCargando(true);
    try {
      const res = await api.post<ApiResponseMensual>(
        "/almuerzo_check/consumos/reporte_mensual/",
        { mes, anio }
      );
      setReportesMensual(res.data.data);
    } catch (error) {
      console.error(error);
      setReportesMensual([]);
    } finally {
      setCargando(false);
    }
  };

  return (
    <Grid
      container
      sx={{
        p: 4,
        backgroundColor: "#fafafa",
        borderRadius: 4,
        boxShadow: 4,
        m: 3,
      }}
      spacing={3}
      justifyContent="center"
      alignItems="center"
    >
      {/* Título */}
      <Grid size={{ xs: 12 }} container justifyContent="center">
        <Title title="Reportes de Consumos Mensuales" />
      </Grid>
      {/* Selector Mes */}
      <Grid size={{ xs: 12, md: 4 }}>
        <FormControl fullWidth>
          <InputLabel sx={labelStyle}>Mes</InputLabel>
          <Select
            label="Mes"
            value={mes}
            onChange={(e) => setMes(Number(e.target.value))}
            sx={textFieldStyle}
          >
            {meses.map((m, index) => (
              <MenuItem key={index} value={index + 1}>
                {m}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      {/* Campo Año */}
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          type="number"
          label="Año"
          variant="outlined"
          value={anio}
          onChange={(e) => setAnio(Number(e.target.value))}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon />
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
          onClick={handleBuscar}
          sx={{
            width: "100%",
            height: 56,
            borderRadius: 3,
            "&:hover": {
              transform: "scale(1.05)",
              backgroundColor: "#0E2050",
              boxShadow: 6,
            },
            backgroundColor: "green",
            fontSize: "1rem",
            textTransform: "none",
            fontWeight: "bold",
          }}
          disabled={cargando}
        >
          {cargando ? "Cargando..." : "Buscar"}
        </Button>
      </Grid>
      {/* Botones de exportación + escanear */}

      <Grid size={{ xs: 12 }} container justifyContent="flex-end">
        <ButtonGroup>
          {download_xls({ nurseries: reportesMensual, columns })}
          {download_pdf({
            nurseries: reportesMensual,
            columns,
            title: "Reporte Mensual",
          })}
        </ButtonGroup>
      </Grid>
      {/* DataGrid */}
      <Grid size={{ xs: 12 }}>
        <DataGrid
          rows={reportesMensual}
          columns={columns}
          autoHeight
          loading={cargando}
          getRowId={(row) => row.fecha}
        />
      </Grid>
    </Grid>
  );
};
