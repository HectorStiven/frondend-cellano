import React, { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { IndexLogin } from "./Login/Login";
import {  useSelector } from "react-redux";
import { RootState } from "./store";
import { RutasPrincipales } from "./routes/RutasPrincipales";
import { IndexRecuperarContrasena } from "./Login/RecuperarContasena";
import { RecuperarContext } from "./Elements/Context/RecuperarContraseña";

function App() {
  const auth = useSelector((state: RootState) => state.auth);
  const access = auth.access ?? false;

  const { recuperar } = useContext(RecuperarContext);
  console.log("Valor de recuperar en App.tsx:", recuperar);
  // const [recuperar, setRecuperar] = React.useState(true);



  return (
    <>
      {access ? (
        // ✅ Si está autenticado, muestra las rutas principales
        <BrowserRouter>
          <RutasPrincipales />
        </BrowserRouter>
      ) : (
        // ❌ Si NO está autenticado:
        <>
          {!recuperar ? (
            // 🔹 Mostrar el login
            <IndexLogin />
          ) : (
            // 🔹 Mostrar la pantalla de recuperación
            <IndexRecuperarContrasena />
          )}
        </>
      )}
    </>
  );
}

export default App;
