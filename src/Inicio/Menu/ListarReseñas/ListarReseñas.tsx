import React, { useState, useEffect } from "react";
import { Grid, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Title } from "../../../Elements/Titulo/Titulo";
import { api } from "../../../api/Axios";
import VisibilityIcon from "@mui/icons-material/Visibility";

interface Menu {
  id: number;
  fecha: string;
  descripcion: string;
  plato_principal: string;
  acompanamiento: string;
  bebida: string;
  postre: string;
  calorias_total: number;
}

export const ListarReseñas: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);

  const fetchMenus = async () => {
    try {
      const res = await api.get<{ data: Menu[] }>("/almuerzo_check/menu/listar/");
      setMenus(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);
const handleVerDetalle = (menu: Menu) => {
  console.log("Ver detalle del menú:", menu);
};

const columns: GridColDef[] = [
  { field: "fecha", headerName: "Fecha", flex: 1 },
  { field: "descripcion", headerName: "Descripción", flex: 2 },
  { field: "plato_principal", headerName: "Plato Principal", flex: 1.5 },
  { field: "acompanamiento", headerName: "Acompañamiento", flex: 1.5 },
  { field: "bebida", headerName: "Bebida", flex: 1 },
  { field: "postre", headerName: "Postre", flex: 1 },
  { field: "calorias_total", headerName: "Calorías", flex: 0.7 },
  {
    field: "acciones",
    headerName: "Ver Detalle",
    flex: 0.5,
    sortable: false,
    renderCell: (params: any) => (
      <VisibilityIcon
        style={{ cursor: "pointer", color: "#1976d2" }}
        onClick={() => handleVerDetalle(params.row)}
      />
    ),
  },
];
  return (
    <Box sx={{ padding: 4, minHeight: "100vh" }}>
      <Box sx={{ mb: 3 }}>
        <Title title="Lista de Menús" />
      </Box>
      <Grid
        container
        sx={{
          p: 2,
          background: "#FAFAFA",
          borderRadius: "15px",
          boxShadow: "0px 3px 6px #042F4A26",
        }}
      >
        <Grid  size={12}>
          <DataGrid
            rows={menus}
            columns={columns}
            autoHeight
            getRowId={(row) => row.id}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
