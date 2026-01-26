import { pool } from "../config/database";
import { Empleado } from "../models/Empleado";

function mapEmpleado(row: any): Empleado {
  return {
    ci: row.ci?.trim?.() ?? row.ci,

    id_a: row.id_a,
    id_t: row.id_t,
    id_b: row.id_b,
    id_ba: row.id_ba,

    nombres: row.nombres?.trim?.() ?? row.nombres,
    apellidos: row.apellidos?.trim?.() ?? row.apellidos,
    direccion: row.direccion?.trim?.() ?? row.direccion,
    telefonos: row.telefonos?.trim?.() ?? row.telefonos,
    correo: row.correo?.trim?.() ?? row.correo,

    fecha_nacimiento: row.fecha_nacimiento,
    fecha_ingreso: row.fecha_ingreso,
    fecha_contrato: row.fecha_contrato,

    salario: row.salario !== null && row.salario !== undefined ? Number(row.salario) : 0,

    clave: row.clave?.trim?.() ?? row.clave ?? null,
  };
}

export class EmpleadoRepository {
  static async findAll(): Promise<Empleado[]> {
    const result = await pool.query(
      `SELECT
        ci, nombres, apellidos, direccion, telefonos, correo,
        fecha_nacimiento, fecha_ingreso, fecha_contrato, salario,
        id_a, id_t, id_b, id_ba, clave
      FROM empleado
      ORDER BY apellidos`
    );
    return result.rows.map(mapEmpleado);
  }

  static async findByCi(ci: string): Promise<Empleado | null> {
    const result = await pool.query(
      `SELECT
        ci, nombres, apellidos, direccion, telefonos, correo,
        fecha_nacimiento, fecha_ingreso, fecha_contrato, salario,
        id_a, id_t, id_b, id_ba, clave
      FROM empleado
      WHERE ci = $1`,
      [ci]
    );
    return result.rowCount ? mapEmpleado(result.rows[0]) : null;
  }

  static async create(data: Empleado): Promise<Empleado> {
    const result = await pool.query(
      `INSERT INTO empleado
      (ci, id_a, id_t, id_b, id_ba, nombres, apellidos, direccion, telefonos, correo,
       fecha_nacimiento, fecha_ingreso, fecha_contrato, salario, clave)
      VALUES
      ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
      RETURNING
        ci, nombres, apellidos, direccion, telefonos, correo,
        fecha_nacimiento, fecha_ingreso, fecha_contrato, salario,
        id_a, id_t, id_b, id_ba, clave`,
      [
        data.ci,
        data.id_a ?? null,
        data.id_t ?? null,
        data.id_b ?? null,
        data.id_ba ?? null,
        data.nombres,
        data.apellidos,
        data.direccion,
        data.telefonos,
        data.correo,
        data.fecha_nacimiento,
        data.fecha_ingreso,
        data.fecha_contrato,
        data.salario,
        data.clave ?? null,
      ]
    );
    return mapEmpleado(result.rows[0]);
  }

  static async update(ci: string, data: Partial<Empleado>): Promise<Empleado | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let index = 2;

    const addField = (field: string, value: any) => {
      if (value !== undefined) {
        fields.push(`${field}=$${index}`);
        values.push(value);
        index++;
      }
    };

    addField("id_a", data.id_a);
    addField("id_t", data.id_t);
    addField("id_b", data.id_b);
    addField("id_ba", data.id_ba);
    addField("nombres", data.nombres);
    addField("apellidos", data.apellidos);
    addField("direccion", data.direccion);
    addField("telefonos", data.telefonos);
    addField("correo", data.correo);
    addField("fecha_nacimiento", data.fecha_nacimiento);
    addField("fecha_ingreso", data.fecha_ingreso);
    addField("fecha_contrato", data.fecha_contrato);
    addField("salario", data.salario);
    addField("clave", data.clave);

    if (!fields.length) {
      return null;
    }

    const query = `
    UPDATE empleado
    SET ${fields.join(", ")}
    WHERE ci=$1
    RETURNING
      ci, nombres, apellidos, direccion, telefonos, correo,
      fecha_nacimiento, fecha_ingreso, fecha_contrato, salario,
      id_a, id_t, id_b, id_ba, clave
  `;

    const result = await pool.query(query, [ci, ...values]);
    return result.rowCount ? mapEmpleado(result.rows[0]) : null;
  }

  // static async remove(ci: string): Promise<boolean> {
  //   const result = await pool.query(`DELETE FROM empleado WHERE ci = $1`, [ci]);
  //   return (result.rowCount ?? 0) > 0;
  // }
}
