import { PrismaAdapter } from '@/lib/nextAuth/prisma-adapter';
import { NextApiRequest, NextApiResponse, NextPageContext } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google';
import GitHubProvider, { GithubProfile } from 'next-auth/providers/github';

export function buildNextAuthOptions(req: NextApiRequest | NextPageContext['req'], res: NextApiResponse | NextPageContext['res']): NextAuthOptions {
	return {
		adapter: PrismaAdapter(req, res),

		providers: [
			GoogleProvider({
				clientId: process.env.GOOGLE_CLIENT_ID ?? '',
				clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
				authorization: {
					params: {
						prompt: 'consent',
						access_type: 'offline',
						response_type: 'code',
						scope: 'https://www.googleapis.com/auth/userinfo.email',
					},
				},

				profile(profile: GoogleProfile) {
					return {
						id: profile.sub,
						name: profile.name,
						username: '',
						email: profile.email,
						avatar_url: profile.picture,
					};
				},
			}),
			GitHubProvider({
				clientId: process.env.GITHUB_ID ?? '',
				clientSecret: process.env.GITHUB_SECRET ?? '',

				profile(profile: GithubProfile) {
					return {
						id: profile.id.toString(),
						name: profile.name!,
						username: '',
						email: profile.email!,
						avatar_url: profile.avatar_url,
					};
				},
			}),
		],

		callbacks: {
			async signIn({ account }) {
				if (account?.provider === 'github' && !account?.scope?.includes('read:user,user:email')) {
					return 'http://localhost:3000?error=githubPermissions';
				}
				if (account?.provider === 'google' && !account?.scope?.includes('https://www.googleapis.com/auth/userinfo.email')) {
					return 'http://localhost:3000?error=googlePermissions';
				}

				return true;
			},

			async session({ session, user }) {
				return {
					...session,
					user,
				};
			},
		},

		pages: {
			error: '/auth/error',
		},
	};
}

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	return await NextAuth(req, res, buildNextAuthOptions(req, res));
}
