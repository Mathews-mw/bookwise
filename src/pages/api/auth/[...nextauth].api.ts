import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
			authorization: {
				params: {
					scope: 'https://www.googleapis.com/auth/userinfo.email',
				},
			},
		}),
		// ...add more providers here
	],

	callbacks: {
		async signIn({ account }) {
			if (!account?.scope?.includes('https://www.googleapis.com/auth/userinfo.email')) {
				return 'http://localhost:3000?error=permissions';
			}

			return true;
		},
	},
};

export default NextAuth(authOptions);
