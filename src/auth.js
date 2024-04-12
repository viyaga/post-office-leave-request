import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { connectDB } from "@/lib/actions";
import { Admin, Employee } from "@/lib/models";
import bcrypt from "bcrypt";
import { z } from "zod";

const login = async (credentials) => {
	const { userName, password, subdivisionName } = credentials
	try {
		await connectDB();

		if (subdivisionName) {
			const admin = await Admin.findOne({ email: userName, subdivisionName }).select(['name', 'password', 'subdivisionName'])
			if (!admin) return null

			const isPasswordCorrect = await bcrypt.compare(password, admin.password);
			if (!isPasswordCorrect) return null

			return admin;
		}

		const employee = await Employee.findOne({ $or: [{ employeeId: userName }, { accountNo: userName }] }).select(['name']);

		if (!employee) return null

		const isPasswordCorrect = password === 'Doplm@123';
		if (!isPasswordCorrect) return null
		return employee;
	} catch (err) {
		return null;
	}
};

export const { signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [
		CredentialsProvider({
			async authorize(credentials) {

				let parsedCredentials = null

				// if admin
				if (credentials.subdivisionName) {
					parsedCredentials = z.object({
						userName: z.string().email().min(4).max(75),
						password: z.string().min(6).max(20),
						subdivisionName: z.string().min(1).max(75)
					}).safeParse(credentials);
				} else {
					parsedCredentials = z.object({
						userName: z.string().min(4).max(20),
						password: z.string().min(6).max(20),
					}).safeParse(credentials);
				}

				if (parsedCredentials?.success) {
					const user = await login(credentials);
					return user;
				}

				return null
			},
		}),
	],
	session: {
		strategy: "jwt",
		maxAge: 60 * 60 * 24 * 1000
	},
	// ADD ADDITIONAL INFORMATION TO SESSION
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.userId = user._id;

				if (user.subdivisionName) {
					token.subdivisionName = user.subdivisionName;
					token.isAdmin = true;
				}
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.userId = token.userId;

				if (token.subdivisionName) {
					session.user.subdivisionName = token.subdivisionName;
					session.user.isAdmin = token.isAdmin
				}

			}
			return session;
		},
	},
});
