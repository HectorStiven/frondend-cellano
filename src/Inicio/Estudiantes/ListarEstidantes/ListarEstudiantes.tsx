import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  InputAdornment,
  Button,
  Chip,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  ButtonGroup,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import BadgeIcon from "@mui/icons-material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import { api } from "../../../api/Axios";
import { Title } from "../../../Elements/Titulo/Titulo";
import { download_pdf } from "../../../Elements/DescargarDocumentos/PDF_descargar";
import { download_xls } from "../../../Elements/DescargarDocumentos/XLS_descargar";
import { ModalCrearEstudiantes } from "../CrearEstudiantes/CrearEstudiantes";
import { ModalEditarEstudiantes } from "../EditarEstudiantes/EditarEstudiantes";
import { ListarAcudiente } from "../Acudientes/ListarAcudiente/ListarAcudiente";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Estudiante {
  id: number;
  identificacion: string;
  primer_nombre: string;
  primer_apellido: string;
  grado: string;
  grupo: string;
  jornada: string;
  estado: boolean;
}

const initialData = {
  identificacion: "",
  primer_nombre: "",
  grado: "",
};

export const ListarEstudiantes: React.FC = () => {
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
      setEstudiantes(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEstudiante = async (id: number) => {
    try {
      const result = await Swal.fire({
        title: "¿Está seguro?",
        text: "Esta acción eliminará al estudiante de forma permanente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#006b0a",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      });

      if (result.isConfirmed) {
        await api.delete(`/universidad/borrar_estudiante/${id}/`);
        setEstudiantes((prev) => prev.filter((e) => e.id !== id));
        Swal.fire(
          "¡Eliminado!",
          "El estudiante ha sido eliminado correctamente.",
          "success"
        );
      }
    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar el estudiante.", "error");
    }
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const handleSearch = () => fetchEstudiantes();
  const columns: GridColDef[] = [
    { field: "identificacion", headerName: "Identificación", flex: 1 },
    { field: "primer_nombre", headerName: "Primer Nombre", flex: 1 },
    { field: "primer_apellido", headerName: "Primer Apellido", flex: 1 },
    { field: "grado", headerName: "Grado", flex: 0.7 },
    { field: "grupo", headerName: "Grupo", flex: 0.5 },
    { field: "jornada", headerName: "Jornada", flex: 0.7 },
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
      flex: 1.2,
      renderCell: (params: any) => (
        <div style={{ display: "flex", gap: 5 }}>
          <Button variant="contained" style={{ backgroundColor: "blue" }}>
            <EditIcon />
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "red" }}
            onClick={() => deleteEstudiante(params.row.id)}
          >
                        <DeleteIcon />

          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "rgba(255, 162, 0, 1)" }}
            startIcon={<VisibilityIcon />}
            onClick={() =>
              console.log("Ver acudientes del estudiante:", params.row.id)
            }
          >
            Acudientes
          </Button>
        </div>
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
  const grados = [
    "Primero",
    "Segundo",
    "Tercero",
    "Cuarto",
    "Quinto",
    "Sexto",
    "Séptimo",
    "Octavo",
    "Noveno",
    "Décimo",
    "Once",
  ];

  return (
    <Box sx={{ padding: 4, minHeight: "100vh" }}>
      {/* Título fuera del Grid */}
      <Box sx={{ mb: 3 }}>
        <Title title="Lista de Estudiantes" />
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
        <Grid size={{ xs: 12, md: 3 }}>
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
              sx: textFieldStyle,
            }}
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
              sx: textFieldStyle,
            }}
            InputLabelProps={{ sx: labelStyle }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 3 }}>
          <FormControl fullWidth sx={{ margin: 0 }}>
            <InputLabel sx={labelStyle}>Grado</InputLabel>
            <Select
              label="Grado"
              value={formData.grado}
              onChange={(e) => handleInputChange("grado", e.target.value)}
              sx={{ ...textFieldStyle }}
            >
              {grados.map((g, index) => (
                <MenuItem key={index} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, md: 2 }}>
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

        {/* Botones de exportar */}
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
          />
        </Grid>
        <Grid
          size={{ xs: 6 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ModalCrearEstudiantes />
        </Grid>

        <Grid
          size={{ xs: 6 }}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ModalEditarEstudiantes />
        </Grid>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <ListarAcudiente />
      </Grid>
    </Box>
  );
};
