import express from "express";
import cors from "cors";
import { userRouter } from "./routes/user.js";
import { AdRouter } from "./routes/Ad.js";
import { questionRouter } from "./routes/question.js";

export const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/user", userRouter);
app.use("/Ad", AdRouter);
app.use("/question", questionRouter);