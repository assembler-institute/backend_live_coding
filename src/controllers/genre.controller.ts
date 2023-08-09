import {Request, Response} from "express";
import client from "../db/client";


export const createGenre = async (req: Request, res: Response) => {
    const {name} = req.body

    try {
        // @ts-ignore
        const newGenre = await client.genres.create({
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
        // @ts-ignore
        const allGenres = await client.genres.findMany()


        res.status(201).send(allGenres)

    } catch (error) {
        res.status(500).send(error)
    }
}
