import { Router } from "express";
import { EmpleadoController } from "../controllers/empleado.controller";
import { validate } from "../middlewares/validate";
import {
  empleadoCreateSchema,
  empleadoUpdateSchema,
} from "../validation/empleado.schema";

const router = Router();

router.get("/", EmpleadoController.listar);
router.get("/:ci", EmpleadoController.obtener);

router.post(
  "/",
  validate(empleadoCreateSchema),
  EmpleadoController.crear
);

router.put(
  "/:ci",
  validate(empleadoUpdateSchema),
  EmpleadoController.actualizar
);

export default router;
