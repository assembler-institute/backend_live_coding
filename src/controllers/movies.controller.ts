import {Request, Response} from 'express';
import prisma from "../db/client";
import MoviesModel from "../model/movies.model";
import UserModel from "../model/user.model";


export const createMovie = async (req: Request, res: Response) => {
    const {title, year, genres} = req.body
    const {userID} = req.params
    console.log(genres)
    try {

        const newMovie = await prisma.movies.create({
            data: {
                title,
                year,
                genres: {
                    connect: genres.map((genre: string) => ({id: genre}))
                },
                User: {
                    connect: {
                        id: userID
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

export const createMovieMongoose = async (req: Request, res: Response) => {
    const {name, genre} = req.body
    const {userID} = req.params

    try {

        const newMovie = await MoviesModel.create({
            name,
        })

        if (newMovie.genres) {
            newMovie.genres.push(genre)
        }

        await newMovie.save()

        await UserModel.findByIdAndUpdate({_id: userID}, {
            $push: {
                movies: newMovie._id
            }
        }, {new: true})


        res.status(201).send(newMovie)

    } catch (error) {
        res.status(500).send(error)
    }
}

export const removeMovieByID = async (req: Request, res: Response) => {

    const {ID} = req.params

    try {

        await prisma.movies.delete({
            where: {
                id: ID
            }
        })


        res.status(204).send()
    } catch (error) {
        res.status(500).send(error)
    }


}

export const getAllMovies = async (req: Request, res: Response) => {

    try {

        const movies = await prisma.movies.findMany({
            select: {
                id: true,
                title: true,
                year: true,
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

        const movies = await prisma.movies.findUnique({
            where: {
                id: ID
            },
            include: {
                genres: true
            }
        })


        res.status(200).send({data: movies})
    } catch (error) {
        res.status(500).send(error)
    }


}

