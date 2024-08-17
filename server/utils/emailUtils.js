import crypto from "crypto";
import nodemailer from "nodemailer";

export const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

export const sendEmail = async (to, subject, text) => {
  try {
    // Set up the transporter using your email service
    let transporter = nodemailer.createTransport({
      service: "Gmail", // Use your email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send the email
    await transporter.sendMail({
      from: `"Nexux Team" <${process.env.EMAIL_USER}>`, // Sender address
      to: to, // List of receivers
      subject: subject, // Subject line
      text: text, // Plain text body
    });
  } catch (error) {
    console.log(error);
    throw new Error("Error sending OTP");
  }
};

export const verifyOTP = (inputOTP, storedOTP) => {
  return inputOTP === storedOTP;
};
