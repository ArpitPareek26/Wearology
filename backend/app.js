import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";

const app = express();
dotenv.config({ path: "./config/config.env" });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

connectDB();

app.use(cookieParser());
app.use("/api/users", userRoutes);

export default app;
