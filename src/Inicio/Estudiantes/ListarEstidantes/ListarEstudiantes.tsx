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
import GroupIcon from "@mui/icons-material/Group"; // 👈 ícono para "Alumnos"
import { api } from "../../../api/Axios";
import { Title } from "../../../Elements/Titulo/Titulo";
import { download_pdf } from "../../../Elements/DescargarDocumentos/PDF_descargar";
import { download_xls } from "../../../Elements/DescargarDocumentos/XLS_descargar";
import { ModalCrearEstudiantes } from "../CrearEstudiantes/CrearEstudiantes";
import { ModalEditarEstudiantes } from "../EditarEstudiantes/EditarEstudiantes";
import { ListarAcudiente } from "../Acudientes/ListarAcudiente/ListarAcudiente";
import { InformacionEstudiante } from "../InformacionEstudiante/InformacionEstudiante";

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
  const [selectedStudentId, setSelectedStudentId] = useState<number | null>(
    null
  ); // 👈 id del estudiante seleccionado

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
    } catch (error: any) {
      console.error(error.response.data.detail);
    }
  };

  const deleteEstudiante = async (id: number) => {
    console.log("Eliminar estudiante con id:", id);
  };

  useEffect(() => {
    fetchEstudiantes();
  }, []);

  const handleSearch = () => fetchEstudiantes();

  // 🔹 Nueva función: seleccionar estudiante para mostrar acudientes
  const handleShowAcudientes = (id: number) => {
    setSelectedStudentId(id);
  };

  const columns: GridColDef[] = [
    { field: "identificacion", headerName: "Identificación", flex: 1 },
    { field: "primer_nombre", headerName: "Primer Nombre", flex: 1 },
    { field: "primer_apellido", headerName: "Primer Apellido", flex: 1 },
    { field: "grado", headerName: "Grado", flex: 0.7 },

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
      flex: 1.8,
      renderCell: (params: any) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" sx={{ backgroundColor: "blue" }}>
            <EditIcon />
          </Button>

          <Button
            variant="contained"
            sx={{ backgroundColor: "red" }}
            onClick={() => deleteEstudiante(params.row.id)}
          >
            <DeleteIcon />
          </Button>

          {/* Botón para ver acudientes */}
          <Button
            variant="contained"
            sx={{ backgroundColor: "orange" }}
            onClick={() => handleShowAcudientes(params.row.id)}
          >
            <GroupIcon />
          </Button>

          {/* Mantienes tu botón existente */}
          <InformacionEstudiante id={params.row.id} />
        </Box>
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
        {/* Título */}
        <Grid size={{ xs: 12 }}>
          <Title title="Lista de Estudiantes" />
        </Grid>

        {/* Campo: Identificación */}
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

        {/* Campo: Primer Nombre */}
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

        {/* Campo: Grado */}
        <Grid size={{ xs: 12, md: 4 }}>
          <FormControl fullWidth>
            <InputLabel sx={labelStyle}>Grado</InputLabel>
            <Select
              label="Grado"
              value={formData.grado}
              onChange={(e) => handleInputChange("grado", e.target.value)}
              sx={textFieldStyle}
            >
              {grados.map((g, index) => (
                <MenuItem key={index} value={g}>
                  {g}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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

        {/* Modales */}
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

      {/* 👇 Aquí se muestra ListarAcudiente solo si se seleccionó un estudiante */}
      {selectedStudentId && <ListarAcudiente id={selectedStudentId} />}
    </>
  );
};
