import {Router} from "express";
import {createGenre, getAllGenres} from "../controllers/genre.controller";

const GenreRouter = Router()

GenreRouter
    .post("/", createGenre)
    .get("/", getAllGenres)


export default GenreRouter
