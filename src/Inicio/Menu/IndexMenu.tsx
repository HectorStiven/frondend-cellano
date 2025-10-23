import React, { useState } from 'react'
import { Box, Card, CardContent, Typography, Grid, Button, Collapse } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu'
import { Title } from '../../Elements/Titulo/Titulo'

// Datos de ejemplo
const menuDia = {
  imagen: 'https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif',
  plato_principal: { nombre: 'Arroz con Pollo', descripcion: 'Delicioso arroz con pollo al estilo casero', imagen: 'https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif' },
  acompanamiento: { nombre: 'Ensalada Fresca', descripcion: 'Mezcla de verduras frescas con aderezo', imagen:'https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif' },
  bebida: { nombre: 'Jugo de Naranja', descripcion: 'Jugo natural recién exprimido', imagen: 'https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif'},
  postre: { nombre: 'Gelatina', descripcion: 'Gelatina de sabores variados', imagen: 'https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif' },
}

export const IndexMenu = () => {
  const [showInfo, setShowInfo] = useState<{ [key: number]: boolean }>({})

  const handleToggleInfo = (index: number) => {
    setShowInfo((prev) => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <Box sx={{ padding: 4, minHeight: '100vh' }}>

        <Grid  sx={{ mb: 3 }}>
          <Title title="Menu del Día" />
        </Grid>
      {/* Imagen principal */}
      <Box
        sx={{
          width: '100%',
          height: { xs: 200, md: 400 },
          backgroundImage: `url(${menuDia.imagen})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 3,
          mb: 4,
          boxShadow: 6,
        }}
      />

      {/* Grid del menú */}
      <Grid container spacing={4} justifyContent="center">
        {[menuDia.plato_principal, menuDia.acompanamiento, menuDia.bebida, menuDia.postre].map((item, index) => (
          <Grid key={index} size={{ xs: 12, sm: 6, md: 3 }}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 8,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'translateY(-5px)' },
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  backgroundImage: `url(${item.imagen})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                }}
              />
              <CardContent>
                <Typography variant="h6" textAlign="center" gutterBottom>
                  {item.nombre}
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<InfoIcon />}
                    onClick={() => handleToggleInfo(index)}
                  >
                    Información
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<RestaurantMenuIcon />}
                  >
                    Detalle
                  </Button>
                </Box>

                {/* Panel de información */}
                <Collapse in={showInfo[index]}>
                  <Box sx={{ mt: 2, p: 2, backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="body2" textAlign="center">
                      {item.descripcion}
                    </Typography>
                  </Box>
                </Collapse>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
