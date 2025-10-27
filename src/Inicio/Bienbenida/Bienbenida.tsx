"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Avatar } from "@mui/material";
import { motion } from "framer-motion";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import EmojiFoodBeverageIcon from "@mui/icons-material/EmojiFoodBeverage";
import { frasesMotivacionales } from "./FrasesBienvenida/FrasesBienvenida";



  
export const Bienvenida = () => {




  const [frase, setFrase] = useState("");

  useEffect(() => {
    const index = Math.floor(Math.random() * frasesMotivacionales.length);
    setFrase(frasesMotivacionales[index]);
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "95vh",
        background:
          "linear-gradient(135deg, rgba(227, 242, 253, 0) 0%, #bbdefb20 50%, #90caf9 100%)",
        textAlign: "center",
        p: 3,
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 4,
            borderRadius: "24px",
            backgroundColor: "rgba(255, 255, 255, 0.85)",
            backdropFilter: "blur(10px)",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            maxWidth: 500,
          }}
        >
          <Avatar
            alt="Usuario"
            src="/image/menu/profe.jpg"
            sx={{ width: 140, height: 140, mb: 2, boxShadow: 3 }}
          />

          <Typography variant="h4" fontWeight="bold" color="primary">
            ¡Bienvenido al Restaurante Escolar <br /> Neil Armstrong!
          </Typography>

          <Typography variant="subtitle1" color="text.secondary" sx={{ mt: 1 }}>
            Hoy es un excelente día para disfrutar un buen almuerzo 🍽️
          </Typography>

          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            <RestaurantMenuIcon sx={{ fontSize: 60, color: "#1976d2" }} />
          </motion.div>

          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" color="text.primary">
              🕐 Horarios del Restaurante:
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Lunes a Viernes: 11:00 AM - 2:00 PM
              <br />
              Sábados: 11:00 AM - 1:00 PM
            </Typography>
          </Box>

          <Typography
            variant="body1"
            color="text.primary"
            sx={{ mt: 3, fontStyle: "italic" }}
          >
            {frase}
          </Typography>

          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
            style={{ marginTop: 16 }}
          >
            <EmojiFoodBeverageIcon sx={{ fontSize: 50, color: "#ff9800" }} />
          </motion.div>
        </Paper>
      </motion.div>
    </Box>
  );
};
