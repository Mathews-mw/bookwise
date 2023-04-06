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
		review: z.string(),
		rating: z.number(),
	});

	const parseResult = reviewBodySchema.safeParse(req.body);

	if (!parseResult.success) {
		return res.status(400).json({ type: 'error', statusCode: 400, errorMessage: parseResult.error.issues, message: 'Erro ao validar formulário' });
	}

	try {
		const { review, rating } = parseResult.data;

		await prisma.bookReview.create({
			data: {
				review,
				book_id: bookId,
				user_id: session.user.id,
			},
		});

		await prisma.ratingBook.create({
			data: {
				rating,
				book_id: bookId,
				user_id: session.user.id,
			},
		});

		return res.status(201).json({ type: 'success', statusCode: 201, message: 'Mandou bem! Agradecemos pela sua avaliação ✌' });
	} catch (error) {
		console.log('book review error: ', error);
		return res.status(400).json({ type: 'error', statusCode: 400, message: 'Erro ao tentar fazer Avaliação do livro' });
	}
}
