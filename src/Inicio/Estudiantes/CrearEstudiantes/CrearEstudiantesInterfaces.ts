export interface Grado {
  id: number;
  nombre_grado: string;
  salon: string;
  valor: number;
}

export interface GradosResponse {
  success: boolean;
  detail: string;
  data: Grado[];
}


export interface EstudiantesForm {
  identificacion: string;
  tipo_documento: string;
  primer_nombre: string;
  segundo_nombre?: string;
  primer_apellido: string;
  segundo_apellido?: string;
  genero: string;
  fecha_nacimiento: string;
  direccion: string;
  telefono: string;
  correo?: string;
  grado: string;
  grupo: string;
  jornada: string;
  año_ingreso: number;
  fotoId?: File | null;
}

export const initialFormState: EstudiantesForm = {
  identificacion: "",
  tipo_documento: "",
  primer_nombre: "",
  segundo_nombre: "",
  primer_apellido: "",
  segundo_apellido: "",
  genero: "",
  fecha_nacimiento: "",
  direccion: "",
  telefono: "",
  correo: "",
  grado: "",
  grupo: "",
  jornada: "",
  año_ingreso: new Date().getFullYear(),
  fotoId: null,
};