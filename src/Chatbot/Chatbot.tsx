"use client";

import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/system";
import { responseTree } from "./ChatBotDireccionamiento";
import { Title } from "../Elements/Titulo/Titulo";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Área scroll del chat
const ScrollArea = styled(Paper)({
  overflowY: "auto",
  maxHeight: "500px",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "16px",
  backgroundColor: "#f9f9f9",
  boxShadow: "inset 0 0 10px rgba(0,0,0,0.08)",
  transition: "all 0.3s ease",
});

type ResponseTree = {
  response: string;
  options?: { [key: string]: ResponseTree };
};

export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [currentNode, setCurrentNode] = useState<ResponseTree>(
    responseTree.PruebaStiven
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    const responseNode = currentNode.options?.[input];
    setTimeout(() => {
      if (responseNode) {
        const aiMessage: Message = {
          role: "assistant",
          content: responseNode.response,
        };
        setMessages((prev) => [...prev, aiMessage]);
        setCurrentNode(responseNode);
      } else {
        const aiMessage: Message = {
          role: "assistant",
          content: `No entiendo "${input}". ¿Podrías intentar otra palabra? 🤔`,
        };
        setMessages((prev) => [...prev, aiMessage]);
      }
      setIsTyping(false);
    }, 1000);
  };

  return (
    <Grid
      container
      spacing={4}
      sx={{ justifyContent: "center", padding: "20px" }}
    >
      <Grid size={{ xs: 12 }}>
        <Title title="Chatbot de IA" />
      </Grid>

      <Grid
        size={{ xs: 12, md: 8 }}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          background: "#FFFFFF",
          borderRadius: "20px",
          p: "30px",
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <Grid size={{ xs: 12 }}>
          <ScrollArea elevation={2}>
            {messages.length === 0 ? (
              <Typography
                align="center"
                sx={{ color: "grey.600", fontSize: "1rem" }}
              >
                💬 ¡Hola! Escribe un mensaje para comenzar la conversación.
              </Typography>
            ) : (
              messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    textAlign: message.role === "user" ? "right" : "left",
                    animation: "fadeIn 0.3s ease-in-out",
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-block",
                      p: 1.5,
                      borderRadius:
                        message.role === "user"
                          ? "20px 20px 0px 20px"
                          : "20px 20px 20px 0px",
                      bgcolor:
                        message.role === "user" ? "#1976d2" : "#e0e0e0",
                      color: message.role === "user" ? "white" : "black",
                      maxWidth: "80%",
                      wordWrap: "break-word",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                      fontSize: "0.95rem",
                    }}
                  >
                    {message.content}
                  </Box>
                </Box>
              ))
            )}

            {/* Animación de escribiendo */}
            {isTyping && (
              <Box
                sx={{
                  textAlign: "left",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  mt: 1,
                  ml: 1,
                }}
              >
                <CircularProgress size={20} thickness={4} />
                <Typography variant="body2" color="text.secondary">
                  El asistente está escribiendo...
                </Typography>
              </Box>
            )}
          </ScrollArea>

          {/* Formulario de entrada */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", gap: 2 }}
          >
            <TextField
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje aquí..."
              variant="outlined"
              fullWidth
              sx={{
                borderRadius: "10px",
                backgroundColor: "#fafafa",
              }}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                px: 3,
                borderRadius: "12px",
                textTransform: "none",
                backgroundColor: "#1976d2",
                fontWeight: "bold",
                "&:hover": { backgroundColor: "#115293" },
              }}
            >
              Enviar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};
