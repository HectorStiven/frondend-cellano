import { Routes, Route } from "react-router-dom";
import { IndexRecuperarContrasena } from "../Login/RecuperarContasena";
import { IndexLogin } from "../Login/Login";
import { Page404 } from "../Elements/Pag404/Pag404";
import { Chatbot } from "../Chatbot/Chatbot";
import { ResponsiveAppBar } from "../Elements/App-Bar/AppBar";
import { AlertasContext } from "../Elements/Context/ContextModoDark";
import { useContext } from "react";
import { IndexMenu } from "../Inicio/Menu/IndexMenu";
import { Sugerencias } from "../Inicio/SugerenciasCalificaciones/Sugerencias";

export const RutasPrincipales = () => {
  const { modo_dark_numero } = useContext(AlertasContext);

  const appStyle = {
    backgroundColor: modo_dark_numero,
    minHeight: "100vh",
  };

  return (
    <div style={appStyle}>
      <ResponsiveAppBar />

      <Routes>
        <Route path="/" element={<IndexLogin />} />

        <Route path="/Recuperar_contrasena"element={<IndexRecuperarContrasena />}  />

        <Route path="/Inicio" element={<IndexLogin />} />

        <Route path="/ChatBot" element={<Chatbot />} />

        <Route path="/MenuUsuario" element={<IndexMenu/>} />

        <Route path="/Sugerencias" element={<Sugerencias />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};
