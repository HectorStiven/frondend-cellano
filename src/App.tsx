import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { IndexLogin } from "./Login/Login";
import { useSelector } from "react-redux";
import { RootState } from "./store";
import { RutasPrincipales } from "./routes/RutasPrincipales";
import { IndexRecuperarContrasena } from "./Login/RecuperarContasena";
import { RecuperarContext } from "./Elements/Context/RecuperarContraseña";
import { BotonChatBot } from "./Elements/BotonChat/BotonChatBot";

function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const access = auth.access ?? false;

  const { recuperar } = useContext(RecuperarContext);
  console.log("Valor de recuperar en App.tsx:", recuperar);
  // const [recuperar, setRecuperar] = React.useState(true);

  return (
    <>
      {access ? (
        <BrowserRouter>
          <RutasPrincipales />
          <BotonChatBot />
        </BrowserRouter>
      ) : (
        <>{!recuperar ? <IndexLogin /> : <IndexRecuperarContrasena />}</>
      )}

      {/* Botón flotante de ChatGPT, siempre visible */}
    </>
  );
}

export default App;
