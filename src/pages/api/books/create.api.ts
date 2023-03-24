import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).end();
	}

	const bodyCreateBookSchema = z.object({
		title: z.string(),
		author: z.string(),
		total_pages: z.optional(z.number()),
		cover_image: z.optional(z.string()),
	});

	const { title, author, total_pages, cover_image } = bodyCreateBookSchema.parse(req.body);

	const doesBookAlredyExist = await prisma.book.findUnique({
		where: {
			title,
		},
	});

	if (doesBookAlredyExist) {
		return res.status(400).json({ type: 'error', statusCode: 400, message: 'O livro já está cadastrado' });
	}

	try {
		const newBook = await prisma.book.create({
			data: {
				title,
				author,
				total_pages,
				cover_image,
			},
		});

		return res.status(201).json({ type: 'success', statusCode: 201, message: `O livro ${newBook.title} foi cadastrado com sucesso` });
	} catch (error) {
		console.log('create book error: ', error);

		return res.status(400).json({ type: 'error', statusCode: 400, message: 'Erro ao tentar cadastrar livro' });
	}
}
