import express from "express";
import { loginUser, registerUser, logoutUser } from "../controllers/authController.js";

const router = express.Router();

// Pages
router.get("/login", (req, res) => res.render("login", { title: "Login", success_msg: req.flash("success_msg"), error_msg: req.flash("error_msg") }));
router.get("/register", (req, res) => res.render("register", { title: "Register", success_msg: req.flash("success_msg"), error_msg: req.flash("error_msg") }));

// Actions
router.post("/login", loginUser);       // POST /auth/login
router.post("/register", registerUser); // POST /auth/register

// Logout
router.get("/logout", logoutUser);

export default router;
