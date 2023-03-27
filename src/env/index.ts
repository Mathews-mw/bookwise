import { config } from 'dotenv';
import { z } from 'zod';

if (process.env.NODE_ENV === 'test') {
	config({ path: '.env.test', override: true });
} else {
	config();
}
const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
	API_DISKSTORAGE_TYPE: z.enum(['local', 's3']).default('local'),
	DATABASE_URL: z.string(),
	NEXTAUTH_SECRET: z.string(),
	GOOGLE_CLIENT_ID: z.string(),
	GOOGLE_CLIENT_SECRET: z.string(),
	GITHUB_ID: z.string(),
	GITHUB_SECRET: z.string(),
	AWS_REGION: z.string(),
	AWS_BUCKET: z.string(),
	AWS_ACCESS_KEY_ID: z.string(),
	AWS_SECRET_ACCESS_KEY: z.string(),
	AWS_BUCKET_URL: z.string(),
	API_BASE_URL: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
	console.error('Invalid environment variables!: ', _env.error.format());

	throw new Error('Invalid environment variables');
}

export const env = _env.data;
