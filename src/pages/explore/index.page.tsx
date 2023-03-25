import { ReactElement, useState } from 'react';

import { BookCard } from './BookCard';
import DefaultLayout from '@/layouts/Default';

import { ExploreContainer, HeaderContainer, CategoriesContainer, CategoryTag, BooksListContainer } from './styles';
import { Header } from '@/components/Header';
import { Binoculars, MagnifyingGlass } from '@phosphor-icons/react';
import { TextInput } from '@/components/Form/TextInput';
import { GetStaticProps } from 'next';
import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';

interface IExploreProps {
	categories: Category[];
}

export default function Explore({ categories }: IExploreProps) {
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
				<CategoryTag onClick={() => setIsShortList(!isShortList)}>Todos</CategoryTag>
				{categoriesList.map((tag) => {
					return (
						<CategoryTag key={tag.id} className={select === tag.category ? 'selected' : ''} onClick={() => setSelected(tag.category)}>
							{tag.category}
						</CategoryTag>
					);
				})}
			</CategoriesContainer>

			<BooksListContainer>
				{Array.from({ length: 15 }).map((_, i) => {
					return <BookCard key={i} />;
				})}
			</BooksListContainer>
		</ExploreContainer>
	);
}

Explore.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps = async () => {
	const categories = await prisma.category.findMany();

	return {
		props: {
			categories,
		},
		revalidate: 60 * 60 * 24, // 1 day
	};
};
