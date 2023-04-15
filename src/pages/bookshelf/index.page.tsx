import { ReactElement } from 'react';

import { Header } from '@/components/Header';
import DefaultLayout from '@/layouts/Default';

import {
	BookShelfContainer,
	HeaderContainer,
	GroupingBooksContainer,
	BreadcrumbTitleContainer,
	BooksListContainer,
	CurrentlyReadingContainer,
	ReadedBooksContainer,
	WishReadBookContainer,
	AnalyticsSidebarContainer,
} from './styles';

import { UserAnalytics } from '../perfil/UserAnalytics';
import { BookshelfIcon } from '@/components/CustomIcons/BookshelfIcon';
import { theme } from '@/styles';
import { GetServerSideProps } from 'next';
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { BookCard } from './BookCard';
import { Book, BookCategory, User } from '@prisma/client';
import { SideBar } from './SideBar';
import { useSession } from 'next-auth/react';

interface IBooks extends Book {
	bookCategory: BookCategory[];
}

interface IBookshelf {
	user: User;
	booksCurrentlyReading: IBooks[];
	alreadyReadBooks: IBooks[];
	wishReadBooks: IBooks[];
}

export default function Bookshelf({ user, booksCurrentlyReading, alreadyReadBooks, wishReadBooks }: IBookshelf) {
	const session = useSession();

	return (
		<BookShelfContainer>
			<HeaderContainer>
				<Header>
					<BookshelfIcon size={32} color={`${theme.colors.green100}`} />
					<h3>Estante Pessoal</h3>
				</Header>
			</HeaderContainer>

			<GroupingBooksContainer>
				<CurrentlyReadingContainer>
					<BreadcrumbTitleContainer>
						<span>
							Livros que você <strong style={{ color: `${theme.colors.yellow200}` }}> está lendo </strong>
						</span>
					</BreadcrumbTitleContainer>

					<BooksListContainer>
						{booksCurrentlyReading.map((book) => {
							return <BookCard key={book.id} book={book} onSelectBook={() => console.log('')} />;
						})}
					</BooksListContainer>
				</CurrentlyReadingContainer>

				<WishReadBookContainer>
					<BreadcrumbTitleContainer>
						<span>
							Livros que você <strong style={{ color: `${theme.colors.blue200}` }}> gostaria de ler </strong>
						</span>
					</BreadcrumbTitleContainer>

					<BooksListContainer>
						{wishReadBooks.map((book) => {
							return <BookCard key={book.id} book={book} onSelectBook={() => console.log('')} />;
						})}
					</BooksListContainer>
				</WishReadBookContainer>

				<ReadedBooksContainer>
					<BreadcrumbTitleContainer>
						<span>
							Livros que você <strong style={{ color: `${theme.colors.green200}` }}> já leu </strong>
						</span>
					</BreadcrumbTitleContainer>

					<BooksListContainer>
						{alreadyReadBooks.map((book) => {
							return <BookCard key={book.id} book={book} onSelectBook={() => console.log('')} />;
						})}
					</BooksListContainer>
				</ReadedBooksContainer>
			</GroupingBooksContainer>

			<AnalyticsSidebarContainer>
				{session.status === 'authenticated' && (
					<SideBar
						userSession={session.data.user}
						user={user}
						alreadyReadBooks={alreadyReadBooks}
						booksCurrentlyReading={booksCurrentlyReading}
						wishReadBooks={wishReadBooks}
					/>
				)}
			</AnalyticsSidebarContainer>
		</BookShelfContainer>
	);
}

Bookshelf.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await getServerSession(req, res, buildNextAuthOptions(req, res));

	const user = await prisma.user.findUnique({
		where: {
			id: session?.user.id,
		},
	});

	const booksCurrentlyReading = await prisma.book.findMany({
		include: {
			bookCategory: true,
			userBook: true,
		},
		where: {
			userBook: {
				some: {
					is_reading: true,
				},
			},
		},
	});

	const wishReadBooks = await prisma.book.findMany({
		include: {
			bookCategory: true,
			userBook: true,
		},
		where: {
			userBook: {
				some: {
					wish_read: true,
				},
			},
		},
	});

	const alreadyReadBooks = await prisma.book.findMany({
		include: {
			bookCategory: true,
			userBook: true,
		},
		where: {
			userBook: {
				some: {
					has_already_read: true,
				},
			},
		},
	});

	return {
		props: {
			session,
			user: JSON.parse(JSON.stringify(user)),
			booksCurrentlyReading,
			wishReadBooks,
			alreadyReadBooks,
		},
	};
};
