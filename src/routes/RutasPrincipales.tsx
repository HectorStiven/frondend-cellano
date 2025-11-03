import { Routes, Route } from "react-router-dom";
import { IndexRecuperarContrasena } from "../Login/RecuperarContasena";
import { Page404 } from "../Elements/Pag404/Pag404";
import { Chatbot } from "../Chatbot/Chatbot";
import { ResponsiveAppBar } from "../Elements/App-Bar/AppBar";
import { AlertasContext } from "../Elements/Context/ContextModoDark";
import { useContext } from "react";
import { IndexMenu } from "../Inicio/Menu/IndexMenu";
import { Sugerencias } from "../Inicio/SugerenciasCalificaciones/Sugerencias";
import { CreditosPagos } from "../Inicio/CreditosPagos/CreditosPagos";
import { Consumos } from "../Inicio/Consumos/Consumos";
import { Bienvenida } from "../Inicio/Bienbenida/Bienbenida";
import { ListarEstudiantes } from "../Inicio/Estudiantes/ListarEstidantes/ListarEstudiantes";
import { ListarMenu } from "../Inicio/Menu/ListarMenu/ListarMenu";
import { CheckEstudiante } from "../Inicio/Check/Check";
import { ListaSugerencias } from "../Inicio/ListaSugerencias/ListaSugerencias";

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
        <Route path="/" element={<Bienvenida />} />

        <Route
          path="/Recuperar_contrasena"
          element={<IndexRecuperarContrasena />}
        />

        <Route path="/ChatBot" element={<Chatbot />} />

        <Route path="/Menu" element={<IndexMenu />} />

        <Route path="/Sugerencias" element={<Sugerencias />} />

        <Route path="/CreditosPagos" element={<CreditosPagos />} />

        <Route path="/Consumos" element={<Consumos />} />

        <Route path="/Estudiantes" element={<ListarEstudiantes />} />

        <Route path="/MenuAdmin" element={<ListarMenu />} />

        <Route path="/Check" element={<CheckEstudiante />} />

        <Route path="/ListaSugerencias" element={<ListaSugerencias />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
};
