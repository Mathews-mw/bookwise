import { GetServerSideProps, GetStaticProps } from 'next';
import { ReactElement, useState } from 'react';

import { prisma } from '@/lib/prisma';
import { BookCard } from './BookCard';
import { Book, BookCategory, Category, RatingBook } from '@prisma/client';
import { Header } from '@/components/Header';
import DefaultLayout from '@/layouts/Default';
import { TextInput } from '@/components/Form/TextInput';

import { Binoculars, MagnifyingGlass, MinusCircle, PlusCircle } from '@phosphor-icons/react';
import { ExploreContainer, HeaderContainer, CategoriesContainer, CategoryTag, BooksListContainer, ShowAllButton } from './styles';
import { getServerSession, unstable_getServerSession } from 'next-auth';
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api';
import { useSession } from 'next-auth/react';

interface IExploreProps {
	categories: Category[];
	books: Array<Book & { bookCategory: BookCategory[]; ratingBook: RatingBook[] }>;
}

export default function Explore({ categories, books }: IExploreProps) {
	const session = useSession();

	console.log('session: ', session);

	const [select, setSelected] = useState('');
	const [isShortList, setIsShortList] = useState(true);

	const categoriesList = isShortList ? categories.slice(0, 7) : categories;

	return (
		<ExploreContainer>
			<HeaderContainer>
				<Header>
					<Binoculars size={32} />
					<h3>Explorar</h3>
				</Header>

				<div className='inputContainer'>
					<TextInput placeholder='Buscar livro ou autor' iconRight={<MagnifyingGlass size={20} />} />
				</div>
			</HeaderContainer>

			<CategoriesContainer>
				<CategoryTag>Todos</CategoryTag>
				{categoriesList.map((tag) => {
					return (
						<CategoryTag key={tag.id} className={select === tag.category ? 'selected' : ''} onClick={() => setSelected(tag.category)}>
							{tag.category}
						</CategoryTag>
					);
				})}
				<ShowAllButton onClick={() => setIsShortList(!isShortList)}>{isShortList ? <PlusCircle size={28} /> : <MinusCircle size={28} />}</ShowAllButton>
			</CategoriesContainer>

			<BooksListContainer>
				{books.map((book) => {
					return <BookCard key={book.id} book={book} />;
				})}
			</BooksListContainer>
		</ExploreContainer>
	);
}

Explore.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps = async () => {
	const categories = await prisma.category.findMany({
		orderBy: {
			category: 'asc',
		},
	});
	const books = await prisma.book.findMany({
		include: {
			BookCategory: true,
			RatingBook: true,
		},
		orderBy: {
			title: 'asc',
		},
	});

	return {
		props: {
			categories,
			books,
		},
		revalidate: 60 * 60 * 24, // 1 day
	};
};
