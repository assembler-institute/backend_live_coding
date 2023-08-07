import {Router} from "express";
import {createMovie, getAllMovies, getMovieByID, removeMovieByID} from "../controllers/movies.controller";

const MoviesRouter = Router()

MoviesRouter
    .post("/:userID", createMovie)
    .get("/", getAllMovies)
    .get("/:ID", getMovieByID)
    .delete("/:ID", removeMovieByID)

export default MoviesRouter
