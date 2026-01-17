import express from "express";
import {
  register,
  loginUser,
  logout,
  getUser,
} from "../controller/authController.js";
import { isAuthenticated } from "../Middlewares/AuthMiddlewere.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.get("/logout", isAuthenticated, logout);
router.get("/me", isAuthenticated, getUser);

export default router;
