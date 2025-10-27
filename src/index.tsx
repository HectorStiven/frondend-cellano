import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// 🎨 Estilos de PrimeReact
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

import { AlertasProvider } from "./Elements/Context/ContextModoDark";
import { Provider } from "react-redux";
import { store, persistor } from "./store"; // 👈 importa también el persistor
import { PersistGate } from "redux-persist/integration/react"; // 👈 importa PersistGate
import { RecuperarProvider } from "./Elements/Context/RecuperarContraseña";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* 🔐 PersistGate se asegura de restaurar el estado antes de renderizar */}
      <PersistGate
        loading={<div>Cargando aplicación...</div>}
        persistor={persistor}
      >
        <AlertasProvider>
          <RecuperarProvider>
            <App />
            <ToastContainer /> {/* 👈 Este componente es OBLIGATORIO */}
          </RecuperarProvider>
        </AlertasProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
