import express, {Express} from 'express';
import morgan from "morgan";
import UserRouter from "./routes/user.routes";
import MoviesRouter from "./routes/movies.routes";
import GenreRouter from "./routes/genres.routes";


const app: Express = express();

app.use(express.json());
app.use(morgan("dev"))


app.use("/movies", MoviesRouter)
app.use("/users", UserRouter)
app.use("/genres", GenreRouter)


// http://localhost:8080/user/
export default app;
