import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';
import { buildNextAuthOptions } from '../../auth/[...nextauth].api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).end();
	}

	const session = await getServerSession(req, res, buildNextAuthOptions(req, res));

	if (!session) {
		return res.status(401).end();
	}

	const bookId = String(req.query.bookId);

	try {
		const bookReview = await prisma.bookReview.findUnique({
			where: {
				user_id_book_id: {
					book_id: bookId,
					user_id: session.user.id,
				},
			},
			include: {
				user: {
					select: {
						ratingBook: {
							where: {
								book_id: bookId,
							},
						},
					},
				},
			},
		});

		return res.json(bookReview);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ type: 'error', statusCode: 400, message: 'Erro ao tentar listar review' });
	}
}
