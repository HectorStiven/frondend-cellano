import { useState, createContext, type SetStateAction } from "react";

interface RecuperarContextTypes {
  recuperar: boolean;
  setRecuperar: React.Dispatch<SetStateAction<boolean>>;
}

// 🔹 Crear el contexto
export const RecuperarContext = createContext<RecuperarContextTypes>({
  recuperar: false,
  setRecuperar: () => {},
});

// 🔹 Proveedor (donde se envuelve la app)
export const RecuperarProvider = ({ children }: { children: React.ReactNode }): any => {

    
  const [recuperar, setRecuperar] = useState<boolean>(false);

  const valueRecuperar = { recuperar, setRecuperar };

  return (
    <RecuperarContext.Provider value={valueRecuperar}>
      {children}
    </RecuperarContext.Provider>
  );
};
