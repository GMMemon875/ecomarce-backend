import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { createTables } from "./utils/createTables.js";
import { errorMidleware } from "./Middlewares/errorMiddlewares.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use(cookieParser());

app.use(
  fileUpload({
    tempFileDir: "/.upload/",
    useTempFiles: true,
  })
);

createTables();
app.use(errorMidleware);

// Routes (yahan routes import karo agar hun)
/// import userRoutes from "./routes/userRoutes.js";
// app.use("/api/v1", userRoutes);

export default app;
