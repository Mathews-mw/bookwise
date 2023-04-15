import dayjs from 'dayjs';
import { User } from 'next-auth';

import { UserAvatar } from '@/components/UserAvatar';
import { Book, BookCategory, User as UserPrisma } from '@prisma/client';

import { AvatarFrame, UserAnalyticsContainer, UserInfosContainer, Rectangle, UserStatisticsContainer, ItemContainer } from './styles';
import { theme } from '@/styles';
import { BookPlus, BookOpenCheck } from 'lucide-react';
import Image from 'next/image';
import { HourglassMedium } from '@phosphor-icons/react';

interface IBooks extends Book {
	bookCategory: BookCategory[];
}

interface ISideBarProps {
	user: UserPrisma;
	userSession: User;
	booksCurrentlyReading: IBooks[];
	alreadyReadBooks: IBooks[];
	wishReadBooks: IBooks[];
}

export function SideBar({ user, userSession, booksCurrentlyReading, alreadyReadBooks, wishReadBooks }: ISideBarProps) {
	const memberSince = dayjs(user?.created_at).format('[membro desde ]YYYY');

	return (
		<UserAnalyticsContainer>
			<UserInfosContainer>
				<AvatarFrame>
					<UserAvatar userSession={userSession} size={72} />
				</AvatarFrame>

				<div className='userName'>
					<strong>{user.name}</strong>
					<time>{memberSince}</time>
				</div>

				<Rectangle>
					<div className='bar'></div>
				</Rectangle>

				<UserStatisticsContainer>
					<ItemContainer>
						<HourglassMedium size={22} color={`${theme.colors.yellow200}`} />
						<div className='itensGroup'>
							<span>{booksCurrentlyReading.length}</span>
							<span>Lendo</span>
						</div>
					</ItemContainer>

					<ItemContainer>
						<BookPlus color={`${theme.colors.blue200}`} size={22} />
						<div className='itensGroup'>
							<span>{wishReadBooks.length}</span>
							<span>Gostaria de ler</span>
						</div>
					</ItemContainer>

					<ItemContainer>
						<BookOpenCheck size={22} color={`${theme.colors.green200}`} />
						<div className='itensGroup'>
							<span>{alreadyReadBooks.length}</span>
							<span>Lido</span>
						</div>
					</ItemContainer>
				</UserStatisticsContainer>
			</UserInfosContainer>
		</UserAnalyticsContainer>
	);
}
