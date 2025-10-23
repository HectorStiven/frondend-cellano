"use client";

import { useState } from "react";
import { Button, TextField, Box, Typography, Paper, Grid } from "@mui/material";
import { styled } from "@mui/system";
import { responseTree } from "./ChatBotDireccionamiento";
import { Title } from "../Elements/Titulo/Titulo";

type Message = {
  role: "user" | "assistant";
  content: string;
};

// Definir área de scroll con Material-UI y CSS personalizado
const ScrollArea = styled(Paper)({
  overflowY: "auto",
  maxHeight: "500px",
  borderRadius: "8px",
  padding: "16px",
  marginBottom: "16px",
  backgroundColor: "#f5f5f5",
});

// Definir el tipo del árbol JSON
type ResponseTree = {
  response: string;
  options?: {
    [key: string]: ResponseTree;
  };
};



export const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [currentNode, setCurrentNode] = useState<ResponseTree>(responseTree.PruebaStiven);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    // Añadir mensaje del usuario
    const userMessage: Message = { role: "user", content: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Limpiar el input
    setInput("");

    // Buscar la respuesta en el árbol JSON
    const responseNode = currentNode.options?.[input];
    if (responseNode) {
      setTimeout(() => {
        const aiMessage: Message = {
          role: "assistant",
          content: responseNode.response,
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
        setCurrentNode(responseNode);
      }, 1000);
    } else {
      setTimeout(() => {
        const aiMessage: Message = {
          role: "assistant",
          content: `No entiendo "${input}".`,
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      }, 1000);
    }
  };

  return (
    <Grid container spacing={4}sx={{ justifyContent: "center" , padding: "20px"}}>
      <Grid
     size={6}
        spacing={0}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          background: "#FAFAFA",
          borderRadius: "15px",
          p: "20px",
          mb: "20px",
          boxShadow: "0px 3px 6px #042F4A26",
        }}
      >
        <Grid size={12} >
          <Title title="Chatbot de IA" />
        </Grid>
        <Grid>
          {/* Área de scroll para los mensajes */}
          <ScrollArea elevation={3}>
            {messages.length === 0 ? (
              <Typography
                variant="body1"
                align="center"
                sx={{ color: "grey.600" }}
              >
                ¡Hola! Escribe un mensaje para comenzar la conversación.
              </Typography>
            ) : (
              messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    mb: 2,
                    textAlign: message.role === "user" ? "right" : "left",
                  }}
                >
                  <Box
                    sx={{
                      display: "inline-block",
                      p: 1,
                      borderRadius: "8px",
                      bgcolor:
                        message.role === "user" ? "primary.main" : "grey.300",
                      color: message.role === "user" ? "white" : "text.primary",
                      maxWidth: "80%",
                    }}
                  >
                    {message.content}
                  </Box>
                </Box>
              ))
            )}
          </ScrollArea>

          {/* Formulario de envío de mensaje */}
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
            />
            <Button variant="contained" color="primary" type="submit">
              Enviar
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
};