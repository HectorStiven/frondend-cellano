/* eslint-disable @typescript-eslint/naming-convention */
import { useState, createContext, type SetStateAction } from "react";

interface AlertasTypes {
    modo_dark_numero: string;
    set_modo_dark_numero: React.Dispatch<SetStateAction<string>>;

    modo_update_activo: boolean;
    set_modo_update_activo: React.Dispatch<SetStateAction<boolean>>;
}

export const AlertasContext = createContext<AlertasTypes>({
    modo_dark_numero: "",
    set_modo_dark_numero: () => {},

    modo_update_activo: false,
    set_modo_update_activo: () => {},
});

export const AlertasProvider = ({ children }: any): any => {
    const [modo_dark_numero, set_modo_dark_numero] = useState<string>("");
    const [modo_update_activo, set_modo_update_activo] = useState<boolean>(false);

    console.log("modo_dark_numero:", modo_dark_numero);
    console.log("modo_update_activo:", modo_update_activo);

    const valueAlertas = {
        modo_dark_numero,
        set_modo_dark_numero,

        modo_update_activo,
        set_modo_update_activo,
    };

    return (
        <AlertasContext.Provider value={valueAlertas}>
            {children}
        </AlertasContext.Provider>
    );
};
