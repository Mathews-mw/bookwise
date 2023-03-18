import { prisma } from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { setCookie } from 'nookies';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== 'POST') {
		return res.status(405).end();
	}

	const bodySchema = z.object({
		name: z.string(),
		username: z.string(),
	});

	const { name, username } = bodySchema.parse(req.body);

	const userAlreadyExists = await prisma.user.findUnique({
		where: {
			username,
		},
	});

	if (userAlreadyExists) {
		return res.status(400).json({ message: 'O username já existe' });
	}

	const newUser = await prisma.user.create({
		data: {
			name,
			username,
		},
	});

	setCookie({ res }, '@bookwise:userId', newUser.id, {
		maxAge: 60 * 60 * 24 * 7, // 7 days
		path: '/',
	});

	return res.status(201).json({
		message: `${newUser.name}, seu cadastro foi realizado com sucesso`,
		newUser,
	});
}
