import React, { useState, useEffect } from "react";
import { Grid, Box, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Title } from "../../../Elements/Titulo/Titulo";
import { api } from "../../../api/Axios";
import { ModalCrearMenu } from "../CrearMenu/CrearMenu";
import { ModalEditarMenu } from "../EditarMenu/EditarMenu";
import { ListarReseñas } from "../ListarReseñas/ListarReseñas";

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

export const ListarMenu: React.FC = () => {
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

  const handleEditar = (menu: Menu) => {
    console.log("Editar menú:", menu);
  };

  const handleDelete = (menu: Menu) => {
    console.log("Eliminar menú:", menu);
  };

  const columns: GridColDef[] = [
    // { field: "fecha", headerName: "Fecha", flex: 1 },
    { field: "descripcion", headerName: "Descripción", flex: 2 },
    { field: "plato_principal", headerName: "Plato Principal", flex: 1.5 },
    { field: "acompanamiento", headerName: "Acompañamiento", flex: 1.5 },
    { field: "bebida", headerName: "Bebida", flex: 1 },
    { field: "postre", headerName: "Postre", flex: 1 },
    { field: "calorias_total", headerName: "Calorías", flex: 0.7 },
    {
      field: "acciones",
      headerName: "Acciones",
      flex: 1,
      renderCell: (params: any) => (
        <div style={{ display: "flex", gap: 5 }}>
          <Button
            variant="contained"
            style={{ backgroundColor: "blue" }}
            onClick={() => handleEditar(params.row)}
          >
            <EditIcon />
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "red" }}
            onClick={() => handleDelete(params.row)}
          >
            <DeleteIcon />
          </Button>
        </div>
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
        spacing={2}
      >
        {/* Tabla de Menús */}
        <Grid size={{ xs: 12 }}>
          <DataGrid
            rows={menus}
            columns={columns}
            autoHeight
            getRowId={(row) => row.id}
          />
        </Grid>

        {/* Botones de Crear y Editar */}
        <Grid size={{ xs: 6 }} sx={{ display: "flex", justifyContent: "center" }}>
          <ModalCrearMenu />
        </Grid>
        <Grid size={{ xs: 6 }} sx={{ display: "flex", justifyContent: "center" }}>
          <ModalEditarMenu />
        </Grid>
      </Grid>

      <ListarReseñas />
    </Box>
  );
};
