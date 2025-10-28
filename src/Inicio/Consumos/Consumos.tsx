import React, { useState } from "react";
import { Grid, Chip, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Title } from "../../Elements/Titulo/Titulo";
import { Geolocalizacion } from "../../Elements/Mapa/Mapa";

export const Consumos = () => {
  // Datos de ejemplo
  const [consumos] = useState([
    {
      id: 1,
      descripcion: "Llamada nacional",
      fecha: "2025-10-24",
      valor: 1500,
      estado: true,
    },
    {
      id: 2,
      descripcion: "Datos móviles",
      fecha: "2025-10-22",
      valor: 3500,
      estado: false,
    },
    {
      id: 3,
      descripcion: "Mensajes SMS",
      fecha: "2025-10-20",
      valor: 800,
      estado: true,
    },
  ]);

  // Columnas del DataGrid
  const columns: GridColDef[] = [
    { field: "descripcion", headerName: "Descripción", flex: 1 },
    { field: "fecha", headerName: "Fecha", flex: 1 },
    { field: "valor", headerName: "Valor ($)", flex: 0.8 },
    {
      field: "estado",
      headerName: "Estado",
      flex: 0.6,
      renderCell: (params) => (
        <Chip
          label={params.value ? "Activo" : "Inactivo"}
          color={params.value ? "success" : "error"}
          size="small"
        />
      ),
    },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      renderCell: () => (
        <Button
          variant="contained"
          color="primary"
          style={{ backgroundColor: "green", color: "white" }}
        >
          Ver detalle
        </Button>
      ),
    },
  ];

  return (
    <Grid
      spacing={3}
      sx={{
        p: 4,
        backgroundColor: "#fafafa",
        borderRadius: 4,
        boxShadow: 4,
        m: 3,
      }}
    >
      {/* Título principal */}
      <Grid size={{ xs: 12 }}>
        <Title title="Consumos" />
      </Grid>

      <Grid sx={{ xs: 12,marginTop: 3 }}>
        <DataGrid
          rows={consumos}
          columns={columns}
          autoHeight
          disableRowSelectionOnClick
          sx={{
            backgroundColor: "#fff",
            borderRadius: "15px",
          }}
        />
      </Grid>

      <Grid sx={{ mt: 3 }}>
        {/* Ubicación de San Benito, Villavicencio */}
        <Geolocalizacion coordenada_x={4.1348} coordenada_y={-73.6202} />
      </Grid>
    </Grid>
  );
};
