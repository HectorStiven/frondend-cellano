import React, { useState, useEffect } from "react";
import { Grid, TextField, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Title } from "../../../Elements/Titulo/Titulo";
import { api } from "../../../api/Axios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SearchIcon from "@mui/icons-material/Search";

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
  const [filteredMenus, setFilteredMenus] = useState<Menu[]>([]);

  const [platoPrincipal, setPlatoPrincipal] = useState("");
  const [bebida, setBebida] = useState("");
  const [postre, setPostre] = useState("");

  const fetchMenus = async () => {
    try {
      const res = await api.get<{ data: Menu[] }>("/almuerzo_check/menu/listar/");
      setMenus(res.data.data);
      setFilteredMenus(res.data.data);
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

  const handleBuscar = () => {
    const filtered = menus.filter((menu) => {
      return (
        (platoPrincipal === "" || menu.plato_principal.toLowerCase().includes(platoPrincipal.toLowerCase())) &&
        (bebida === "" || menu.bebida.toLowerCase().includes(bebida.toLowerCase())) &&
        (postre === "" || menu.postre.toLowerCase().includes(postre.toLowerCase()))
      );
    });
    setFilteredMenus(filtered);
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
      {/* Título */}
      <Grid size={{ xs: 12 }}>
        <Title title="Listar Reseñas" />
      </Grid>


        <Grid size={{ xs: 12, md: 4 }}>
          <TextField
            fullWidth
            label="Plato Principal"
            variant="outlined"
            size="small"
            value={platoPrincipal}
            onChange={(e) => setPlatoPrincipal(e.target.value)}
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
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
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
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
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: "10px" } }}
          />
        </Grid>
        <Grid
          size={{ xs: 12, md: 2 }}
        >
          <Button
            variant="contained"
            color="primary"
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

      {/* Tabla */}
      <Grid size={12}>
        <DataGrid
          rows={filteredMenus}
          columns={columns}
          autoHeight
          getRowId={(row) => row.id}
        />
      </Grid>
    </Grid>
  );
};
