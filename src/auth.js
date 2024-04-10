import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { connectDB } from "@/lib/actions";
import { Admin, Employee } from "@/lib/models";
import bcrypt from "bcrypt";
import { z } from "zod";

const login = async (credentials) => {
	const { email, employeeId, password, subDivisionName } = credentials

	try {
		connectDB();

		if (email && subDivisionName) {
			const admin = await Admin.findOne({ email, subDivisionName }).select(['email', 'password', 'subDivisionName'])
			if (!admin) return null

			const isPasswordCorrect = await bcrypt.compare(password, admin.password);
			if (!isPasswordCorrect) return null

			admin.isAdmin = true

			return { admin };
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

				let parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(4).max(16), subDivisionName: z.string().min(1).max(50) })
					.safeParse(credentials);

				if (!credentials?.isAdmin) {
					parsedCredentials = z
						.object({ employeeId: z.string().min(4).max(10), password: z.string().min(4).max(16) })
						.safeParse(credentials);
				}


				if (parsedCredentials?.success) {
					const data = await login(credentials);
					console.log({ data, input: "Valid Input" });
					//return user;
				}

				return null
			},
		}),
	],
	// ADD ADDITIONAL INFORMATION TO SESSION
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.username = user.username;
				token.img = user.img;
			}
			return token;
		},
		async session({ session, token }) {
			if (token) {
				session.user.username = token.username;
				session.user.img = token.img;
			}
			return session;
		},
	},
});
