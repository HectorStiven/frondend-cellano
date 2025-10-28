import React, { useState, useEffect } from "react";
import { Grid, Button, TextField } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
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
      const res = await api.get<{ data: Menu[] }>(
        "/almuerzo_check/menu/listar/"
      );
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

  // 🔍 Campos del filtro visual
  const [platoPrincipal, setPlatoPrincipal] = useState("");
  const [bebida, setBebida] = useState("");
  const [postre, setPostre] = useState("");

  const handleBuscar = () => {
    console.log("Buscando con:", { platoPrincipal, bebida, postre });
  };

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
      >
        {/* 🔹 Título */}
        <Grid size={{ xs: 12 }}>
          <Title title="Lista de Menús" />
        </Grid>

        {/* 🔹 Filtros de búsqueda */}
   
          <Grid size={{ xs: 12, md: 4 }}>
            <TextField
              fullWidth
              label="Plato Principal"
              variant="outlined"
              size="small"
              value={platoPrincipal}
              onChange={(e) => setPlatoPrincipal(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="Bebida"
              variant="outlined"
              size="small"
              value={bebida}
              onChange={(e) => setBebida(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
              }}
            />
          </Grid>
          <Grid size={{ xs: 12, md: 3 }}>
            <TextField
              fullWidth
              label="Postre"
              variant="outlined"
              size="small"
              value={postre}
              onChange={(e) => setPostre(e.target.value)}
              sx={{
                "& .MuiOutlinedInput-root": { borderRadius: "10px" },
              }}
            />
          </Grid>
          <Grid
            size={{ xs: 12, md: 2 }}
          >
            <Button
              variant="contained"
              color="success"
              startIcon={<SearchIcon />}
              onClick={handleBuscar}
              sx={{
                height: "40px",
                borderRadius: "10px",
                textTransform: "none",
                fontWeight: "bold",
              }}
            >
              Buscar
            </Button>
          </Grid>
     
        {/* 🔹 Tabla de Menús */}
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
          <Grid size={{ xs: 12 }}>
            <DataGrid
              rows={menus}
              columns={columns}
              autoHeight
              getRowId={(row) => row.id}
            />
          </Grid>

          {/* 🔹 Botones de Crear y Editar */}
          <Grid
            size={{ xs: 6 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ModalCrearMenu />
          </Grid>
          <Grid
            size={{ xs: 6 }}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <ModalEditarMenu />
          </Grid>
        </Grid>
      </Grid>

      {/* 🔹 Reseñas */}
      <ListarReseñas />
    </>
  );
};
