import express, { Router } from "express";
import { signup, signin } from "../controllers/auth.controller.js";

const router = Router();

// signup route
router.route("/sign-up").post(signup);

// signin route
router.route("/sign-in").post(signin);

export default router;
