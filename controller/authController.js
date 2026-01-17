import ErrorHandler from "../Middlewares/errorMiddlewares.js";
import { catchAsyncErrors } from "../Middlewares/catchAsyncError.js";
import database from "../database/db.js";
import bcrypt from "bcryptjs";
import { sendToken } from "../utils/jwtToken.js";

/* ================= REGISTER ================= */
export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  // validation
  if (!name || !email || !password) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  //  email format validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return next(new ErrorHandler("Please enter a valid email address", 400));
  }
  // check already registered
  const isAlreadyRegistred = await database.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  if (isAlreadyRegistred.rows.length > 0) {
    return next(new ErrorHandler("User already Regitread for this email", 400));
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // insert user (PostgreSQL)
  const user = await database.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email",
    [name, email, hashedPassword]
  );

  // send token
  sendToken(user.rows[0], 201, "User registered successfully", res);
});

/* ================= LOGIN ================= */
export const loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required", 400));
  }

  const user = await database.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (user.rows.length === 0) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  const isPasswordMatched = await bcrypt.compare(
    password,
    user.rows[0].password
  );

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  sendToken(user.rows[0], 200, "Login successful", res);
});

/* ================= LOGOUT ================= */
export const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

/* ================= GET USER ================= */
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const { user } = req;
  res.status(200).json({
    success: true,
    user,
  });
});
