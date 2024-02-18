import dotenv from "dotenv";
import express from "express";
import { PORT } from "./config";
import userroutes from "./routes/user";
import postroutes from "./routes/posts";
import cors from "cors"
const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use("/user", userroutes)
app.use("/post", postroutes)

app.listen(PORT, () => {
    console.log("Server Started on", PORT)
})