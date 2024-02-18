import express from "express";
import { createUser, loginUser } from "../controllers/auth/user";
const userroutes = express.Router();

userroutes.post("/create", createUser);
userroutes.post("/login", loginUser);

export default userroutes;