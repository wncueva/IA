import express from "express";
import cors from "cors";
import empleadoRoutes from "./routes/empleado.routes";

const app = express();

app.use(cors());
app.use(express.json());


app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.use("/api/empleados", empleadoRoutes);

export default app;
