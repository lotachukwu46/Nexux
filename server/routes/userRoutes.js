import express from "express";
import passport from "passport";
import { getUserProfile } from "../controllers/user.controller.js";

const router = express.Router();

/*
// Protected route to get user profile
router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  getUserProfile
);*/

export default router;
