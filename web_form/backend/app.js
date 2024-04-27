import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { AdRouter } from "./routes/Ad.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/user", userRouter);
app.use("/Ad", AdRouter);