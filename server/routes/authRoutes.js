import express from "express";
import passport from "passport";
import {
  signup,
  verifyEmail,
  login,
  logout,
  resendOTP,
  resetPassword,
  forgotPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Local signup routes
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);

router.post("/login", login);

router.post("/logout", logout);

router.post("/forgot-password", forgotPassword);

router.post("/resend-otp", resendOTP);

router.post("/reset-password", resetPassword);

// Comment out or remove OAuth routes
/*
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    // Successful authentication, redirect or send a response
    res.redirect("/profile"); // Or send JWT token in the response
  }
);

router.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    session: false,
    failureRedirect: "/login",
  }),
  (req, res) => {
    // Successful authentication, redirect or send a response
    res.redirect("/profile"); // Or send JWT token in the response
  }
);
*/

export default router;
