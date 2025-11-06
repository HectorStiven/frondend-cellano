"use client";

import { useState } from "react";
import {
  Button,
  TextField,
  Box,
  Typography,
  Paper,
  Grid,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion } from "framer-motion";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import PersonIcon from "@mui/icons-material/Person";
import { Title } from "../Elements/Titulo/Titulo";
import { responseTree } from "./ChatBotDireccionamiento";

type Message = {
  role: "user" | "assistant";
  content: string;
};

const ScrollArea = styled(Paper)({
  overflowY: "auto",
  maxHeight: "500px",
  borderRadius: "15px",
  padding: "20px",
  marginBottom: "16px",
  backgroundColor: "rgba(255,255,255,0.85)",
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

  const suggestions = currentNode.options
    ? Object.keys(currentNode.options)
    : [];

  return (
    <Grid
      container
      spacing={2}
      sx={{
        backgroundColor: "#fafafa",
        p: 3,
        borderRadius: 4,
        boxShadow: 4,
        margin: 3,
        position: "relative",
        overflow: "hidden",
      }}
      justifyContent="center"
      alignItems="center"
    >
      <Grid size={{ xs: 12 }}>
        <Title title="ChatBot Neil Armstrong School " />
      </Grid>

      <Grid size={{ xs: 10}}>
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Box
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection:
                      message.role === "user" ? "row-reverse" : "row",
                    alignItems: "flex-end",
                    gap: 1,
                  }}
                >
                  {/* Avatar animado */}
                  <motion.div
                    animate={
                      message.role === "assistant"
                        ? {
                            scale: [1, 1.05, 1],
                            transition: { repeat: Infinity, duration: 2 },
                          }
                        : {}
                    }
                  >
                    <Avatar
                      sx={{
                        bgcolor:
                          message.role === "user" ? "#1976d2" : "#ffb300",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
                      }}
                    >
                      {message.role === "user" ? (
                        <PersonIcon />
                      ) : (
                        <SmartToyIcon />
                      )}
                    </Avatar>
                  </motion.div>

                  {/* Burbuja */}
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius:
                        message.role === "user"
                          ? "20px 20px 0px 20px"
                          : "20px 20px 20px 0px",
                      bgcolor: message.role === "user" ? "#1976d2" : "#e0e0e0",
                      color: message.role === "user" ? "white" : "black",
                      maxWidth: "80%",
                      wordWrap: "break-word",
                      boxShadow:
                        message.role === "user"
                          ? "0 3px 8px rgba(25,118,210,0.3)"
                          : "0 3px 8px rgba(0,0,0,0.2)",
                      fontSize: "0.95rem",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        boxShadow:
                          message.role === "user"
                            ? "0 6px 12px rgba(25,118,210,0.4)"
                            : "0 6px 12px rgba(0,0,0,0.25)",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    {message.content}
                  </Box>
                </Box>
              </motion.div>
            ))
          )}

          {/* Indicador de escritura animado */}
          {isTyping && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mt: 2,
                ml: 1,
              }}
            >
              <Avatar sx={{ bgcolor: "#ffb300" }}>
                <SmartToyIcon />
              </Avatar>
              <Box sx={{ display: "flex", gap: 0.5 }}>
                {[0, 1, 2].map((dot) => (
                  <motion.span
                    key={dot}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      delay: dot * 0.2,
                    }}
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "#555",
                      display: "inline-block",
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </ScrollArea>

        {/* Sugerencias rápidas */}
        {suggestions.length > 0 && (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
            {suggestions.map((option, idx) => (
              <Button
                key={idx}
                variant="outlined"
                size="small"
                onClick={() => setInput(option)}
                sx={{
                  textTransform: "none",
                  borderRadius: "20px",
                  "&:hover": { bgcolor: "#e3f2fd" },
                }}
              >
                {option}
              </Button>
            ))}
          </Box>
        )}

        {/* Entrada de texto */}
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", gap: 2, mt: 2 }}
        >
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe tu mensaje aquí..."
            variant="outlined"
            fullWidth
            sx={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              "& .MuiOutlinedInput-root": {
                "&:hover fieldset": { borderColor: "#1976d2" },
                "&.Mui-focused fieldset": { borderColor: "#115293" },
              },
            }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<SmartToyIcon />}
            type="submit"
            sx={{
              px: 3,
              borderRadius: "12px",
              textTransform: "none",
              fontWeight: "bold",
              background: "linear-gradient(90deg, #1976d2, #42a5f5)",
              boxShadow: "0 3px 8px rgba(25,118,210,0.3)",
              "&:hover": {
                background: "linear-gradient(90deg, #1565c0, #2196f3)",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 14px rgba(25,118,210,0.5)",
              },
            }}
          >
            Enviar
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
};
