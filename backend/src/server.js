import express from "express";
import mongoose from "mongoose";
import UserRoutes from "./routes/userRoutes.js";
import TaskRoutes from "./routes/taskRoutes.js";
import ProjectRoutes from "./routes/projectRoutes.js"
import "dotenv/config";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from 'morgan';
import adminSeeder from "./seeder/adminSeeder.js";


const port = process.env.PORT || 5000;
const connect = () => {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("connected to db"))
      .then(()=>{
        adminSeeder();
        app.use(express.json());
      })
      .catch((err) => {
        throw err;
      });
  };
  connect();
const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: '10mb' })); 
app.use(express.json());
app.use(cors());
app.use("/api", UserRoutes);
app.use("/api/task", TaskRoutes);
app.use("/api/project", ProjectRoutes);


app.listen(port, () => console.log(`Server is running on port ${port}`));

export default app;
