import { z } from 'zod';
import { NextApiRequest, NextApiResponse } from 'next';

import { env } from '../../../env';
import { prisma } from '@/lib/prisma';
import { S3StorageProvider } from '@/providers/S3StorageProvider';
import { LocalStorageProvider } from '@/providers/LocalStorageProvider';

interface Request extends NextApiRequest {
	file: Express.Multer.File & {
		location: string;
	};
}

interface Categories {
	value: string;
	label: string;
}

const diskStorage = {
	s3: S3StorageProvider,
	local: LocalStorageProvider,
};

const bodyCreateBookSchema = z.object({
	title: z.string(),
	author: z.string(),
	total_pages: z.string().transform((value) => Number(value)),
	categories: z.string().transform((value) => JSON.parse(value)),
});

const MAX_FILE_SIZE = 800000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/svg+xml'];
const fileSchema = z.object({
	fieldname: z.string().min(1, { message: 'Image is required' }),
	originalname: z.string(),
	encoding: z.string(),
	mimetype: z.string().refine((file) => ACCEPTED_IMAGE_TYPES.includes(file), { message: '.jpg, .jpeg, .png, .svg and .webp files are accepted.' }),
	size: z.number().refine((file) => file <= MAX_FILE_SIZE, { message: 'Max file size is 8MB.' }),
	destination: z.string(),
	filename: z.string(),
	path: z.string(),
});

const s3FileSchema = z.object({
	fieldname: z.string().min(1, { message: 'Image is required' }),
	originalname: z.string(),
	encoding: z.string(),
	mimetype: z.string().refine((file) => ACCEPTED_IMAGE_TYPES.includes(file), { message: '.jpg, .jpeg, .png, .svg and .webp files are accepted.' }),
	size: z.number().refine((file) => file <= MAX_FILE_SIZE, { message: 'Max file size is 8MB.' }),
	bucket: z.optional(z.string()),
	key: z.optional(z.string()),
	acl: z.optional(z.string()),
	contentType: z.optional(z.string()),
	contentDisposition: z.optional(z.string()).nullable(),
	contentEncoding: z.optional(z.string()).nullable(),
	storageClass: z.optional(z.string()).nullable(),
	serverSideEncryption: z.optional(z.string()).nullable(),
	metadata: z.object({ fieldName: z.string() }),
	location: z.optional(z.string()),
	etag: z.optional(z.string()).nullable(),
	versionId: z.optional(z.string()).nullable(),
});

function runMiddleware(req: NextApiRequest & { [key: string]: any }, res: NextApiResponse, fn: (...args: any[]) => void): Promise<any> {
	return new Promise((resolve, reject) => {
		fn(req, res, (result: any) => {
			if (result instanceof Error) {
				return reject(result);
			}

			const parseBodyCreateBookSchemaResult = bodyCreateBookSchema.safeParse(req.body);
			let parseFileSchemaResult;

			if (env.API_DISKSTORAGE_TYPE === 'local') {
				parseFileSchemaResult = fileSchema.safeParse(req.file);
			} else {
				parseFileSchemaResult = s3FileSchema.safeParse(req.file);
			}

			if (!parseFileSchemaResult.success) {
				console.log('parseFileSchemaResult: ', parseFileSchemaResult.error.format());
				return reject(result);
			}

			if (!parseBodyCreateBookSchemaResult.success) {
				console.log('parseBodyCreateBookSchemaResult: ', parseBodyCreateBookSchemaResult.error.format());
				return reject(result);
			}

			return resolve(result);
		});
	});
}

export default async function handler(req: Request, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).end();
	}
	const upload = diskStorage[env.API_DISKSTORAGE_TYPE].storage();
	await runMiddleware(req, res, upload.single('cover_image'));

	const { title, author, total_pages, categories } = bodyCreateBookSchema.parse(req.body);
	const { location } = req.file;

	const filename = location.split('/')[4];

	const doesBookAlredyExist = await prisma.book.findUnique({
		where: {
			title,
		},
	});

	if (doesBookAlredyExist) {
		if (filename) {
			diskStorage[env.API_DISKSTORAGE_TYPE].delete(filename);
		}

		return res.status(400).json({ type: 'error', statusCode: 400, message: 'O livro já está cadastrado' });
	}

	try {
		const newBook = await prisma.book.create({
			data: {
				title,
				author,
				total_pages,
				cover_image: filename,
			},
		});

		await prisma.bookCategory.createMany({
			data: categories.map((category: Categories) => {
				return {
					book_id: newBook.id,
					category_id: category.value,
				};
			}),
		});

		return res.status(201).json({ type: 'success', statusCode: 201, message: `O livro ${newBook.title} foi cadastrado com sucesso` });
	} catch (error) {
		console.log('create book error: ', error);

		return res.status(400).json({ type: 'error', statusCode: 400, message: 'Erro ao tentar cadastrar livro' });
	}
}

export const config = {
	api: {
		bodyParser: false,
	},
};
