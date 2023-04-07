import { ReactElement } from 'react';

import { Header } from '@/components/Header';
import DefaultLayout from '@/layouts/Default';
import { UserAnalytics } from './UserAnalytics';
import { MyBookReviewCard } from './MyBookReviewCard';
import { TextInput } from '@/components/Form/TextInput';

import { MagnifyingGlass, User } from '@phosphor-icons/react';
import { PerfilContainer, HeaderContainer, MyBookReviewsContainer, AnalyticsSidebarContainer, ReviewsContainer } from './styles';

import OHobbit from '../../assets/o-hobbit.png';
import Algoritmos from '../../assets/entendendo-algoritmos.png';
import MochileirosGalaxias from '../../assets/o-guia-do-mochileiro-das-galaxias.png';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api';
import { prisma } from '@/lib/prisma';
import { Book, BookCategory, Category, RatingBook, UserBook, User as UserPrisma } from '@prisma/client';
import { useSession } from 'next-auth/react';
import lodash from 'lodash';

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
}

export default function Perfil({ user, userBooks, ratingBooks, MostReadUniqueCategories }: IPerfilProps) {
	const session = useSession();

	return (
		<PerfilContainer>
			<HeaderContainer>
				<Header>
					<User size={32} />
					<h3>Perfil</h3>
				</Header>
			</HeaderContainer>

			<MyBookReviewsContainer>
				<TextInput placeholder='Buscar livro avaliado' iconRight={<MagnifyingGlass size={20} />} />
				<ReviewsContainer>
					<MyBookReviewCard
						bookTitle='Entendendo Algoritmos'
						bookAuthor='Aditya Bhargava'
						bookCover={Algoritmos}
						userBookRating={4}
						puplishedAt='2023-03-24 15:15:00'
						userOpinion='Tristique massa sed enim lacinia odio. Congue ut faucibus nunc vitae non. Nam feugiat vel morbi viverra vitae mi. Vitae fringilla ut et suspendisse enim suspendisse vitae. Leo non eget lacus sollicitudin tristique pretium quam. Mollis et luctus amet sed convallis varius massa sagittis. Proin sed proin at leo quis ac sem. Nam donec accumsan curabitur amet tortor quam sit. Bibendum enim sit dui lorem urna amet elit rhoncus ut. Aliquet euismod vitae ut turpis. Aliquam amet integer pellentesque.'
					/>

					<MyBookReviewCard
						bookTitle='O Hobbit'
						bookAuthor='J.R.R. Tolkien'
						bookCover={OHobbit}
						userBookRating={3.5}
						puplishedAt='2023-03-21 20:15:00'
						userOpinion='Nec tempor nunc in egestas. Euismod nisi eleifend at et in sagittis. Penatibus id vestibulum imperdiet a at imperdiet.'
					/>

					<MyBookReviewCard
						bookTitle='O guia do mochileiro das galáxias'
						bookAuthor='Douglas Adams'
						bookCover={MochileirosGalaxias}
						userBookRating={5}
						puplishedAt='2023-03-11 22:25:00'
						userOpinion='Ultrices nisl eu id id mattis. Adipiscing est sapien ut vestibulum nec enim. Nisi interdum orci malesuada nisi. Habitant placerat velit enim malesuada senectus ipsum. Ultricies nisl dictum integer hendrerit amet enim. Facilisis consectetur imperdiet ultrices mattis pharetra viverra magnis.'
					/>
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
			session,
			user: JSON.parse(JSON.stringify(user)),
			userBooks,
			ratingBooks: JSON.parse(JSON.stringify(ratingBooks)),
			MostReadUniqueCategories,
		},
	};
};
