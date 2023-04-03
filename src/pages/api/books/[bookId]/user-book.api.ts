import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { buildNextAuthOptions } from '../../auth/[...nextauth].api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).end();
	}

	const session = await getServerSession(req, res, buildNextAuthOptions(req, res));

	if (!session) {
		return res.status(401).end();
	}

	const bookId = String(req.query.bookId);

	if (!bookId) {
		return res.status(400).json({ type: 'error', statusCode: 400, message: 'Book ID not provided' });
	}

	const reviewBodySchema = z.object({
		has_already_read: z.optional(z.boolean()),
		is_reading: z.optional(z.boolean()),
		wish_read: z.optional(z.boolean()),
	});

	const parseResult = reviewBodySchema.safeParse(req.body);

	if (!parseResult.success) {
		return res.status(400).json({ type: 'error', statusCode: 400, errorMessage: parseResult.error.issues, message: 'Erro ao validar formulário' });
	}

	try {
		const { has_already_read, is_reading, wish_read } = parseResult.data;

		const bookReview = await prisma.userBook.create({
			data: {
				book_id: bookId,
				user_id: session.user.id,
				has_already_read,
				is_reading,
				wish_read,
			},
		});

		return res.status(201).json({ type: 'success', statusCode: 201, message: 'Status do livro atualizado' });
	} catch (error) {
		console.log('book review error: ', error);
		return res.status(400).json({ type: 'error', statusCode: 400, message: 'Erro ao tentar atualizar status do livro' });
	}
}
