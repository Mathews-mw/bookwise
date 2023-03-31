import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'GET') {
		return res.status(405).end();
	}

	const search = String(req.query.search);
	const { categoriesSearch } = req.query;

	console.log('query: ', req.query);

	try {
		const books = await prisma.book.findMany({
			where: {
				OR: [
					{
						title: {
							contains: search,
							mode: 'insensitive',
						},
					},
					{
						author: {
							contains: search,
							mode: 'insensitive',
						},
					},
				],
				AND: {
					bookCategory: {
						some: {
							category: {
								category: {
									in: categoriesSearch,
								},
							},
						},
					},
				},
			},
			include: {
				bookCategory: true,
				ratingBook: true,
			},
			orderBy: {
				title: 'asc',
			},
		});

		return res.json(books);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ tupe: 'error', statusCode: 400, message: 'Erro ao tentar listar livros' });
	}
}
