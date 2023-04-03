import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).end();
	}

	const bookId = String(req.query.bookId);

	if (!bookId) {
		return res.status(400).json({ type: 'error', statusCode: 400, message: 'Book ID not provided' });
	}

	try {
		const book = await prisma.book.findUnique({
			where: {
				id: bookId,
			},
			include: {
				bookCategory: {
					select: {
						book_id: true,
						category_id: true,
						category: {
							select: {
								category: true,
							},
						},
					},
				},
				ratingBook: true,
				bookReview: {
					include: {
						user: true,
					},
				},
			},
		});

		return res.json(book);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ tupe: 'error', statusCode: 400, message: 'Erro ao tentar listar livro' });
	}
}
