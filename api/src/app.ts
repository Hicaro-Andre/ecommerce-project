import dotenv from "dotenv";
dotenv.config()

import express, { Request, Response } from "express";
const app = express()

import connectDB from "./config/db";
connectDB();

import routes from "./routes/routes";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get("/", (req: Request, res: Response) => {
  res.send("Servidor está rodando")
});

app.use(routes);


export default app;
