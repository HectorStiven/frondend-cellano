import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  Typography,
  ButtonGroup,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Title } from "../../Elements/Titulo/Titulo";
import { api } from "../../api/Axios";
import { download_pdf } from "../../Elements/DescargarDocumentos/PDF_descargar";
import { download_xls } from "../../Elements/DescargarDocumentos/XLS_descargar";
import { ModalDetalleSugerencias } from "./ModalDetalleSugerencias/ModalDetalleSugerencias";

import VisibilityIcon from "@mui/icons-material/Visibility";

// ======================
// 📘 Interfaces
// ======================

interface Estudiante {
  fotoId: string;
  identificacion: string;
  grado: string;
}

interface Sugerencia {
  id: number;
  estudiante: Estudiante;
  comentario: string;
  calificacion: number;
  fecha: string;
  fotoId: string;
  menu: number;
}

// ======================
// ⚙️ Componente principal
// ======================

export const ListaSugerencias: React.FC = () => {
  const [sugerencias, setSugerencias] = useState<Sugerencia[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [openModal, setOpenModal] = useState(false);
  const [selectedSugerencia, setSelectedSugerencia] = useState<Sugerencia | null>(null);

  // 🔹 Obtener todas las sugerencias
  const fetchSugerencias = async () => {
    setLoading(true);
    try {
      const res = await api.get<{ data: Sugerencia[] }>("/almuerzo_check/sugerencias/listar/");
      setSugerencias(res.data.data);
    } catch (error: any) {
      console.error(error?.response?.data?.detail || "Error al obtener sugerencias");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Eliminar sugerencia
  const deleteSugerencia = async (id: number) => {
    try {
      await api.delete(`/almuerzo_check/sugerencias/eliminar/${id}/`);
      setSugerencias((prev) => prev.filter((s) => s.id !== id));
      console.log(`Sugerencia con ID ${id} eliminada`);
    } catch (error: any) {
      console.error(error?.response?.data?.detail || "Error al eliminar sugerencia");
    }
  };

  // 🔹 Abrir modal con sugerencia seleccionada
  const handleOpenModal = (sugerencia: Sugerencia) => {
    setSelectedSugerencia(sugerencia);
    setOpenModal(true);
  };

  useEffect(() => {
    fetchSugerencias();
  }, []);

  // ======================
  // 🧱 Columnas del DataGrid
  // ======================

  const columns: GridColDef[] = [
    {
      field: "fotoId",
      headerName: "Foto",
      width: 80,
      renderCell: (params: GridRenderCellParams) => (
        <Grid container justifyContent="center" alignItems="center">
          <Avatar src={params.row.estudiante.fotoId} alt="Foto estudiante" sx={{ width: 45, height: 45 }} />
        </Grid>
      ),
    },
    {
      field: "comentario",
      headerName: "Comentario",
      flex: 2,
      minWidth: 300,
      renderCell: (params: GridRenderCellParams) => (
        <Typography
          sx={{
            whiteSpace: "normal",
            wordBreak: "break-word",
            lineHeight: 1.4,
            fontSize: "0.9rem",
            maxHeight: "none",
          }}
        >
          {params.row.comentario}
        </Typography>
      ),
    },
    {
      field: "calificacion",
      headerName: "⭐ Calificación",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Typography>{"⭐".repeat(params.row.calificacion)}</Typography>
      ),
    },
    {
      field: "fecha",
      headerName: "Fecha",
      width: 200,
      renderCell: (params: GridRenderCellParams) => {
        const fecha = params.row.fecha;
        if (!fecha) return "—";
        const d = new Date(fecha);
        return (
          <Typography>
            {isNaN(d.getTime())
              ? "Fecha inválida"
              : d.toLocaleString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
          </Typography>
        );
      },
    },
    {
      field: "acciones",
      headerName: "Acciones",
      width: 150,
      renderCell: (params: GridRenderCellParams) => (
        <Box sx={{ display: "flex", gap: 1 }}>
          <Button
            variant="contained"
            sx={{ backgroundColor: "red" }}
            onClick={() => deleteSugerencia(params.row.id)}
          >
            <DeleteIcon />
          </Button>
          <Button variant="contained" onClick={() => handleOpenModal(params.row)}>
            <VisibilityIcon />
          </Button>
        </Box>
      ),
    },
  ];

  // ======================
  // 🎨 Render del componente
  // ======================

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      alignItems="center"
      sx={{
        p: 4,
        backgroundColor: "#fafafa",
        borderRadius: 4,
        boxShadow: 4,
        m: 3,
      }}
    >
      {/* 🔹 Título */}
      <Grid size={12}>
        <Title title="Lista de Sugerencias" />
      </Grid>

      {/* 🔹 Botones de acciones */}
      <Grid size={9}>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          sx={{ backgroundColor: "blue" }}
          onClick={fetchSugerencias}
        >
          Actualizar
        </Button>
      </Grid>
      <Grid size={1}>
        <ButtonGroup>
          {download_xls({ nurseries: sugerencias, columns })}
          {download_pdf({ nurseries: sugerencias, columns, title: "Sugerencias" })}
        </ButtonGroup>
      </Grid>

      {/* 🔹 Tabla */}
      <Grid size={12}>
        {loading ? (
          <CircularProgress />
        ) : (
          <Box sx={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={sugerencias}
              columns={columns}
              initialState={{ pagination: { paginationModel: { pageSize: 5 } } }}
              pageSizeOptions={[5, 10, 20]}
              getRowId={(row) => row.id}
              disableRowSelectionOnClick
              getRowHeight={() => "auto"}
              sx={{
                backgroundColor: "white",
                borderRadius: 2,
                "& .MuiDataGrid-columnHeaders": { backgroundColor: "#e3f2fd", fontWeight: "bold" },
                "& .MuiDataGrid-cell": { whiteSpace: "normal", lineHeight: "1.4 !important" },
              }}
            />
          </Box>
        )}
      </Grid>

      {/* 🔹 Modal */}
      {selectedSugerencia && (
        <ModalDetalleSugerencias
          open={openModal}
          onClose={() => setOpenModal(false)}
          sugerencia={selectedSugerencia}
        />
      )}
    </Grid>
  );
};
