import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  Button,
  Chip,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Swal from "sweetalert2";
import { api } from "../../../../api/Axios";
import { Title } from "../../../../Elements/Titulo/Titulo";

interface Acudiente {
  id: number;
  nombre: string;
  telefono: string;
  correo: string;
  parentesco: string;
  direccion: string;
  fecha_nacimiento: string;
  ocupacion: string;
  estado: boolean;
  observacion: string;
  creado_en: string;
  estudiante: number;
}

const initialData = {
  nombre: "",
};

export const ListarAcudiente: React.FC = () => {
  const [formData, setFormData] = useState(initialData);
  const [acudientes, setAcudientes] = useState<Acudiente[]>([]);

  const handleInputChange = (field: keyof typeof initialData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const fetchAcudientes = async () => {
    try {
      // URL quemada
      const res = await api.get<{ data: Acudiente[] }>("/almuerzo_check/usuarios/listar_acudientes/1/");
      setAcudientes(res.data.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudieron cargar los acudientes.", "error");
    }
  };

  useEffect(() => {
    fetchAcudientes();
  }, []);

  const handleSearch = () => fetchAcudientes();

  const handleVerDetalle = (acudiente: Acudiente) => {
    console.log("Ver detalle del acudiente:", acudiente);
  };

  const columns: GridColDef[] = [
    { field: "nombre", headerName: "Nombre", flex: 1 },
    { field: "telefono", headerName: "Teléfono", flex: 1 },
    { field: "correo", headerName: "Correo", flex: 1 },
    { field: "parentesco", headerName: "Parentesco", flex: 0.8 },
    {
      field: "estado",
      headerName: "Estado",
      flex: 0.6,
      renderCell: (params: any) => (
        <Chip
          label={params.value ? "Activo" : "Inactivo"}
          color={params.value ? "success" : "error"}
        />
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 0.5,
      renderCell: (params: any) => (
        <VisibilityIcon
          style={{ cursor: "pointer", color: "#1976d2" }}
          onClick={() => handleVerDetalle(params.row)}
        />
      ),
    },
  ];

  const textFieldStyle = {
    borderRadius: "20px",
    fontSize: "1.2rem",
    margin: 1,
    width: "95%",
    marginTop: 2,
  };
  const labelStyle = {
    fontSize: "1.2rem",
    width: "100%",
    marginTop: 2,
    letterSpacing: 0.5,
  };

  return (
    <Box sx={{ padding: 4, minHeight: "100vh" }}>
      <Box sx={{ mb: 3 }}>
        <Title title="Lista de Acudientes" />
      </Box>

      <Grid
        container
        sx={{
          p: 2,
          background: "#FAFAFA",
          borderRadius: "15px",
          boxShadow: "0px 3px 6px #042F4A26",
        }}
        spacing={2}
      >
        {/* Filtros */}
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField
            fullWidth
            label="Nombre"
            variant="outlined"
            value={formData.nombre}
            onChange={(e) => handleInputChange("nombre", e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              ),
              sx: textFieldStyle,
            }}
            InputLabelProps={{ sx: labelStyle }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{
              width: "90%",
              height: 60,
              borderRadius: 20,
              backgroundColor: "green",
              fontSize: "1.1rem",
              margin: 1,
            }}
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </Grid>

        {/* Tabla */}
        <Grid size={{ xs: 12 }}>
          <DataGrid
            rows={acudientes}
            columns={columns}
            autoHeight
            getRowId={(row) => row.id}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
