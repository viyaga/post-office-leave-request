"use server"

import mongoose from "mongoose";
// import { genSalt, hash } from "bcrypt";
import { User } from "../models";
import { signIn } from "@/auth";

// connect DB =======================================================
const connectDB = async () => {
    const connection = {};
    try {
        if (connection.isConnected) return;
        const db = await mongoose.connect(process.env.MONGO_URI);
        connection.isConnected = db.connections[0].readyState;
    } catch (error) {
        console.log(error)
        throw new Error(error);
    }
};

// register user ==========================================
const registerUser = async (email, password) => {

    try {
        connectDB()
        const isExisiting = await User.findOne({ email })
        if (isExisiting) return { error: "Email Already Registered" }

        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)

        await User.create({ email, password: hashedPassword })
        return { success: "Registration successfull" }
    } catch (error) {
        console.log({ error });
        return { error: "An error occurred, try after sometime" }
    }
}

// login User =========================================================
const loginUser = async (email, password) => {

    try {
        await signIn("credentials", { email, password, redirect: false });
        return { success: "Login successfull" }
    } catch (err) {
        return { error: "Wrong Credentials!" }
    }
};

export { connectDB, registerUser, loginUser }