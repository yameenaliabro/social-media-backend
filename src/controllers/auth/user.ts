import { Request, Response } from "express";
import { createUserModel, loginUserModel } from "../../model/user";

export const createUser = async (req: Request, res: Response) => {
    const { username, email, password, phoneNumber } = req.body;
    try {
        const user = await createUserModel({
            email,
            password,
            phoneNumber,
            username
        })
        if (!user) {
            res.status(401).send({ message: "User does not created sucessfully" })
        }
        res.send({ message: "User Created Sucessfully", user: user })
    } catch (error) {
        res.status(500).send({ message: "Server error" })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await loginUserModel({
            email,
            password,
        });

        if (user.flag == 404) {
            return res.status(404).send({ message: 'User not found.' });
        }

        if (user.flag == 401) {
            return res.status(401).send({ message: 'Incorrect email or password.' });
        }

        return res.status(200).json({
            message: 'User logged in successfully',
            success: true,
            user: user,
        });

    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).send({ message: 'Server error' });
    }
};