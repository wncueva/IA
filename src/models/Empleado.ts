export interface Empleado {
  ci: string;

  id_a?: number | null;
  id_t?: number | null;
  id_b?: number | null;
  id_ba?: number | null;

  nombres: string;
  apellidos: string;
  direccion: string;
  telefonos: string;
  correo: string;

  fecha_nacimiento: string; // YYYY-MM-DD
  fecha_ingreso: string;    // YYYY-MM-DD
  fecha_contrato: string;   // YYYY-MM-DD

  salario: number;


  clave?: string | null;
}
