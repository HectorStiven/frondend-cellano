/* eslint-disable @typescript-eslint/naming-convention */
import React, { useState, useEffect } from "react";
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

// ======================
//      TIPOS
// ======================

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
  [key: string]: number | string | undefined;
}

interface ApiResponseMensual {
  success: boolean;
  detail: string;
  data: ReporteMensual[];
}

interface ValorGrado {
  id: number;
  nombre_grado: string;
  salon: string;
  valor: number;
}

interface ApiResponseGrados {
  success: boolean;
  detail: string;
  data: ValorGrado[];
}

interface ReporteCosto {
  fecha: string;
  "2K-2_costo": number;
  "3-11_costo": number;
  "180K_costo": number;
  "240K_costo": number;
  "Subsidiado_costo": number;
  "AFUERA_costo": number;
  "KINDER_costo": number;
  "PROFESORES_costo": number;
  "SEGURIDAD_costo": number;
  "ATENCION_costo": number;
  total_interno: number;
  total_externo: number;
  total_general: number;
}

// ====================================================
//               COMPONENTE PRINCIPAL
// ====================================================

export const ReporteControl: React.FC = () => {
  const [reportesMensual, setReportesMensual] = useState<ReporteMensual[]>([]);
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);
  const [anio, setAnio] = useState<number>(new Date().getFullYear());
  const [cargando, setCargando] = useState(false);

  const [valoresGrados, setValoresGrados] = useState<ValorGrado[]>([]);
  const [reporteCostos, setReporteCostos] = useState<ReporteCosto[]>([]);
console.log(valoresGrados)
  // ======================
  //       LISTADOS
  // ======================

  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
  ];

  const textFieldStyle = {
    borderRadius: 3,
    "& .MuiOutlinedInput-root": { borderRadius: 3 },
  };

  const labelStyle = { fontWeight: "bold" };

  // ======================
  //      COLUMNAS TABLA 1
  // ======================

  const columns: GridColDef[] = [
    {
      field: "fecha",
      headerName: "📅 Fecha",
      flex: 1.5,
      renderCell: (params: any) => (
        <Chip
          label={params.value}
          color="primary"
          sx={{
            fontWeight: "bold",
            fontSize: "0.9rem",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            "&:hover": { transform: "translateY(-2px)" },
          }}
        />
      ),
    },
    // Grupo interno
    ...["2K-2", "3-11", "180K", "240K", "Subsidiado"].map((campo) => ({
      field: campo,
      headerName: campo,
      flex: 1,
      align: "center" as const,
      headerAlign: "center" as const,
    })),
    {
      field: "total_grupo_1",
      headerName: "🔢 Total Interna",
      flex: 1.2,
      align: "center" as const,
      headerAlign: "center" as const,
      valueGetter: (value: any, row: ReporteMensual) =>
        (row["2K-2"] || 0) +
        (row["3-11"] || 0) +
        (row["180K"] || 0) +
        (row["240K"] || 0) +
        (row["Subsidiado"] || 0),
      renderCell: (params: any) => (
        <Chip
          label={params.value}
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            background: "linear-gradient(135deg, #11998e, #38ef7d)",
            color: "white",
          }}
        />
      ),
    },
    // Grupo externo
    ...["AFUERA", "KINDER", "PROFESORES", "SEGURIDAD", "ATENCION"].map((key) => ({
      field: key,
      headerName: key,
      flex: 1,
      align: "center" as const,
      headerAlign: "center" as const,
    })),
    {
      field: "total_grupo_2",
      headerName: "🔢 Total Externo",
      flex: 1.2,
      align: "center" as const,
      headerAlign: "center" as const,
      valueGetter: (value: any, row: ReporteMensual) =>
        (row["AFUERA"] || 0) +
        (row["KINDER"] || 0) +
        (row["PROFESORES"] || 0) +
        (row["SEGURIDAD"] || 0) +
        (row["ATENCION"] || 0),
      renderCell: (params: any) => (
        <Chip
          label={params.value}
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            background: "linear-gradient(135deg, #f093fb, #f5576c)",
            color: "white",
          }}
        />
      ),
    },
  ];

  // Valores estáticos para conceptos externos
  const VALORES_EXTERNOS = {
    AFUERA: 20000,
    PROFESORES: 14000,
    SEGURIDAD: 9000,
    KINDER: 15000,
    ATENCION: 0,
  };

  // ======================
  //  COLUMNAS TABLA 2 - COSTOS
  // ======================

  const formatCurrency = (value: number) =>
    value.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    });

  const columnsCostos: GridColDef[] = [
    {
      field: "fecha",
      headerName: "📅 Fecha",
      flex: 1.2,
      renderCell: (params: any) => (
        <Chip
          label={params.value}
          color="secondary"
          sx={{ fontWeight: "bold" }}
        />
      ),
    },
    // Grupo Interno
    {
      field: "2K-2_costo",
      headerName: "2K-2",
      flex: 1,
      align: "right" as const,
      headerAlign: "center" as const,
      valueFormatter: (value: number) => formatCurrency(value),
    },
    {
      field: "3-11_costo",
      headerName: "3-11",
      flex: 1,
      align: "right" as const,
      headerAlign: "center" as const,
      valueFormatter: (value: number) => formatCurrency(value),
    },
    {
      field: "180K_costo",
      headerName: "180K",
      flex: 1,
      align: "right" as const,
      headerAlign: "center" as const,
      valueFormatter: (value: number) => formatCurrency(value),
    },
    {
      field: "240K_costo",
      headerName: "240K",
      flex: 1,
      align: "right" as const,
      headerAlign: "center" as const,
      valueFormatter: (value: number) => formatCurrency(value),
    },
    {
      field: "Subsidiado_costo",
      headerName: "Subsidiado",
      flex: 1,
      align: "right" as const,
      headerAlign: "center" as const,
      valueFormatter: (value: number) => formatCurrency(value),
    },
    {
      field: "total_interno",
      headerName: "🔢 Total Interno",
      flex: 1.2,
      align: "right" as const,
      headerAlign: "center" as const,
      valueFormatter: (value: number) => formatCurrency(value),
      renderCell: (params: any) => (
        <Chip
          label={formatCurrency(params.value)}
          sx={{
            fontWeight: "bold",
            fontSize: "0.95rem",
            background: "linear-gradient(135deg, #11998e, #38ef7d)",
            color: "white",
          }}
        />
      ),
    },
    // Grupo Externo
    {
      field: "AFUERA_costo",
      headerName: "Afuera",
      flex: 1,
      align: "right" as const,
      headerAlign: "center" as const,
      valueFormatter: (value: number) => formatCurrency(value),
    },
    {
      field: "KINDER_costo",
      headerName: "Kinder",
      flex: 1,
      align: "right" as const,
      headerAlign: "center" as const,
      valueFormatter: (value: number) => formatCurrency(value),
    },
    {
      field: "PROFESORES_costo",
      headerName: "Profesores",
      flex: 1,
      align: "right" as const,
      headerAlign: "center" as const,
      valueFormatter: (value: number) => formatCurrency(value),
    },
    {
      field: "SEGURIDAD_costo",
      headerName: "Seguridad",
      flex: 1,
      align: "right" as const,
      headerAlign: "center" as const,
      valueFormatter: (value: number) => formatCurrency(value),
    },
    {
      field: "ATENCION_costo",
      headerName: "Atención",
      flex: 1,
      align: "right" as const,
      headerAlign: "center" as const,
      valueFormatter: (value: number) => formatCurrency(value),
    },
    {
      field: "total_externo",
      headerName: "🔢 Total Externo",
      flex: 1.2,
      align: "right" as const,
      headerAlign: "center" as const,
      valueFormatter: (value: number) => formatCurrency(value),
      renderCell: (params: any) => (
        <Chip
          label={formatCurrency(params.value)}
          sx={{
            fontWeight: "bold",
            fontSize: "0.95rem",
            background: "linear-gradient(135deg, #f093fb, #f5576c)",
            color: "white",
          }}
        />
      ),
    },
    {
      field: "total_general",
      headerName: "💰 TOTAL GENERAL",
      flex: 1.5,
      align: "right" as const,
      headerAlign: "center" as const,
      valueFormatter: (value: number) => formatCurrency(value),
      renderCell: (params: any) => (
        <Chip
          label={formatCurrency(params.value)}
          sx={{
            fontWeight: "bold",
            fontSize: "1rem",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            color: "white",
          }}
        />
      ),
    },
  ];

  // ======================
  //    CARGA DE VALORES
  // ======================

  const cargarValoresGrados = async () => {
    try {
      const res = await api.get<ApiResponseGrados>("/almuerzo_check/grados/listar/");
      setValoresGrados(res.data.data);
      return res.data.data;
    } catch (error) {
      console.error("Error cargando valores:", error);
      setValoresGrados([]);
      return [];
    }
  };

  // ======================
  //  CALCULAR COSTOS
  // ======================

  const calcularCostos = (reportes: ReporteMensual[], grados: ValorGrado[]) => {
    if (!reportes.length || !grados.length) {
      setReporteCostos([]);
      return;
    }

    const keysInternos = ["2K-2", "3-11", "180K", "240K", "Subsidiado"];
    const keysExternos = ["AFUERA", "KINDER", "PROFESORES", "SEGURIDAD", "ATENCION"];

    const resultados: ReporteCosto[] = reportes.map((row) => {
      const resultado: any = {
        fecha: row.fecha,
        total_interno: 0,
        total_externo: 0,
        total_general: 0,
      };

      // Calcular costos internos
      keysInternos.forEach((key) => {
        const cantidad = Number(row[key]) || 0;
        let valorUnitario = 0;

        // Mapeo especial para cada tipo de grado
        if (key === "2K-2") {
          const gradosK = grados.filter((g) => 
            g.nombre_grado.toLowerCase().startsWith("k")
          );
          valorUnitario = gradosK.length > 0 ? gradosK[0].valor : 0;
          
        } else if (key === "3-11") {
          const grados3a11 = grados.filter((g) => {
            const num = parseInt(g.nombre_grado);
            return !isNaN(num) && num >= 3 && num <= 11;
          });
          valorUnitario = grados3a11.length > 0 ? grados3a11[0].valor : 0;
          
        } else {
          const grado = grados.find((g) => {
            const nombreNormalizado = g.nombre_grado.trim().toLowerCase();
            const keyNormalizado = key.toLowerCase();
            return nombreNormalizado === keyNormalizado;
          });
          valorUnitario = grado?.valor || 0;
        }

        const costoTotal = cantidad * valorUnitario;
        resultado[`${key}_costo`] = costoTotal;
        resultado.total_interno += costoTotal;
      });

      // Calcular costos externos (valores estáticos)
      keysExternos.forEach((key) => {
        const cantidad = Number(row[key]) || 0;
        const valorUnitario = VALORES_EXTERNOS[key as keyof typeof VALORES_EXTERNOS];
        const costoTotal = cantidad * valorUnitario;
        
        resultado[`${key}_costo`] = costoTotal;
        resultado.total_externo += costoTotal;
      });

      // Total general
      resultado.total_general = resultado.total_interno + resultado.total_externo;

      return resultado as ReporteCosto;
    });

    setReporteCostos(resultados);
  };

  // ======================
  //  BOTÓN BUSCAR
  // ======================

  const handleBuscar = async () => {
    setCargando(true);

    try {
      // 1. Cargar valores de grados primero
      const grados = await cargarValoresGrados();

      // 2. Luego cargar el reporte mensual
      const res = await api.post<ApiResponseMensual>(
        "/almuerzo_check/consumos/reporte_mensual/",
        { mes, anio }
      );

      const reportes = res.data.data;
      setReportesMensual(reportes);

      // 3. Calcular costos con ambos datos disponibles
      calcularCostos(reportes, grados);
    } catch (error) {
      console.error(error);
      setReportesMensual([]);
      setValoresGrados([]);
      setReporteCostos([]);
    } finally {
      setCargando(false);
    }
  };

  // Cargar valores al montar el componente
  useEffect(() => {
    cargarValoresGrados();
  }, []);

  // ======================
  //       RENDER
  // ======================

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
    >
      {/* Título */}
      <Grid size={{ xs: 12 }}>
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

      {/* Año */}
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

      {/* Botones Exportar */}
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

      {/* DataGrid principal */}
      <Grid size={{ xs: 12 }}>
        <DataGrid
          rows={reportesMensual}
          columns={columns}
          autoHeight
          loading={cargando}
          getRowId={(row) => row.fecha}
          sx={{
            "& .MuiDataGrid-cell": {
              fontSize: "0.9rem",
            },
          }}
        />
      </Grid>

      {/* Segundo DataGrid – Costos detallados */}
      {reporteCostos.length > 0 && (
        <Grid size={{ xs: 12 }}>
          <h2 style={{ marginTop: "40px", fontWeight: "bold", color: "#333" }}>
            💵 Costos Detallados por Día y Grado
          </h2>

          <DataGrid
            rows={reporteCostos}
            columns={columnsCostos}
            autoHeight
            getRowId={(row) => row.fecha}
            sx={{
              "& .MuiDataGrid-cell": {
                fontSize: "0.85rem",
              },
              "& .MuiDataGrid-columnHeader": {
                backgroundColor: "#f5f5f5",
                fontWeight: "bold",
              },
            }}
          />
        </Grid>
      )}
    </Grid>
  );
};