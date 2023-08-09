import {Request, Response} from 'express';
import client from "../db/client";
import {convertToType} from "../helpers/utils";

export const createUser = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    try {

        if (!name || !email || !password) {
            res.status(400).json({error: "Missing required fields"});
            return;
        }

        // @ts-ignore
        const newUser: UserCreateArgs = await client.user.create({
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
        // @ts-ignore
        const allUsers = await client.user.findMany()

        res.status(201).json(allUsers);

    } catch (error) {
        res.status(500).json(error);
    }
}

export const getUserById = async (req: Request, res: Response) => {
    const {userId} = req.params;

    try {
        // @ts-ignore
        const user = await client.user.findUnique({
            where: {
                id: convertToType(userId)
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


export const updateUserName = async (req: Request, res: Response) => {
    const {userId} = req.params;
    const {name, email} = req.body;

    console.log(userId, name, email)
    try {
        // @ts-ignore
        const user = await client.user.update({
            where: {
                id: convertToType(userId)
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
        // @ts-ignore
        await client.user.delete({
            where: {
                id: convertToType(userId)
            }
        })

        res.status(204).json();
    } catch (error) {
        res.status(500).json(error);
    }
}
