"use server"

import mongoose from "mongoose";
import { genSalt, hash } from "bcrypt";
import { signIn } from "@/auth";
import { Admin } from "../models";

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
const registerAdmin = async (name, email, password, subDivisionName) => {

    try {
        await connectDB()
        const isExisiting = await Admin.findOne({ email })
        if (isExisiting) return { error: "Email Already Registered" }

        const salt = await genSalt(10)
        const hashedPassword = await hash(password, salt)

        await Admin.create({ name, email, password: hashedPassword, subDivisionName })
        return { success: "Registration successfull" }
    } catch (error) {
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

export { connectDB, registerAdmin, loginUser }