import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  nombreUsuario: string | null;
  tipoUsuario: string | null;
  access: boolean;
}

const initialState: AuthState = {
  token: null,
  nombreUsuario: null,
  access: false,
  tipoUsuario: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // 🔑 Guardar token y nombre
    setAuthData: (
      state: AuthState,
      action: PayloadAction<{ token: string; nombreUsuario: string, tipoUsuario: string ,access: boolean}>
    ) => {
      state.token = action.payload.token;
      state.nombreUsuario = action.payload.nombreUsuario;
      state.access = true;
      state.tipoUsuario = action.payload.tipoUsuario;
    },

    // 🚪 Cerrar sesión
    clearAuthData: (state: AuthState) => {
      state.token = null;
      state.nombreUsuario = null;
      state.access = false;
      state.tipoUsuario = null;
    },

    // 🔄 Cambiar acceso manualmente (opcional)
    setAccess: (state: AuthState, action: PayloadAction<boolean>) => {
      state.access = action.payload;
    },
  },
});

export const { setAuthData, clearAuthData, setAccess } = authSlice.actions;
export default authSlice.reducer;
