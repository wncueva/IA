import { Request, Response } from "express";
import { EmpleadoService } from "../services/empleado.service";

export class EmpleadoController {
  static async listar(_req: Request, res: Response) {
    try {
      const empleados = await EmpleadoService.listar();
      return res.json(empleados);
    } catch (e: any) {
      return res.status(500).json({
        mensaje: "Error listando empleados",
        detail: e?.message,
      });
    }
  }

  static async obtener(req: Request, res: Response) {
    try {
      const ci = (req.params.ci ?? "").trim();
      if (!ci) return res.status(400).json({ mensaje: "CI es requerido" });

      const empleado = await EmpleadoService.obtenerPorCi(ci);
      if (!empleado) return res.status(404).json({ mensaje: "Empleado no encontrado" });

      return res.json(empleado);
    } catch (e: any) {
      return res.status(500).json({
        mensaje: "Error obteniendo empleado",
        detail: e?.message,
      });
    }
  }

  static async crear(req: Request, res: Response) {
    try {
      // (Opcional) normalizar CI por si viene con espacios
      if (typeof req.body?.ci === "string") req.body.ci = req.body.ci.trim();

      const empleado = await EmpleadoService.crear(req.body);
      return res.status(201).json(empleado);
    } catch (e: any) {
      // CI duplicado
      if (e?.code === "23505") {
        return res.status(409).json({ mensaje: "Ya existe un empleado con ese CI" });
      }
      // FK inválida (por ejemplo id_a no existe en area)
      if (e?.code === "23503") {
        return res.status(400).json({
          mensaje: "Error de referencia (FK): revisa que los IDs (área/turno/break) existan",
          detail: e?.detail,
        });
      }

      return res.status(500).json({
        mensaje: "Error creando empleado",
        detail: e?.message,
      });
    }
  }

  static async actualizar(req: Request, res: Response) {
    try {
      const ci = (req.params.ci ?? "").trim();
      if (!ci) return res.status(400).json({ mensaje: "CI es requerido" });

      const actualizado = await EmpleadoService.actualizar(ci, req.body);
      if (!actualizado) return res.status(404).json({ mensaje: "Empleado no encontrado" });

      return res.json(actualizado);
    } catch (e: any) {
      if (e?.code === "23503") {
        return res.status(400).json({
          mensaje: "Error de referencia (FK): revisa que los IDs (área/turno/break) existan",
          detail: e?.detail,
        });
      }

      return res.status(500).json({
        mensaje: "Error actualizando empleado",
        detail: e?.message,
      });
    }
  }

  static async eliminar(req: Request, res: Response) {
    try {
      const ci = (req.params.ci ?? "").trim();
      if (!ci) return res.status(400).json({ mensaje: "CI es requerido" });

      const ok = await EmpleadoService.eliminar(ci);
      if (!ok) return res.status(404).json({ mensaje: "Empleado no encontrado" });

      return res.status(204).send();
    } catch (e: any) {
      return res.status(500).json({
        mensaje: "Error eliminando empleado",
        detail: e?.message,
      });
    }
  }
}
