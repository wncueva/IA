import { Router } from "express";
import { EmpleadoController } from "../controllers/empleado.controller";

const router = Router();

router.get("/", EmpleadoController.listar);
router.get("/:ci", EmpleadoController.obtener);
router.post("/", EmpleadoController.crear);
router.put("/:ci", EmpleadoController.actualizar);
// router.delete("/:ci", EmpleadoController.eliminar);

export default router;
