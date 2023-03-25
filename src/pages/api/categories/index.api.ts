import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).end();
	}

	const searchQuerySchema = z.object({
		categories: z.optional(z.array(z.string())),
	});

	const { categories } = searchQuerySchema.parse(req.query);

	try {
		const categories = await prisma.category.findMany();

		return res.json(categories);
	} catch (error) {
		console.log('error: ', error);
		return res.status(400).json({ type: 'error', statusCode: 400, message: 'Erro ao tentar listar categorias' });
	}
}
