import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateOTP, verifyOTP, sendEmail } from "../utils/emailUtils.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";

let temporaryOTPStore = {};

const checkUserExists = async (email) => {
  const user = await User.findOne({ email });
  return user !== null;
};

// Utility function to store OTP
const storeOTP = (email, otp) => {
  temporaryOTPStore[email] = { otp, expiresAt: Date.now() + 10 * 60 * 1000 }; // OTP valid for 10 minutes
};

// Utility function to clear OTP
const clearOTP = (email) => {
  delete temporaryOTPStore[email];
};

// Utility function to resend OTP
export const resendOTP = async (email, res) => {
  try {
    const storedOTP = temporaryOTPStore[email];

    if (storedOTP) {
      const timeElapsed = Date.now() - (storedOTP.lastResendTime || 0);
      const cooldownPeriod = 2 * 60 * 1000; // 2 minutes in milliseconds

      // Check if 2 minutes have passed since the last resend
      if (timeElapsed < cooldownPeriod) {
        const remainingTime = Math.ceil((cooldownPeriod - timeElapsed) / 1000);
        return res.status(400).json({
          message: `Please wait ${remainingTime} seconds before requesting a new OTP.`,
        });
      }

      // Clear the previous OTP if cooldown period has passed
      clearOTP(email);
    }

    // Generate a new OTP and store it
    const newOtp = generateOTP();
    storeOTP(email, newOtp);

    // Update the last resend time
    temporaryOTPStore[email].lastResendTime = Date.now();

    // Send the new OTP to the user's email
    await sendEmail(
      email,
      "Your OTP Code",
      `Your OTP code is ${newOtp}. It is valid for 10 minutes.`
    );

    return res.status(200).json({ message: "OTP resent to your email" });
  } catch (error) {
    console.error("Error in resendOTP function", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;

    // Validate input fields
    if (!email || !password || !confirmPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Check if the user already exists
    if (await checkUserExists(email)) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Generate and store OTP
    const otp = generateOTP();
    storeOTP(email, otp);

    // Send OTP to user's email
    await sendEmail(
      email,
      "Your OTP Code",
      `Your OTP code is ${otp}. It is valid for 10 minutes.`
    );

    return res
      .status(200)
      .json({ message: "OTP sent to your email. Please verify." });
  } catch (error) {
    console.error("Error in signup controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const {
      email,
      otp,
      password,
      accountType,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      username,
    } = req.body;

    // Validate required fields
    if (!email || !otp || !password || !username) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if OTP exists and is valid
    const storedOTP = temporaryOTPStore[email];
    if (!storedOTP || storedOTP.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired or invalid" });
    }

    if (!verifyOTP(otp, storedOTP.otp)) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user after successful OTP verification
    const user = new User({
      email,
      password: hashedPassword,
      accountType,
      firstName,
      lastName,
      dateOfBirth,
      gender,
      username,
    });

    await user.save();

    // Clear the OTP from the store after successful verification
    clearOTP(email);

    // Generate JWT token
    const userId = user._id;
    generateTokenAndSetCookie(userId, res);

    // Respond with user details and JWT
    return res.status(201).json({
      message: "User created successfully",
      user: {
        _id: user._id,
        firstName: user.firstName,
        username: user.username,
        profilePic: user.profilePic,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error("Error in verifyEmail controller", error.message);
    return res.status(500).json({ message: "Error creating user" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token and set cookie with "Remember Me" option
    const userId = user._id;
    generateTokenAndSetCookie(userId, res, rememberMe);

    // Respond with user details and JWT
    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        firstName: user.firstName,
        username: user.username,
        profilePic: user.profilePic,
        gender: user.gender,
      },
    });
  } catch (error) {
    console.error("Error in login controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    // Clear the JWT cookie
    res.clearCookie("jwt", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Set to true if in production
      sameSite: "Strict",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error in logout controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email, username, firstName, lastName, securityAnswer } = req.body;

    // Validate input fields
    if (!email || !username || !firstName || !lastName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Find the user
    const user = await User.findOne({ email, username, firstName, lastName });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // If the user has a security question set up
    if (user.securityQuestion && user.securityAnswer) {
      if (securityAnswer !== user.securityAnswer) {
        return res.status(400).json({ message: "Incorrect Answer" });
      }
    }

    // Resend OTP logic
    return await resendOTP(email, res);
  } catch (error) {
    console.error("Error in forgotPassword controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword, logoutAllDevices } = req.body;

    // Validate input fields
    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check OTP validity
    const storedOTP = temporaryOTPStore[email];
    if (
      !storedOTP ||
      storedOTP.expiresAt < Date.now() ||
      storedOTP.otp !== otp
    ) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    // Validate password strength
    if (newPassword.length < 8) {
      return res
        .status(400)
        .json({ message: "Password must be at least 8 characters long" });
    }

    // Find user and update password
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    if (logoutAllDevices) {
      // Extract the current token from the request header
      const currentToken = req.headers["authorization"]?.split(" ")[1]; // Assuming Bearer token
      if (currentToken) {
        // Remove all tokens except the current one
        user.tokens = user.tokens.filter((token) => token === currentToken);
      } else {
        // If no token found, clear all tokens
        user.tokens = [];
      }
    }

    await user.save();
    clearOTP(email);

    // Generate a new token for the current session
    generateTokenAndSetCookie(user._id, res);

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword controller", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
