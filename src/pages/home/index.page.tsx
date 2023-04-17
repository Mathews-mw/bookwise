import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/prisma';
import { ratingCalculate } from '../../utils/rating-calculate';
import { Header } from '@/components/Header';
import DefaultLayout from '@/layouts/Default';
import { TrendingBooks } from './TredingBooks';
import { BookReviewCard } from './BookReviewCard';
import { Book, BookReview, RatingBook, User } from '@prisma/client';
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api';

import { CaretRight, ChartLineUp } from '@phosphor-icons/react';
import { HomeContainer, BreadcrumbTitleContainer, RecentViewsContainer, ReviewsContainer, TrendingContainer, TrandingBooksList, NavButton } from './styles';

import { UserReviewCard } from './UserReviewCard';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';

interface IBookReviews extends BookReview {
	book: Book;
	user: User & { ratingBook: RatingBook[] };
}

interface IHomeProps {
	bookReviews: IBookReviews[];
	userLatestBookReview: IBookReviews;
	top4MostPopularBooks: Array<Book & { ratingBook: RatingBook; average: number }>;
}

export default function Home({ bookReviews, userLatestBookReview, top4MostPopularBooks }: IHomeProps) {
	const session = useSession();
	const router = useRouter();

	return (
		<HomeContainer>
			<RecentViewsContainer>
				<Header css={{ padding: '40px 0' }}>
					<ChartLineUp size={32} />
					<h3>Início</h3>
				</Header>

				{session.status === 'authenticated' && userLatestBookReview && (
					<>
						<BreadcrumbTitleContainer>
							<span>Sua última avaliação</span>
							<NavButton onClick={() => router.push('/perfil')}>
								Ver todos <CaretRight size={16} weight='bold' />
							</NavButton>
						</BreadcrumbTitleContainer>
						<UserReviewCard
							userName={userLatestBookReview?.user.name}
							publishedDate={userLatestBookReview?.created_at}
							updatedAt={userLatestBookReview?.updated_at ?? undefined}
							bookTitle={userLatestBookReview?.book.title}
							bookAuthor={userLatestBookReview?.book.author}
							bookCover={userLatestBookReview?.book.cover_image!}
							comment={userLatestBookReview?.review}
							rating={Number(userLatestBookReview?.user.ratingBook.find((book) => book.book_id === userLatestBookReview.book_id)?.rating)}
							user={userLatestBookReview?.user}
						/>
					</>
				)}

				<BreadcrumbTitleContainer>
					<span>Avaliações mais recentes</span>
				</BreadcrumbTitleContainer>

				<ReviewsContainer>
					{bookReviews.map((review) => {
						const userBookRating = review.user.ratingBook.find((rating) => rating.book_id === review.book_id);

						return (
							<BookReviewCard
								key={review.id}
								userName={review.user.name}
								publishedDate={review.created_at}
								updatedAt={review.updated_at ?? undefined}
								bookTitle={review.book.title}
								bookAuthor={review.book.author}
								bookCover={review.book.cover_image!}
								comment={review.review}
								rating={Number(userBookRating?.rating)}
								user={review.user}
							/>
						);
					})}
				</ReviewsContainer>
			</RecentViewsContainer>

			<TrendingContainer>
				<BreadcrumbTitleContainer>
					<span>Livros populares</span>
					<NavButton onClick={() => router.push('/explore')}>
						Ver todos <CaretRight size={16} weight='bold' />
					</NavButton>
				</BreadcrumbTitleContainer>

				<TrandingBooksList>
					{top4MostPopularBooks.map((book) => {
						return <TrendingBooks key={book.id} bookTitle={book.title} bookAuthor={book.author} bookCover={book.cover_image!} rating={book.average} />;
					})}
				</TrandingBooksList>
			</TrendingContainer>
		</HomeContainer>
	);
}

Home.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await getServerSession(req, res, buildNextAuthOptions(req, res));

	const bookReviews = await prisma.bookReview.findMany({
		include: {
			book: true,
			user: {
				include: {
					ratingBook: true,
				},
			},
		},
		orderBy: {
			created_at: 'desc',
		},
		take: 8,
	});

	const userLatestBookReview = await prisma.bookReview.findFirst({
		where: {
			user_id: session?.user.id,
		},
		include: {
			book: true,
			user: {
				include: {
					ratingBook: true,
				},
			},
		},
		orderBy: {
			created_at: 'desc',
		},
	});

	const booksWithRating = await prisma.book.findMany({
		include: {
			ratingBook: true,
		},
	});

	const averageRatingBooks = booksWithRating.map((book) => {
		const average = ratingCalculate(book.ratingBook);

		return {
			...book,
			average,
		};
	});

	const filteredOnlyRatedBooks = averageRatingBooks.filter((book) => {
		return !isNaN(book.average);
	});

	const mostPopularBooks = filteredOnlyRatedBooks.sort((prev, current) => {
		return current.average - prev.average;
	});

	const top4MostPopularBooks = mostPopularBooks.splice(0, 4);

	return {
		props: {
			session: JSON.parse(JSON.stringify(session)),
			bookReviews: JSON.parse(JSON.stringify(bookReviews)),
			userLatestBookReview: JSON.parse(JSON.stringify(userLatestBookReview)),
			top4MostPopularBooks: JSON.parse(JSON.stringify(top4MostPopularBooks)),
		},
	};
};
