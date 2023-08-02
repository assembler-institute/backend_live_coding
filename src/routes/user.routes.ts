import {Router} from "express";
import {createUser, deleteUserByID, getAllUsers, getUserById, updateUserName} from "../controllers/user.controller";

const UserRouter = Router()

UserRouter
    .post("/", createUser)
    .get("/", getAllUsers)
    .get("/:userId", getUserById)
    .put("/:userId", updateUserName)
    .delete("/:userId", deleteUserByID)


export default UserRouter
