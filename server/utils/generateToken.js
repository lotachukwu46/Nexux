import jwt from "jsonwebtoken";

// Utility function to generate JWT
const generateJWT = (payload, expiresIn = "15d") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

// Utility function to set a secure cookie
const setCookie = (res, token, cookieOptions = {}) => {
  const defaultOptions = {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days in ms
    httpOnly: true, // prevents XSS attacks
    sameSite: "strict", // prevents CSRF attacks
    secure: process.env.NODE_ENV !== "development", // use secure cookies in production
  };

  const options = { ...defaultOptions, ...cookieOptions };

  res.cookie("jwt", token, options);
};

// Combined function to generate token and set cookie
const generateTokenAndSetCookie = (
  userId,
  res,
  rememberMe = false,
  tokenOptions = {},
  cookieOptions = {}
) => {
  // Set expiration based on "Remember Me" option
  const tokenExpiry = rememberMe ? "30d" : "15d";
  const cookieMaxAge = rememberMe
    ? 30 * 24 * 60 * 60 * 1000 // 30 days in ms
    : 15 * 24 * 60 * 60 * 1000; // 15 days in ms

  const payload = { userId, ...tokenOptions };
  const token = generateJWT(payload, tokenExpiry);

  // Include custom maxAge for the cookie if "Remember Me" is checked
  setCookie(res, token, { ...cookieOptions, maxAge: cookieMaxAge });
};

export default generateTokenAndSetCookie;
