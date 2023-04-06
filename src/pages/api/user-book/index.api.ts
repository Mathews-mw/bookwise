import { getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';

import { prisma } from '@/lib/prisma';
import { buildNextAuthOptions } from '../auth/[...nextauth].api';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).end();
	}

	const session = await getServerSession(req, res, buildNextAuthOptions(req, res));

	if (!session) {
		return res.status(401).end();
	}

	try {
		const userBooks = await prisma.userBook.findMany({
			where: {
				user_id: session.user.id,
			},
		});

		return res.json(userBooks);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ type: 'error', statusCode: 400, message: 'Erro ao tentar listar relação de livros por usuário' });
	}
}
