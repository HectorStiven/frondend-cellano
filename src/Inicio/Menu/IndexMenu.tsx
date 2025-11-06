import React, { useState, useEffect } from "react";
import { Box, Card, CardContent, Typography, Grid, Button, Collapse } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import { Title } from "../../Elements/Titulo/Titulo";
import { control_error } from "../../Elements/alertas/alertaError";
import { api } from "../../api/Axios";

interface Menu {
  id: number;
  fecha: string;
  descripcion: string;
  plato_principal: string;
  acompanamiento: string;
  bebida: string;
  postre: string;
  calorias_total: number;
  fotoId: string;
}

export const IndexMenu: React.FC = () => {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [showInfo, setShowInfo] = useState<{ [key: number]: boolean }>({});

  const fetchMenus = async () => {
    try {
      const res = await api.get<{ data: Menu[] }>("/almuerzo_check/menu/listar/");
      setMenus(res.data.data);
    } catch (error) {
      console.error(error);
      control_error("Error al cargar los menús");
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleToggleInfo = (menuId: number) => {
    setShowInfo((prev) => ({ ...prev, [menuId]: !prev[menuId] }));
  };

  return (
    <Box sx={{ padding: 4, minHeight: "100vh" }}>
      <Grid sx={{ mb: 3 }}>
        <Title title="Menú del Día" />
      </Grid>

      <Grid container spacing={4} justifyContent="center">
        {menus.map((menu) => (
          <Grid key={menu.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 8,
                transition: "transform 0.3s",
                "&:hover": { transform: "translateY(-5px)" },
              }}
            >
              {/* Imagen del menú */}
              <Box
                sx={{
                  width: "100%",
                  height: 200,
                  backgroundImage: `url(${menu.fotoId})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
              <CardContent>
                <Typography variant="h6" textAlign="center" gutterBottom>
                  {menu.descripcion}
                </Typography>

                <Box sx={{ mt: 1 }}>
                  <Typography variant="body2">
                    <strong>Plato Principal:</strong> {menu.plato_principal}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Acompañamiento:</strong> {menu.acompanamiento}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Bebida:</strong> {menu.bebida}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Postre:</strong> {menu.postre}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Calorías:</strong> {menu.calorias_total}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<InfoIcon />}
                    onClick={() => handleToggleInfo(menu.id)}
                  >
                    Información
                  </Button>
                  <Button variant="outlined" color="secondary" startIcon={<RestaurantMenuIcon />}>
                    Detalle
                  </Button>
                </Box>

                {/* Panel de información adicional */}
                <Collapse in={showInfo[menu.id]}>
                  <Box
                    sx={{
                      mt: 2,
                      p: 2,
                      backgroundColor: "#f5f5f5",
                      borderRadius: 2,
                      boxShadow: 3,
                    }}
                  >
                    <Typography variant="body2" textAlign="center">
                      {menu.descripcion}
                    </Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
