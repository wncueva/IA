import { Empleado } from "../models/Empleado";
import { EmpleadoRepository } from "../repositories/empleado.repository";

export class EmpleadoService {
  static listar(): Promise<Empleado[]> {
    return EmpleadoRepository.findAll();
  }

  static obtenerPorCi(ci: string): Promise<Empleado | null> {
    return EmpleadoRepository.findByCi(ci);
  }

  static crear(data: Empleado): Promise<Empleado> {
    return EmpleadoRepository.create(data);
  }

  static actualizar(ci: string, data: Empleado): Promise<Empleado | null> {
    return EmpleadoRepository.update(ci, data);
  }

  // static eliminar(ci: string): Promise<boolean> {
  //   return EmpleadoRepository.remove(ci);
  // }
}
