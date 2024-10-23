import { Router } from "express";
import { authUser, createUser, deleteUser, getAllUsers, getUser, updateUser } from "../service/userCrud.js";

export const router = Router()

router.get('/get-user/:id', getUser)
router.get('/get-all', getAllUsers)
router.post('/create-user', createUser)
router.put('/update-user' ,updateUser)
router.delete('/delete-user', authUser, deleteUser)