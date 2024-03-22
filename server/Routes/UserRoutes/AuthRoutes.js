import express from "express";
import { login, register, verifyToken } from "../../Controllers/Users/AuthController.js";
import sendMail from "../../Middlewares/sendEmail.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/verification/:userID/:token", verifyToken);

export default router;