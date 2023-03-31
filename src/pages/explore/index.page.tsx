import qs from 'qs';
import { GetStaticProps } from 'next';
import debounce from 'lodash/debounce';
import Drawer from 'react-modern-drawer';
import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, ReactElement, useCallback, useState } from 'react';

import { api } from '@/lib/axios';
import { prisma } from '@/lib/prisma';
import { BookCard } from './BookCard';
import { SidePanel } from './SidePanel';
import { useSession } from 'next-auth/react';
import { Header } from '@/components/Header';
import DefaultLayout from '@/layouts/Default';
import { SkeletonBookCard } from './SkeletonBookCard';
import { TextInput } from '@/components/Form/TextInput';
import { Book, BookCategory, Category, RatingBook } from '@prisma/client';

import { Binoculars, MagnifyingGlass, MinusCircle, PlusCircle } from '@phosphor-icons/react';
import { ExploreContainer, HeaderContainer, CategoriesContainer, CategoryTag, BooksListContainer, ShowAllButton } from './styles';

interface IExploreProps {
	categories: Category[];
}

interface Books extends Book {
	bookCategory: BookCategory[];
	ratingBook: RatingBook[];
}

export default function Explore({ categories }: IExploreProps) {
	const session = useSession();

	const [isOpen, setIsOpen] = useState(false);
	const [isShortList, setIsShortList] = useState(true);
	const [delayQuerySearch, setDelayQuerySearch] = useState('');
	const [searchInputValue, setSearchInputValue] = useState('');
	const [selectCategories, setSelectCategories] = useState<string[]>([]);

	const toggleDrawer = () => {
		setIsOpen((prevState) => !prevState);
	};

	const categoriesList = isShortList ? categories.slice(0, 7) : categories;

	function handlerSelectCategory(category: string) {
		if (selectCategories.includes(category)) {
			const itemToRemove = selectCategories.find((item) => item === category);
			const categoriesWithoutDeletedOne = selectCategories.filter((category) => category !== itemToRemove);

			setSelectCategories(categoriesWithoutDeletedOne);
		} else {
			setSelectCategories((prevState) => [category, ...prevState]);
		}
	}

	const { data: books, isFetching } = useQuery<Books[]>(['searchBook', delayQuerySearch, selectCategories], async () => {
		const { data } = await api.get('/books', {
			params: {
				search: delayQuerySearch,
				categoriesSearch: selectCategories,
			},
			paramsSerializer: {
				serialize: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
			},
		});

		return data;
	});

	const querySearchDebounce = useCallback(
		debounce((value) => setDelayQuerySearch(value), 600),
		[]
	);

	function handlerSearch(event: ChangeEvent<HTMLInputElement>) {
		setSearchInputValue(event.target.value);

		querySearchDebounce(event.target.value);
	}

	return (
		<>
			<ExploreContainer>
				<HeaderContainer>
					<Header>
						<Binoculars size={32} />
						<h3>Explorar</h3>
					</Header>

					<div className='inputContainer'>
						<TextInput
							placeholder='Buscar livro ou autor'
							iconRight={<MagnifyingGlass size={20} />}
							value={searchInputValue}
							onChange={(e) => handlerSearch(e)}
						/>
					</div>
				</HeaderContainer>

				<CategoriesContainer>
					<CategoryTag className={selectCategories.length <= 0 ? 'selected' : ''} onClick={() => setSelectCategories([])}>
						Todos
					</CategoryTag>
					{categoriesList.map((tag) => {
						return (
							<CategoryTag
								key={tag.id}
								className={selectCategories.some((category) => category === tag.category) ? 'selected' : ''}
								onClick={() => handlerSelectCategory(tag.category)}
							>
								{tag.category}
							</CategoryTag>
						);
					})}
					<ShowAllButton onClick={() => setIsShortList(!isShortList)}>{isShortList ? <PlusCircle size={28} /> : <MinusCircle size={28} />}</ShowAllButton>
				</CategoriesContainer>

				<BooksListContainer>
					{books?.map((book) => {
						return <>{isFetching ? <SkeletonBookCard /> : <BookCard key={book.id} book={book} onOpenDrawer={() => setIsOpen(true)} />}</>;
					})}
				</BooksListContainer>
			</ExploreContainer>

			<Drawer open={isOpen} onClose={toggleDrawer} direction='right' size={'max-content'} lockBackgroundScroll>
				<SidePanel />
			</Drawer>
		</>
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

	return {
		props: {
			categories,
		},
		revalidate: 60 * 60 * 2, // 2 hours
	};
};
