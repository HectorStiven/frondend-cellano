import React, { useState, useEffect, useCallback } from "react";
import { Grid, TextField, InputAdornment, Button, Chip } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
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

interface ListarAcudienteProps {
  id?: number; // el id llega como prop
}

const initialData = {
  nombre: "",
};

export const ListarAcudiente: React.FC<ListarAcudienteProps> = ({ id }) => {
  const [formData, setFormData] = useState(initialData);
  const [acudientes, setAcudientes] = useState<Acudiente[]>([]);

  const handleInputChange = (
    field: keyof typeof initialData,
    value: string
  ) => {
    setFormData({ ...formData, [field]: value });
  };

  const fetchAcudientes = useCallback(async () => {
    if (!id) return;

    try {
      const res = await api.get<{ data: Acudiente[] }>(
        `/almuerzo_check/usuarios/listar_acudientes/${id}/`
      );
      setAcudientes(res.data.data);
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "No se pudieron cargar los acudientes.", "error");
    }
  }, [id]);

  const handleDelete = (id: number) => {
    console.log("ID a eliminar:", id);
  };

  const handleSearch = () => {
    fetchAcudientes();
  };

  const handleClear = () => {
    setFormData(initialData);
    setAcudientes([]);
  };
  useEffect(() => {
    if (id) fetchAcudientes();
  }, [id, fetchAcudientes]);

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
      flex: 0.6,
      align: "center",
      sortable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="error"
          size="small"
          onClick={() => handleDelete(params.row.id)}
        >
          Eliminar
        </Button>
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

  // Si no hay id, no muestra el contenido
  if (!id) {
    return (
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "60vh" }}
      >
        <Title title="No se ha seleccionado un estudiante" />
      </Grid>
    );
  }

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
      <Grid size={{ xs: 12 }}>
        {/* Título */}
        <Title title="Listar Acudientes" />
      </Grid>
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

        <Grid size={{ xs: 12, md: 2 }}>
          <Button
            variant="contained"
            startIcon={<SearchIcon />}
            sx={{
              width: "100%",
              height: 56,
              borderRadius: 3,
              backgroundColor: "green",
              fontSize: "1rem",
              textTransform: "none",
              fontWeight: "bold",
            }}
            onClick={handleSearch}
          >
            Buscar
          </Button>
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
          <Button
            variant="outlined"
            startIcon={<ClearIcon />}
            sx={{
              width: "100%",
              height: 56,
              borderRadius: 3,
              fontSize: "1rem",
              color: "red",
              borderColor: "red",
            }}
            onClick={handleClear}
          >
            Limpiar
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
    </Grid>
  );
};
