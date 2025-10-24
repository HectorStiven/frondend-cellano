import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// En tu entrypoint, por ejemplo en _app.tsx o index.tsx
import "primereact/resources/themes/saga-blue/theme.css"; // tema opcional
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { AlertasProvider } from "./Elements/Context/ContextModoDark";
import { Provider } from "react-redux";
import { store } from "./store";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AlertasProvider>
        <App />
      </AlertasProvider>
    </Provider>
  </React.StrictMode>
);

// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import { App } from "./App";
// import "primereact/resources/themes/saga-blue/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";
// import { AlertasProvider } from "./Elements/Context/ContextModoDark";
// import { Provider } from "react-redux";
// import { store } from "./store";

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <AlertasProvider>
//         <App />
//       </AlertasProvider>
//     </Provider>
//   </React.StrictMode>
// );
