import lodash from 'lodash';
import { ReactElement, useState } from 'react';
import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';
import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/prisma';
import { Header } from '@/components/Header';
import DefaultLayout from '@/layouts/Default';
import { UserAnalytics } from './UserAnalytics';
import { MyBookReviewCard } from './MyBookReviewCard';
import { TextInput } from '@/components/Form/TextInput';
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api';
import { Book, BookCategory, BookReview, Category, RatingBook, UserBook, User as UserPrisma } from '@prisma/client';

import { MagnifyingGlass, User } from '@phosphor-icons/react';
import { PerfilContainer, HeaderContainer, MyBookReviewsContainer, AnalyticsSidebarContainer, ReviewsContainer } from './styles';

interface IBook extends Book {
	bookCategory: Array<BookCategory & { category: Category }>;
}

interface IUserBooks extends UserBook {
	book: IBook;
}

interface IPerfilProps {
	user: UserPrisma;
	userBooks: IUserBooks[];
	ratingBooks: RatingBook[];
	MostReadUniqueCategories: string[];
	booksReviews: Array<BookReview & { book: Book }>;
}

export default function Perfil({ user, userBooks, ratingBooks, MostReadUniqueCategories, booksReviews }: IPerfilProps) {
	const session = useSession();

	const [filterSearch, setFilterSearch] = useState('');

	const booksListFilter = booksReviews.filter((book) => book.book.title.toLowerCase().includes(filterSearch.toLowerCase()));

	return (
		<PerfilContainer>
			<HeaderContainer>
				<Header>
					<User size={32} />
					<h3>Perfil</h3>
				</Header>
			</HeaderContainer>

			<MyBookReviewsContainer>
				<TextInput
					placeholder='Buscar livro avaliado'
					iconRight={<MagnifyingGlass size={20} />}
					value={filterSearch}
					onChange={(e) => setFilterSearch(e.target.value)}
				/>
				<ReviewsContainer>
					{booksListFilter.map((review) => {
						const userBookRating = ratingBooks.find((book) => {
							return book.book_id === review.book_id;
						});
						return (
							<MyBookReviewCard
								key={review.id}
								bookTitle={review.book.title}
								bookAuthor={review.book.author}
								bookCover={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${review.book.cover_image!}`}
								userBookRating={Number(userBookRating?.rating)}
								puplishedAt={review.created_at}
								updatedAt={review.updated_at ?? undefined}
								userOpinion={review.review}
							/>
						);
					})}
				</ReviewsContainer>
			</MyBookReviewsContainer>

			<AnalyticsSidebarContainer>
				{session.status === 'authenticated' && (
					<UserAnalytics
						user={user}
						userSession={session.data.user}
						userBooks={userBooks}
						ratingBooks={ratingBooks}
						mostReadCategories={MostReadUniqueCategories}
					/>
				)}
			</AnalyticsSidebarContainer>
		</PerfilContainer>
	);
}

Perfil.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await getServerSession(req, res, buildNextAuthOptions(req, res));

	const user = await prisma.user.findUnique({
		where: {
			id: session?.user.id,
		},
	});

	const userBooks = await prisma.userBook.findMany({
		where: {
			user_id: session?.user.id,
		},
		include: {
			book: {
				include: {
					bookCategory: {
						include: {
							category: true,
						},
					},
				},
			},
		},
	});

	const booksReviews = await prisma.bookReview.findMany({
		where: {
			user_id: session?.user.id,
		},
		include: {
			book: true,
		},
		orderBy: {
			created_at: 'asc',
		},
	});

	const ratingBooks = await prisma.ratingBook.findMany({
		where: {
			user_id: session?.user.id,
		},
	});

	const getCategoriesOfReadBooks = await prisma.book.findMany({
		where: {
			userBook: {
				some: {
					user_id: session?.user.id,
					has_already_read: true,
				},
			},
		},
		select: {
			bookCategory: {
				select: {
					category: {
						select: {
							category: true,
						},
					},
				},
				orderBy: {
					category: {
						category: 'asc',
					},
				},
			},
		},
	});

	// Essa função vai retornar as categorias distintas mais lidas
	function getMostReadCategories() {
		const getCategoriesOnly = getCategoriesOfReadBooks.map((bookCategory) => {
			return bookCategory.bookCategory.map((categoryName) => {
				return categoryName.category.category;
			});
		});

		let arrayWithOnlyCategoriesName: string[] = [];
		for (let i = 0; i < getCategoriesOnly.length; i++) {
			arrayWithOnlyCategoriesName.push(...getCategoriesOnly[i]);
		}

		let selectMostReadCategories = [];
		for (let index = 0; index < arrayWithOnlyCategoriesName.length; index++) {
			const currentCategoryCounting = lodash.countBy(arrayWithOnlyCategoriesName)[arrayWithOnlyCategoriesName[index]];

			selectMostReadCategories.push({ category: arrayWithOnlyCategoriesName[index], amount: currentCategoryCounting });
		}

		const maxAmountCategoryNumber = Math.max.apply(
			null,
			selectMostReadCategories.map((item) => item.amount)
		);

		const getOnlyMostReadCategories = selectMostReadCategories.filter((item) => {
			return item.amount === maxAmountCategoryNumber;
		});

		const MostReadUniqueCategories = [...new Set(getOnlyMostReadCategories.map((item) => item.category))];

		return MostReadUniqueCategories;
	}

	const MostReadUniqueCategories = getMostReadCategories();

	return {
		props: {
			session: JSON.parse(JSON.stringify(session)),
			user: JSON.parse(JSON.stringify(user)),
			userBooks,
			booksReviews: JSON.parse(JSON.stringify(booksReviews)),
			ratingBooks: JSON.parse(JSON.stringify(ratingBooks)),
			MostReadUniqueCategories,
		},
	};
};
