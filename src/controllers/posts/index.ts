import { Request, Response } from "express";
import { createPostModel, getPostsByIddModel, getPostsByUserIdModel, getPostsModel } from "../../model/posts";

export const createPost = async (req: Request, res: Response) => {
    const { image, description, name, user_id } = req.body;
    try {
        const response = await createPostModel({ description, image, name, user_id });
        if (!response) {
            res.status(401).send({ message: "Post does not created successfully" });
        }
        res.status(200).send({ message: "Post Created Successfully", success: true, result: response });
    } catch (error) {
        console.log("🚀 ~ createPost ~ error:", error);
        res.status(500).send({ message: "Server error" });
    }
};

export const getPosts = async (req: Request, res: Response) => {
    try {
        const result = await getPostsModel();
        if (!result) {
            res.status(401).send({ message: "Posts does not get Sucessfully" })
        }
        res.send({ message: "Post get sucssfully", sucess: true, result: result })
    } catch (error) {
        console.log("🚀 ~ createPost ~ error:", error);
        res.status(500).send({ message: "Server error" });
    }
}

export const getPostsByUserId = async (req: Request, res: Response) => {
    const { user_id } = req.params
    try {
        const result = await getPostsByUserIdModel(user_id)
        if (!result.length) {
            return res.status(401).send({ message: "This user have  does posts" })
        }
        res.send({ message: "Posts get sucssfully", sucess: true, result: result })
    } catch (error) {
        console.log("🚀 ~ createPost ~ error:", error);
        res.status(500).send({ message: "Server error" });
    }
}


export const getPostsById = async (req: Request, res: Response) => {
    const { id } = req.params
    try {
        const result = await getPostsByIddModel(id)
        if (!result.length) {
            return res.status(401).send({ message: "this id does not have a  post" })
        }
        res.send({ message: "Posts get sucssfully", sucess: true, result: result })
    } catch (error) {
        console.log("🚀 ~ createPost ~ error:", error);
        res.status(500).send({ message: "Server error" });
    }
}
