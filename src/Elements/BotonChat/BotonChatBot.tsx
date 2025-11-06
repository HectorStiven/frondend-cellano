import React, { useEffect, useState } from "react";
import { IconButton, Box, Typography } from "@mui/material";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useNavigate } from "react-router-dom";
import { frases } from "./frasesChatBot";

export const BotonChatBot: React.FC = () => {
  const navigate = useNavigate();
  const [showBubble, setShowBubble] = useState(false);
  const [mensaje, setMensaje] = useState("");



  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * frases.length);
      setMensaje(frases[randomIndex]);
      setShowBubble(true);
      setTimeout(() => setShowBubble(false), 8000);
    }, 1 * 60 * 1000); // cada 2 minutos

    return () => clearInterval(interval);
  }, []);

  const handleClick = () => navigate("/ChatBot");

  return (
    <>
      {/* Burbuja de mensaje */}
      {showBubble && (
        <Box
          sx={{
            position: "fixed",
            bottom: 100,
            left: 24, // cambio a la izquierda
            bgcolor: "#ffffff",
            px: 2,
            py: 1,
            borderRadius: 2,
            boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
            animation: "fadeInOut 1s ease-in-out",
            zIndex: 9999,
            maxWidth: 250,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 700 }}>
            {mensaje}
          </Typography>
        </Box>
      )}

      {/* Botón flotante al lado izquierdo */}
      <IconButton
        onClick={handleClick}
        sx={{
          position: "fixed",
          bottom: 24,
          left: 24, // cambio a la izquierda
          width: 64,
          height: 64,
          bgcolor: "#00c853",
          color: "white",
          "&:hover": {
            bgcolor: "#00e676",
            transform: "scale(1.15)",
            boxShadow: "0 6px 25px rgba(0,0,0,0.35)",
          },
          borderRadius: "50%",
          zIndex: 9999,
        }}
      >
        <SmartToyIcon fontSize="large" />
      </IconButton>

      <style>
        {`
          @keyframes fadeInOut {
            0% { opacity: 0; transform: translateY(10px); }
            10% { opacity: 1; transform: translateY(0); }
            90% { opacity: 1; transform: translateY(0); }
            100% { opacity: 0; transform: translateY(10px); }
          }
        `}
      </style>
    </>
  );
};
