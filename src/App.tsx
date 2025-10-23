import React from 'react';
import Box from '@mui/material/Box';
import { BrowserRouter } from 'react-router-dom';
import { RutasPrincipales } from './routes/RutasPrincipales';

function App() {
  return (
    <BrowserRouter>
      <Box>
        <RutasPrincipales />
      </Box>
    </BrowserRouter>
  );
}

export default App;

