import express from "express";
import {
  register,
  loginUser,
  logout,
  getUser,
} from "../controller/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", loginUser);
router.get("/logout", logout);
router.get("/me", getUser);

export default router;
