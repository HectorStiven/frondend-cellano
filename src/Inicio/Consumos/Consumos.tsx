import React, { useCallback, useEffect, useState } from "react";
import { Grid, Typography, Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Title } from "../../Elements/Titulo/Titulo";
import { Geolocalizacion } from "../../Elements/Mapa/Mapa";
import { api } from "../../api/Axios";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

// 🧩 Interfaces
interface Consumo {
  id: number;
  estudiante: number;
  menu: number | null;
  plato_principal?: string | null;
  fecha: string;
  hora: string;
}

interface ConsumoResponse {
  success: boolean;
  detail: string;
  data: Consumo[];
}

// 🧭 Componente principal
export const Consumos = () => {
  const [consumos, setConsumos] = useState<Consumo[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const estudianteInfo = useSelector(
    (state: RootState) => state.auth.estudiante_info
  );
  // 📡 Petición API

  const fetchConsumos = useCallback(async () => {
    const id = estudianteInfo?.id || 0;
    try {
      const res = await api.get<ConsumoResponse>(
        `/almuerzo_check/consumos/estudiante/${id}/`
      );
      if (res.data?.success && Array.isArray(res.data.data)) {
        setConsumos(res.data.data);
      }
    } catch (err: any) {
      const message =
        err.response?.data?.detail ||
        err.message ||
        "Error desconocido al obtener los consumos.";
      console.error("❌ Error API:", message);
    }
  }, [estudianteInfo?.id]);

  useEffect(() => {
    fetchConsumos();
  }, [fetchConsumos]);

  // 🎨 Calcular conteo de consumos por fecha
  const conteoPorFecha = consumos.reduce((acc: Record<string, number>, c) => {
    acc[c.fecha] = (acc[c.fecha] || 0) + 1;
    return acc;
  }, {});

  // 🎯 Personalizar el contenido de cada día del calendario
  const tileContent = ({ date }: { date: Date }) => {
    const fechaISO = date.toISOString().split("T")[0];
    const count = conteoPorFecha[fechaISO];

    if (count) {
      let color = "#66bb6a"; // verde = 1 consumo
      if (count === 2) color = "#ffa726"; // naranja = 2 consumos
      if (count >= 3) color = "#ffeb3b"; // amarillo = 3 o más

      return (
        <div
          title={`${count} consumo${count > 1 ? "s" : ""}`}
          style={{
            width: 12,
            height: 12,
            backgroundColor: color,
            borderRadius: "50%",
            margin: "4px auto 0",
            boxShadow: `0 0 6px ${color}88`,
          }}
        ></div>
      );
    }
    return null;
  };

  // 🧱 Columnas del DataGrid
  const columns: GridColDef[] = [
    { field: "fecha", headerName: "Fecha", flex: 1 },
    { field: "hora", headerName: "Hora", flex: 1 },
  ];

  return (
    <Grid
      spacing={3}
      sx={{
        p: 4,
        borderRadius: 4,
        backgroundColor: "#fafafa",
        boxShadow: "0 6px 20px rgba(0, 0, 0, 0.1)",
        m: 3,
      }}
    >
      {/* 🏷️ Título */}
      <Grid size={{ xs: 12 }}>
        <Title title="Calendario del Estudiante" />
      </Grid>
      {/* 📅 Calendario estilizado */}
      <Grid size={{ xs: 12 }} sx={{ margin: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            "& .react-calendar": {
              width: "100%",
              border: "none",
              borderRadius: "20px",
              backgroundColor: "rgba(186, 220, 255, 0.52)",
              padding: "1rem",
              boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
              "& button": {
                borderRadius: "12px",
                transition: "background-color 0.3s ease, transform 0.2s",
              },
              transition: "all 0.3s ease",
              "& .react-calendar__month-view__days__day--weekend": {
                color: "#ef5350",
              },
            },
          }}
        >
          <Calendar
            onChange={(value) => setSelectedDate(value as Date)}
            value={selectedDate}
            tileContent={tileContent}
          />
        </Box>
      </Grid>
      {/* 🟢 Leyenda de colores */}
      <Grid size={{ xs: 12 }} sx={{ marginTop: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 3,
            mt: 2,
            backgroundColor: "rgba(255,255,255,0.8)",
            borderRadius: 2,
            p: 1.5,
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}
        >
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 14,
                height: 14,
                backgroundColor: "#66bb6a",
                borderRadius: "50%",
              }}
            />
            1 Consumo
          </Typography>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 14,
                height: 14,
                backgroundColor: "#ffa726",
                borderRadius: "50%",
              }}
            />
            2 Consumos
          </Typography>
          <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                width: 14,
                height: 14,
                backgroundColor: "#ffeb3b",
                borderRadius: "50%",
              }}
            />
            3 o más Consumos
          </Typography>
        </Box>
      </Grid>
      {/* 🏷️ Título */}
      <Grid size={{ xs: 12 }} sx={{ marginTop: 4 }}>
        <Title title="Consumos del Estudiante " />
      </Grid>
      {/* 📊 Tabla de datos */}
      <Grid size={{ xs: 10, md: 8 }} sx={{ marginTop: 4 }}>
        <DataGrid
          rows={consumos}
          columns={columns}
          getRowId={(row) => row.id}
          pageSizeOptions={[5]}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
        />
      </Grid>{" "}
      <Grid size={{ xs: 12 }} sx={{ marginTop: 4 }}>
        <Title title="Mapa " />
      </Grid>
      {/* 🗺️ Mapa */}
      <Grid size={{ xs: 12 }} sx={{ marginTop: 4 }}>
        <Geolocalizacion coordenada_x={4.1348} coordenada_y={-73.6202} />
      </Grid>
    </Grid>
  );
};
