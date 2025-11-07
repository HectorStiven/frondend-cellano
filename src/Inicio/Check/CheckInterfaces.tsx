// Interfaz del estudiante
export interface Estudiante {
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
  fotoId?: string;
}

export const estudianteInicial: Estudiante = {
  id: 0,
  identificacion: "",
  tipo_documento: "",
  primer_nombre: "",
  segundo_nombre: "",
  primer_apellido: "",
  segundo_apellido: "",
  foto: null,
  genero: "",
  fecha_nacimiento: "",
  direccion: "",
  telefono: "",
  correo: "",
  grado: "",
  grupo: "",
  jornada: "",
  año_ingreso: 0,
  estado: false,
  creditos: "",
  creado_en: "",
  fotoId: "",
};
