import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    accountType: {
      type: String,
      enum: ["buyer", "seller", "admin"],
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true, // Ensure usernames are unique
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure emails are unique
    },
    password: {
      type: String,
      required: true,
    },
    dateOfBirth: {
      type: Date, // Use Date type to store full date of birth
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"], // Enum for predefined options
    },
    phone: {
      type: String,
    },
    address: {
      streetAddress: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      postalCode: {
        type: String,
      },
      country: {
        type: String,
      },
    },
    securityQuestion: {
      type: String,
    },
    securityAnswer: {
      type: String,
    },
    profilePicture: {
      type: String, // URL or path to the profile picture
    },
    bio: {
      type: String,
    },
    buyerPreference: {
      type: String,
    },
    storeName: {
      type: String,
    },
    storeDescription: {
      type: String,
    },
    bankAccount: {
      accountNumber: {
        type: String,
      },
      routingNumber: {
        type: String,
      },
      bankName: {
        type: String,
      },
      accountHolderName: {
        type: String,
      },
    },
    // Add more fields as necessary
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
