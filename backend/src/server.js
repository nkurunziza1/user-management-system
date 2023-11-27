import express from "express";
import UserRoutes from "./routes/routes.js";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";

const port = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", UserRoutes);

app.listen(port, () => console.log(`Server is running on port ${port}`));

export default app;
