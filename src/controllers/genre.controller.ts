import {Request, Response} from "express";
import prisma from "../db/client";


export const createGenre = async (req: Request, res: Response) => {
    const {name} = req.body

    try {

        const newGenre = await prisma.genres.create({
            data: {
                name
            }
        })

        res.status(201).send(newGenre)

    } catch (error) {
        res.status(500).send(error)
    }
}


export const getAllGenres = async (req: Request, res: Response) => {

    try {

        const allGenres = await prisma.genres.findMany()


        res.status(201).send(allGenres)

    } catch (error) {
        res.status(500).send(error)
    }
}
