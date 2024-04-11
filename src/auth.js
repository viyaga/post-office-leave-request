import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { connectDB } from "@/lib/actions";
import { Admin, Employee } from "@/lib/models";
import bcrypt from "bcrypt";
import { z } from "zod";

const login = async (credentials) => {
	const { email, employeeId, password, subdivisionName } = credentials

	try {
		connectDB();

		if (email && subdivisionName) {
			const admin = await Admin.findOne({ email, subdivisionName }).select(['password', 'subdivisionName'])
			if (!admin) return null

			const isPasswordCorrect = await bcrypt.compare(password, admin.password);
			if (!isPasswordCorrect) return null

			return admin;
		}

		const employee = await Employee.findOne({ employeeId });
		if (!employee) return null

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) return null

		return { user };
	} catch (err) {
		return null;
	}
};

export const { signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [
		CredentialsProvider({
			async authorize(credentials) {

				let parsedCredentials = z.object({
					email: z.string().email().min(1).max(75),
					password: z.string().min(6).max(20),
					subdivisionName: z.string().min(1).max(75)
				}).safeParse(credentials);

				// if not admin
				if (!credentials.email && !credentials.subdivisionName) {

					parsedCredentials = z.object({
						employeeId: z.string().min(4).max(10),
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

				if(token.subdivisionName) {
					session.user.subdivisionName = token.subdivisionName;
					session.user.isAdmin  = token.isAdmin
				}
				
			}
			return session;
		},
	},
});
