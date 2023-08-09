import {Request, Response} from 'express';
import client from "../db/client";
import {convertToType} from "../helpers/utils";


export const createMovie = async (req: Request, res: Response) => {
    const {title, genres} = req.body
    const {userID} = req.params

    try {
        // @ts-ignore
        const newMovie = await client.movies.create({
            data: {
                title,
                genres: {
                    connect: genres.map((genre: string) => ({id: convertToType(genre)}))
                },
                User: {
                    connect: {
                        id: convertToType(userID)
                    }
                },
            }
        })


        res.status(201).send(newMovie)

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


export const removeMovieByID = async (req: Request, res: Response) => {

    const {ID} = req.params

    try {
        // @ts-ignore
        await client.movies.delete({
            where: {
                id: convertToType(ID)
            }
        })


        res.status(204).send()
    } catch (error) {
        res.status(500).send(error)
    }


}

export const getAllMovies = async (req: Request, res: Response) => {

    try {
        // @ts-ignore
        const movies = await client.movies.findMany({
            select: {
                id: true,
                title: true,
            }
        })


        res.status(200).send({data: movies})
    } catch (error) {
        res.status(500).send(error)
    }


}

export const getMovieByID = async (req: Request, res: Response) => {
    const {ID} = req.params
    try {
        // @ts-ignore
        const movies = await client.movies.findUnique({
            where: {
                id: convertToType(ID)
            },
            // include: {
            //     genres: true
            // }
        })


        res.status(200).send({data: movies})
    } catch (error) {
        res.status(500).send(error)
    }


}

