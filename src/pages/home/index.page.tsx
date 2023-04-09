import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';

import { prisma } from '@/lib/prisma';
import { Header } from '@/components/Header';
import DefaultLayout from '@/layouts/Default';
import { TrendingBooks } from './TredingBooks';
import { BookReviewCard } from './BookReviewCard';
import { Book, BookReview, RatingBook, User } from '@prisma/client';
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api';

import { CaretRight, ChartLineUp } from '@phosphor-icons/react';
import {
	MainContainer,
	BreadcrumbTitleContainer,
	RecentViewsContainer,
	UserReviewContainer,
	ReviewsContainer,
	TrendingContainer,
	TrandingBooksList,
	NavButton,
} from './styles';

import RevolucaoBichos from '../../assets/Book.png';
import Algoritmos from '../../assets/entendendo-algoritmos.png';
import FimDaEternidade from '../../assets/o-fim-da-eternidade.png';
import Habitos from '../../assets/14-habitos-de-desenvolvedores-altamente-produtivos.png';
import { UserReviewCard } from './UserReviewCard';

interface IBookReviews extends BookReview {
	book: Book;
	user: User & { ratingBook: RatingBook[] };
}

interface IHomeProps {
	bookReviews: IBookReviews[];
	userLatestBookReview: IBookReviews;
}

export default function Home({ bookReviews, userLatestBookReview }: IHomeProps) {
	return (
		<MainContainer>
			<RecentViewsContainer>
				<Header css={{ padding: '40px 0' }}>
					<ChartLineUp size={32} />
					<h3>Início</h3>
				</Header>

				<BreadcrumbTitleContainer>
					<span>Avaliações mais recentes</span>
				</BreadcrumbTitleContainer>

				<UserReviewContainer>
					<UserReviewCard
						userName={userLatestBookReview.user.name}
						publishedDate={userLatestBookReview.created_at}
						updatedAt={userLatestBookReview.updated_at ?? undefined}
						bookTitle={userLatestBookReview.book.title}
						bookAuthor={userLatestBookReview.book.author}
						bookCover={userLatestBookReview.book.cover_image!}
						comment={userLatestBookReview.review}
						rating={Number(userLatestBookReview.user.ratingBook[0].rating)}
						user={userLatestBookReview.user}
					/>
				</UserReviewContainer>

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
					<NavButton>
						Ver todos <CaretRight size={16} weight='bold' />
					</NavButton>
				</BreadcrumbTitleContainer>

				<TrandingBooksList>
					<TrendingBooks bookTitle='A revolução dos bichos' bookAuthor='George Orwell' bookCover={RevolucaoBichos} rating={3} />
					<TrendingBooks bookTitle='14 hábitos de desenvolvedores altamente produtivos' bookAuthor='Zeno Rocha' bookCover={Habitos} rating={3.5} />
					<TrendingBooks bookTitle='O fim da eternidade' bookAuthor='Issac Asimov' bookCover={FimDaEternidade} rating={5} />
					<TrendingBooks bookTitle='Entendendo Algoritmos' bookAuthor='Aditya Bhargava' bookCover={Algoritmos} rating={3.5} />
				</TrandingBooksList>
			</TrendingContainer>
		</MainContainer>
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

	return {
		props: {
			session,
			bookReviews: JSON.parse(JSON.stringify(bookReviews)),
			userLatestBookReview: JSON.parse(JSON.stringify(userLatestBookReview)),
		},
	};
};
