import pool from "../db";
import { User } from "../types/user";
import { createUserQuery, loginUser } from "../queries/user"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const createUserModel = async (user: User) => {
    const { username, password, phoneNumber, email } = user;
    const password_hash = await bcrypt.hash(password!, 10);

    try {
        const result = await pool.query(createUserQuery, [
            username,
            email,
            password_hash,
            phoneNumber
        ]);
        return result.rows[0];
    } catch (error) {
        throw error;
    }
}

export const loginUserModel = async (user: User) => {
    try {
        const { email, password } = user;
        const result = await pool.query(loginUser, [email]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            const userId = user.user_id;
            const username = user.username;
            const email = user.email;
            const match = await bcrypt.compare(password!, user.password);
            if (match) {
                if (!"dev") throw new Error("JWT secret key not defined");
                const token = jwt.sign({ id: userId }, "dev", {
                    expiresIn: "1h",
                });
                return { flag: 200, token, userId, username, email };
            } else {
                return { flag: 401 };
            }
        } else {
            return { flag: 404 };
        }
    } catch (error) {
        throw error;
    }
}


export const getUserDetails = async (user_id: number) => {
    try {
        const result = await pool.query("SELECT username, email FROM users WHERE user_id = $1", [user_id]);

        return result.rows[0];
    } catch (error) {
        throw error;
    }
};