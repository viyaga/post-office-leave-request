import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "@/auth.config";
import { connectDB } from "@/lib/actions";
import { User } from "@/lib/models";
// import bcrypt from "bcrypt";
import { z } from "zod";

const login = async (credentials) => {
	const { email, password } = credentials

	try {
		connectDB();
		const user = await User.findOne({ email });
		if (!user) return null

		const isPasswordCorrect = await bcrypt.compare(password, user.password);
		if (!isPasswordCorrect) return null

		return user;
	} catch (err) {
		return null;
	}
};

export const { signIn, signOut, auth } = NextAuth({
	...authConfig,
	providers: [
		CredentialsProvider({
			async authorize(credentials) {
				const parsedCredentials = z
					.object({ email: z.string().email(), password: z.string().min(4) })
					.safeParse(credentials);

				if (parsedCredentials?.success) {
					const user = await login(credentials);
					console.log({ user, input: "Valid Input" });
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
