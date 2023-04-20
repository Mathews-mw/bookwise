import { z } from 'zod';
import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';
import { buildNextAuthOptions } from '../../auth/[...nextauth].api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'PUT') {
		return res.status(405).end();
	}

	const session = await getServerSession(req, res, buildNextAuthOptions(req, res));

	if (!session) {
		return res.status(401).end();
	}

	const bookId = String(req.query.bookId);

	const updateBodySchema = z.object({
		review: z.optional(z.string()),
		rating: z.optional(z.number()),
	});

	const parseResult = updateBodySchema.safeParse(req.body);

	if (!parseResult.success) {
		return res.status(400).json({ type: 'error', statusCode: 400, message: parseResult.error.issues });
	}

	try {
		const { data } = parseResult;

		await prisma.bookReview.update({
			where: {
				user_id_book_id: {
					book_id: bookId,
					user_id: session.user.id,
				},
			},
			data: {
				review: data.review,
				updated_at: new Date(),
			},
		});

		await prisma.ratingBook.update({
			where: {
				book_id_user_id: {
					book_id: bookId,
					user_id: session.user.id,
				},
			},
			data: {
				rating: data.rating,
				book_id: bookId,
				updated_at: new Date(),
			},
		});

		return res.status(200).json({ type: 'success', statusCode: 200, message: 'Review atualizado com sucesso' });
	} catch (error) {
		console.log(error);
		return res.status(400).json({ type: 'error', statusCode: 400, message: 'Erro ao tentar listar review' });
	}
}
