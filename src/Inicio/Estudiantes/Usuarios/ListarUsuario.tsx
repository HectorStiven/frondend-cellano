import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  Button,
  Chip,
  ButtonGroup,
  Avatar,
  Tooltip,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import { api } from "../../../api/Axios";
import { download_pdf } from "../../../Elements/DescargarDocumentos/PDF_descargar";
import { download_xls } from "../../../Elements/DescargarDocumentos/XLS_descargar";

interface EstudianteInfo {
  id: number;
  identificacion: string;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  grado: string;
  grupo: string;
  jornada: string;
  estado: boolean;
  fotoId?: string;
}

interface Usuario {
  id: number;
  username: string;
  rol: string;
  correo_electronico: string;
  estudiante_info?: EstudianteInfo;
}

const initialData = {
  identificacion: "",
  primer_nombre: "",
  grado: "",
};

export const ListarUsuario: React.FC = () => {
  const [formData, setFormData] = useState(initialData);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);

  const handleInputChange = (
    field: keyof typeof initialData,
    value: string
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const fetchUsuarios = async () => {
    try {
      const res = await api.get<{ data: Usuario[] }>(
        "/almuerzo_check/usuarios/"
      );
      setUsuarios(res.data.data);
    } catch (error: any) {
      console.error(error?.response?.data?.detail || error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Columnas usando renderCell para todos los campos
  const columns: GridColDef[] = [
    {
      field: "foto",
      headerName: "Foto",
      flex: 0.7,
      renderCell: (params: GridRenderCellParams<Usuario>) => {
        const fotoURL = params.row.estudiante_info?.fotoId;

        return (
          <Tooltip title={params.row.estudiante_info?.primer_nombre || ""}>
            <Avatar
              src={fotoURL || undefined} // undefined para que muestre placeholder si no hay foto
              alt={params.row.estudiante_info?.primer_nombre || "Sin foto"}
              sx={{ width: 50, height: 50 }}
            />
          </Tooltip>
        );
      },
    },

    { field: "username", headerName: "Usuario", flex: 1 },
    { field: "rol", headerName: "Rol", flex: 0.8 },
    { field: "correo_electronico", headerName: "Correo", flex: 1 },
    {
      field: "identificacion",
      headerName: "Identificación",
      flex: 1,
      renderCell: (params: GridRenderCellParams<Usuario>) =>
        params.row.estudiante_info?.identificacion || "-",
    },
    {
      field: "primer_nombre",
      headerName: "Primer Nombre",
      flex: 1,
      renderCell: (params: GridRenderCellParams<Usuario>) =>
        params.row.estudiante_info?.primer_nombre || "-",
    },
    {
      field: "primer_apellido",
      headerName: "Primer Apellido",
      flex: 1,
      renderCell: (params: GridRenderCellParams<Usuario>) =>
        params.row.estudiante_info?.primer_apellido || "-",
    },
    {
      field: "grado",
      headerName: "Grado",
      flex: 0.7,
      renderCell: (params: GridRenderCellParams<Usuario>) =>
        params.row.estudiante_info?.grado || "-",
    },
    {
      field: "estado",
      headerName: "Estado",
      flex: 0.6,
      renderCell: (params: GridRenderCellParams<Usuario>) =>
        params.row.estudiante_info ? (
          <Chip
            label={params.row.estudiante_info.estado ? "Activo" : "Inactivo"}
            color={params.row.estudiante_info.estado ? "success" : "error"}
          />
        ) : (
          "-"
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
      <Grid size={{ xs: 12, md: 4 }}>
        <TextField
          fullWidth
          label="Identificación"
          variant="outlined"
          value={formData.identificacion}
          onChange={(e) => handleInputChange("identificacion", e.target.value)}
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

      <Grid size={{ xs: 12, md: 4 }}>
        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={fetchUsuarios}
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

      <Grid size={12}>
        <ButtonGroup
          style={{ margin: 1, display: "flex", justifyContent: "flex-end" }}
        >
          {download_xls({ nurseries: usuarios, columns })}
          {download_pdf({ nurseries: usuarios, columns, title: "Estudiantes" })}
        </ButtonGroup>
      </Grid>

      <Grid size={12}>
        <DataGrid
          rows={usuarios}
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
