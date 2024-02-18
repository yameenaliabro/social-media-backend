import express from "express";
import { createPost, getPosts, getPostsById, getPostsByUserId } from "../controllers/posts";
const postroutes = express.Router();

postroutes.get("/get", getPosts)
postroutes.get("/getuser/:user_id", getPostsByUserId)
postroutes.get("/get/:id", getPostsById)
postroutes.post("/create", createPost)

export default postroutes