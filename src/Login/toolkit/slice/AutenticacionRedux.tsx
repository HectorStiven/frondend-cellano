import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface EstudianteInfo {
  id: number;
  identificacion: string;
  tipo_documento: string;
  primer_nombre: string;
  segundo_nombre: string;
  primer_apellido: string;
  segundo_apellido: string;
  foto: string | null;
  genero: string;
  fecha_nacimiento: string;
  direccion: string;
  telefono: string;
  correo: string;
  grado: string;
  grupo: string;
  jornada: string;
  año_ingreso: number;
  estado: boolean;
  creditos: string;
  creado_en: string;
  fotoId: string | null;
}

interface AuthState {
  token: string | null;
  nombreUsuario: string | null;
  tipoUsuario: string | null;
  access: boolean;
  userId: number | null;
  estudiante_id: number | null;
  estudiante_info: EstudianteInfo | null;
}

const initialState: AuthState = {
  token: null,
  nombreUsuario: null,
  tipoUsuario: null,
  access: false,
  userId: null,
  estudiante_id: null,
  estudiante_info: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // ✅ Guardar token e información completa del usuario
    setAuthData: (
      state: AuthState,
      action: PayloadAction<{
        token: string;
        data: {
          id: number;
          username: string;
          rol: string;
          estudiante: number;
          estudiante_info: EstudianteInfo;
        };
      }>
    ) => {
      state.token = action.payload.token;
      state.nombreUsuario = action.payload.data.username;
      state.tipoUsuario = action.payload.data.rol;
      state.userId = action.payload.data.id;
      state.estudiante_id = action.payload.data.estudiante;
      state.estudiante_info = action.payload.data.estudiante_info;
      state.access = true;
    },

    // 🚪 Cerrar sesión
    clearAuthData: (state: AuthState) => {
      state.token = null;
      state.nombreUsuario = null;
      state.tipoUsuario = null;
      state.access = false;
      state.userId = null;
      state.estudiante_id = null;
      state.estudiante_info = null;
    },

    // 🔄 Cambiar acceso manualmente
    setAccess: (state: AuthState, action: PayloadAction<boolean>) => {
      state.access = action.payload;
    },
  },
});

export const { setAuthData, clearAuthData, setAccess } = authSlice.actions;
export default authSlice.reducer;
