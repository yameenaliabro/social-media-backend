import pool from "../db"
import uploadImage from "../helpers/uploadImageCloudinary"
import { createPostquery, getPostsQuery, getPostsbyIdQuery, getPostsbyUserIdQuery } from "../queries/posts"
import { createPost } from "../types/posts"
import { getUserDetails } from "./user"

export const createPostModel = async (post: createPost) => {
    const { description, image, name, user_id } = post;
    const user = await getUserDetails(user_id);

    if (!user) {
        throw new Error("User not found");
    }

    const { username, email } = user;

    const cloudImageUrl = await uploadImage(image);

    try {
        const response = await pool.query(createPostquery, [
            name,
            description,
            user_id,
            cloudImageUrl,
            username,
            email
        ]);

        return response.rows;
    } catch (error) {
        throw error;
    }
};

export const getPostsModel = async () => {
    try {
        const result = await pool.query(getPostsQuery);
        return result.rows;
    } catch (error) {
        throw error
    }
}
export const getPostsByUserIdModel = async (user_id: string) => {
    try {
        const result = await pool.query(getPostsbyUserIdQuery, [user_id]);
        return result.rows;
    } catch (error) {
        throw error
    }
}
export const getPostsByIddModel = async (id: string) => {
    try {
        const result = await pool.query(getPostsbyIdQuery, [id]);
        return result.rows;
    } catch (error) {
        throw error
    }
}

