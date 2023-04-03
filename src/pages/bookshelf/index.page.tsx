import { ReactElement } from 'react';

import { Header } from '@/components/Header';
import DefaultLayout from '@/layouts/Default';
import { TextInput } from '@/components/Form/TextInput';

import { MagnifyingGlass, User } from '@phosphor-icons/react';
import { BookShelfContainer, HeaderContainer, BreadcrumbTitleContainer, ReadBooksContainer, BooksListContainer, AnalyticsSidebarContainer } from './styles';

import OHobbit from '../../assets/o-hobbit.png';
import Algoritmos from '../../assets/entendendo-algoritmos.png';
import MochileirosGalaxias from '../../assets/o-guia-do-mochileiro-das-galaxias.png';
import { MyBookReviewCard } from '../perfil/MyBookReviewCard';
import { UserAnalytics } from '../perfil/UserAnalytics';
import { BookshelfIcon } from '@/components/CustomIcons/BookshelfIcon';
import { theme } from '@/styles';
import { GetServerSideProps } from 'next';
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { useSession } from 'next-auth/react';
import { BookCard } from './BookCard';
import { api } from '@/lib/axios';

export default function Bookshelf({ books }) {
	const session = useSession();

	console.log('books:', books);

	return (
		<BookShelfContainer>
			<HeaderContainer>
				<Header>
					<BookshelfIcon size={32} color={`${theme.colors.green100}`} />
					<h3>Estante Pessoal</h3>
				</Header>
			</HeaderContainer>

			<ReadBooksContainer>
				<BreadcrumbTitleContainer>
					<span>Livros que você já leu</span>
				</BreadcrumbTitleContainer>

				<BooksListContainer>
					<BookCard book={books[0]} onSelectBook={() => console.log('')} />
					<BookCard book={books[1]} onSelectBook={() => console.log('')} />
					<BookCard book={books[2]} onSelectBook={() => console.log('')} />
					<BookCard book={books[3]} onSelectBook={() => console.log('')} />
					<BookCard book={books[4]} onSelectBook={() => console.log('')} />
					<BookCard book={books[5]} onSelectBook={() => console.log('')} />
				</BooksListContainer>
			</ReadBooksContainer>

			<AnalyticsSidebarContainer>
				<UserAnalytics />
			</AnalyticsSidebarContainer>
		</BookShelfContainer>
	);
}

Bookshelf.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await getServerSession(req, res, buildNextAuthOptions(req, res));

	const books = await prisma.book.findMany({
		include: {
			bookCategory: true,
		},
	});

	return {
		props: {
			session,
			books,
		},
	};
};
