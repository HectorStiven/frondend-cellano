import { Routes, Route } from 'react-router-dom';
import { IndexRecuperarContrasena } from '../Login/RecuperarContasena';
import { IndexLogin } from '../Login/Login';
// import { Page404 } from '../Componets/Pag404/Pag404';


export const RutasPrincipales = () => {
  return (
    <Routes >
      <Route path="/" element={<IndexLogin/>} />

     <Route path="/Inicio"  element={<IndexRecuperarContrasena />}/> 





      {/* <Route path="*" element={<Page404 />} /> */}

    </Routes>
  );
}
