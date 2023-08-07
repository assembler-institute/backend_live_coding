import {Request, Response} from 'express';
import prisma from "../db/client";
import UserModel from "../model/user.model";

export const createUser = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    try {

        if (!name || !email || !password) {
            res.status(400).json({error: "Missing required fields"});
            return;
        }

        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                password
            }
        })

        res.status(201).json(newUser);

    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

export const getAllUsers = async (req: Request, res: Response) => {
    try {

        const allUsers = await prisma.user.findMany()

        res.status(201).json(allUsers);

    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const {userId} = req.params;
    try {

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            include: {
                movies: {
                    include: {
                        genres: true
                    }
                }
            }

        })
        console.log(user)
        res.status(201).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

export const getUserByIdMongoose = async (req: Request, res: Response) => {
    const {userId} = req.params;
    try {

        const user = await UserModel.findById(userId).populate({
            path: "movies",
            populate: {
                path: "genres"
            }
        })

        res.status(201).json(user);
    } catch (error) {
        console.log(error)
        res.status(500).json(error);
    }
}

export const updateUserName = async (req: Request, res: Response) => {
    const {userId} = req.params;
    const {name, email} = req.body;
    try {

        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                name,
                email
            }
        })

        res.status(201).json(user);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteUserByID = async (req: Request, res: Response) => {
    const {userId} = req.params;
    try {

        await prisma.user.delete({
            where: {
                id: userId
            }
        })

        res.status(204).json();
    } catch (error) {
        res.status(500).json(error);
    }
}
