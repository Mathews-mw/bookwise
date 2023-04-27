import dayjs from 'dayjs';
import Image from 'next/image';
import { User } from 'next-auth';

import { UserAvatar } from '@/components/UserAvatar';
import { Book, BookCategory, Category, UserBook, User as UserPrisma, RatingBook } from '@prisma/client';

import { BookCopy, BookOpen, Bookmark } from 'lucide-react';
import { AvatarFrame, UserAnalyticsContainer, UserInfosContainer, Rectangle, UserStatisticsContainer, ItemContainer } from './styles';

import BookStar from '../../../assets/book-star.svg';

interface IBook extends Book {
	bookCategory: Array<BookCategory & { category: Category }>;
}

interface IUserBooks extends UserBook {
	book: IBook;
}

interface IUserAnalytics {
	user: UserPrisma;
	userSession: User;
	userBooks: IUserBooks[];
	ratingBooks: RatingBook[];
	mostReadCategories: string[];
}

export function UserAnalytics({ user, userSession, userBooks, ratingBooks, mostReadCategories }: IUserAnalytics) {
	const memberSince = dayjs(user?.created_at).format('[membro desde ]YYYY');

	const amountReadBooks = userBooks.filter((book) => book.has_already_read === true).length;
	const amountRatingBooks = ratingBooks.length;

	const Pagesbooks = userBooks.map((userBook) => userBook.book.total_pages!);
	const amountPagesReaded = Pagesbooks.reduce((acc, pages) => {
		return (acc += pages);
	}, 0);

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
						<BookCopy size={32} />
						<div className='itensGroup'>
							<span>{amountReadBooks}</span>
							<span>Livros lidos</span>
						</div>
					</ItemContainer>

					<ItemContainer>
						<BookOpen size={32} />
						<div className='itensGroup'>
							<span>{amountPagesReaded}</span>
							<span>Páginas lidas</span>
						</div>
					</ItemContainer>

					<ItemContainer>
						<Bookmark size={32} />
						<div className='itensGroup'>
							<span>{mostReadCategories.join(', ')}</span>
							<span>Categoria mais lida</span>
						</div>
					</ItemContainer>

					<ItemContainer>
						<Image src={BookStar} alt='book star icon' />
						<div className='itensGroup'>
							<span>{amountRatingBooks}</span>
							<span>Livros avaliados</span>
						</div>
					</ItemContainer>
				</UserStatisticsContainer>
			</UserInfosContainer>
		</UserAnalyticsContainer>
	);
}
