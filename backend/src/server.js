import express from "express";
import cors from "cors";
import sequelize from "./config/database.js";
import planRoutes from "./routes/planRoutes.js";

const app = express();

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json());
app.use("/api", planRoutes);

// health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, status: 'ok' });
});

await sequelize.sync();

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Backend działa na porcie ${PORT}`);
});