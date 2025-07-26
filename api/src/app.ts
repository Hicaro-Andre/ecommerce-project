//todo: all feature imports
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import connectDB from "./config/db";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger.json";
import routes from "./routes/routes";


//todo: starts the feature
//dotenv
dotenv.config()

//express
const app = express()

//database
connectDB();

//cors : configurado para aceitar apenas o front-end
// const allowedOrigins = ["http://localhost:5173"];

app.use(cors({
  // origin: function (origin, callback) {
  //   if (!origin || allowedOrigins.includes(origin)) {
  //     callback(null, true);
  //   } else {
  //     callback(new Error("Not allowed by CORS"));
  //   }
  // },
  // credentials: true
}));

app.use(express.json());

//swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

//routes
app.use(routes);
app.get("/", (req: Request, res: Response) => {
  res.send("Servidor está rodando")
});


export default app;
