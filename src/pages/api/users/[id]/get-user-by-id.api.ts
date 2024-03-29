import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).end();
	}

	const id = String(req.query.id);

	if (!id) {
		return res.status(400).json({ type: 'error', statusCode: 404, message: 'Usuário não informado' });
	}

	try {
		const user = await prisma.user.findUnique({
			where: {
				id,
			},
			include: {
				accounts: true,
				sessions: true,
			},
		});

		if (!user) {
			return res.status(404).json({ type: 'error', statusCode: 404, message: 'Nenhum usuário encontrado' });
		}

		return res.json(user);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ tupe: 'error', statusCode: 400, message: 'Erro ao tentar listar usuário' });
	}
}
