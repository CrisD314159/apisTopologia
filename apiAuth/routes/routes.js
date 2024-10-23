import { Router } from "express";
import { login } from "../service/loginService.js";

export const router = Router();

router.post("/login", login)


