import { z } from "zod";

const dateYMD = z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato YYYY-MM-DD");

export const empleadoCreateSchema = z.object({
  ci: z.string().trim().min(5, "CI es requerido"),

  id_a: z.coerce.number().int().positive().nullable().optional(),
  id_t: z.coerce.number().int().positive().nullable().optional(),
  id_b: z.coerce.number().int().positive().nullable().optional(),
  id_ba: z.coerce.number().int().positive().nullable().optional(),

  nombres: z.string().trim().min(2),
  apellidos: z.string().trim().min(2),
  direccion: z.string().trim().min(3),
  telefonos: z.string().trim().min(7),
  correo: z.string().trim().email(),

  fecha_nacimiento: dateYMD,
  fecha_ingreso: dateYMD,
  fecha_contrato: dateYMD,

  salario: z.coerce.number().nonnegative(),
});

export const empleadoUpdateSchema = empleadoCreateSchema.partial().omit({ ci: true });