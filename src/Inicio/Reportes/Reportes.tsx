import React, { useState } from "react";
import {
  Grid,
  Button,
  TextField,
  FormControlLabel,
  InputAdornment,
  Avatar,
  Tooltip,
  FormGroup,
  Switch,
  SwitchProps,
  ButtonGroup,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import SearchIcon from "@mui/icons-material/Search";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { styled } from "@mui/material/styles";
import { api } from "../../api/Axios";
import { Title } from "../../Elements/Titulo/Titulo";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import { download_pdf } from "../../Elements/DescargarDocumentos/PDF_descargar";
import { download_xls } from "../../Elements/DescargarDocumentos/XLS_descargar";

// 🔹 Tipos de respuesta
interface Consumo {
  id: number;
  estudiante?: number;
  menu?: number;
  plato_principal?: string;
  fecha?: string;
  hora?: string;
  identificacion?: string;
  fotoId?: string;
  primer_nombre?: string;
  creditos?: string;
  grado?: string;
}

interface ApiResponse {
  success: boolean;
  detail: string;
  count: number;
  data: Consumo[];
}

// 🔹 Switch personalizado: comida/no comer
const FoodSwitch = styled((props: SwitchProps) => <Switch {...props} />)(
  ({ theme }) => ({
    width: 70,
    height: 38,
    padding: 8,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(3px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(32px)",
        "& .MuiSwitch-thumb:before": {
          content: "''",
          position: "absolute",
          width: "100%",
          height: "100%",
          left: 0,
          top: 0,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 24 24'><path fill='%23fff' d='M12 2C6.48 2 2 6.48 2 12h2a8 8 0 018-8V2zm5 12a5 5 0 01-10 0h10z'/></svg>")`,
        },
        "& + .MuiSwitch-track": {
          backgroundColor: "#65C466",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#001e3c",
      width: 36,
      height: 36,
      "&:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' height='20' width='20' viewBox='0 0 24 24'><path fill='%23fff' d='M18.3 5.71l-1.41-1.41L12 9.59 7.11 4.7 5.7 6.11 10.59 12l-4.89 5.89 1.41 1.41L12 14.41l4.89 4.89 1.41-1.41L13.41 12l4.89-5.89z'/></svg>")`,
      },
    },
    "& .MuiSwitch-track": {
      borderRadius: 20,
      backgroundColor: "#aab4be",
    },
  })
);

export const Reportes: React.FC = () => {
  const [reportes, setReportes] = useState<Consumo[]>([]);
  const [fecha, setFecha] = useState("2025-11-03");
  const [switchValue, setSwitchValue] = useState(true);
  const [sinRegistro, setSinRegistro] = useState(true);
  const [cargando, setCargando] = useState(false);

  const handleBuscar = async () => {
    setCargando(true);
    setSinRegistro(switchValue);
    try {
      const res = await api.get<ApiResponse>(
        "/almuerzo_check/consumos/listar_todos/",
        {
          params: { fecha, sin_registro: switchValue },
        }
      );
      setReportes(res.data.data);
    } catch (error) {
      console.error(error);
      setReportes([]);
    } finally {
      setCargando(false);
    }
  };

  // 🔹 Columnas dinámicas según el último valor de sinRegistro
  const columns: GridColDef[] = sinRegistro
    ? [
        {
          field: "fotoId",
          headerName: "Foto",
          flex: 0.5,
          renderCell: (params) => (
            <Tooltip title={params.row.primer_nombre}>
              <Avatar
                src={params.value}
                alt={params.row.primer_nombre}
                sx={{ width: 50, height: 50 }}
              />
            </Tooltip>
          ),
        },
        { field: "plato_principal", headerName: "Plato Principal", flex: 2 },
        { field: "fecha", headerName: "Fecha", flex: 1 },
        { field: "hora", headerName: "Hora", flex: 1 },
        { field: "identificacion", headerName: "Identificación", flex: 1 },
        { field: "primer_nombre", headerName: "Nombre", flex: 1 },
        { field: "grado", headerName: "Grado", flex: 1 },
        {
          field: "creditos",
          headerName: "Créditos",
          flex: 1,
          renderCell: (params) => (
            <>
              <CreditCardIcon
                fontSize="small"
                sx={{ mr: 0.5, color: "#1976d2" }}
              />
              {params.value}
            </>
          ),
        },
      ]
    : [
        {
          field: "fotoId",
          headerName: "Foto",
          flex: 0.5,
          renderCell: (params) => (
            <Tooltip title={params.row.primer_nombre}>
              <Avatar
                src={params.value}
                alt={params.row.primer_nombre}
                sx={{ width: 50, height: 50 }}
              />
            </Tooltip>
          ),
        },
        { field: "identificacion", headerName: "Identificación", flex: 1 },
        { field: "primer_nombre", headerName: "Nombre", flex: 1 },
        { field: "grado", headerName: "Grado", flex: 1 },
        {
          field: "creditos",
          headerName: "Créditos",
          flex: 1,
          renderCell: (params) => (
            <>
              <CreditCardIcon
                fontSize="small"
                sx={{ mr: 0.5, color: "#1976d2" }}
              />
              {params.value}
            </>
          ),
        },
      ];

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
    >
      {/* Título */}
      <Grid size={{ xs: 12 }} container justifyContent="center">
        <Title title="Reportes de Consumos" />
      </Grid>

      {/* Fecha */}
      <Grid size={{ xs: 12, md: 6, lg: 4 }}>
        <TextField
          fullWidth
          type="date"
          label="Fecha"
          value={fecha}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFecha(e.target.value)
          }
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarTodayIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{
            borderRadius: "10px",
            "& .MuiOutlinedInput-root": { borderRadius: "10px" },
          }}
        />
      </Grid>

      {/* Switch */}
      <Grid size={{ xs: 12, md: 6, lg: 4 }} container justifyContent="center">
        <FormGroup>
          <FormControlLabel
            control={
              <FoodSwitch
                checked={switchValue}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSwitchValue(e.target.checked)
                }
              />
            }
            label={switchValue ? "Mostrar consumos" : "Mostrar sin registro"}
            labelPlacement="start"
          />
        </FormGroup>
      </Grid>

      {/* Botón Buscar */}
      <Grid size={{ xs: 12, md: 6, lg: 4 }} container justifyContent="center">
        <Button
          variant="contained"
          color="success"
          startIcon={<SearchIcon />}
          onClick={handleBuscar}
          sx={{
            height: "45px",
            borderRadius: "10px",
            textTransform: "none",
            fontWeight: "bold",
          }}
          disabled={cargando}
        >
          {cargando ? "Cargando..." : "Buscar"}
        </Button>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <ButtonGroup
          style={{ margin: 1, display: "flex", justifyContent: "flex-end" }}
        >
          {download_xls({ nurseries: reportes, columns })}
          {download_pdf({
            nurseries: reportes,
            columns,
            title: "Estudiantes",
          })}
        </ButtonGroup>
      </Grid>

      {/* Tabla */}
      <Grid size={{ xs: 12 }}>
        <DataGrid
          rows={reportes}
          columns={columns}
          autoHeight
          getRowId={(row) => row.id}
  
        />
      </Grid>
    </Grid>
  );
};
