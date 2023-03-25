import { ReactElement } from 'react';

import DefaultLayout from '@/layouts/Default';
import { TrendingBooks } from './TredingBooks';
import { BookReviewCard } from './BookReviewCard';

import { CaretRight, ChartLineUp } from '@phosphor-icons/react';
import { MainContainer, BreadcrumbTitleContainer, RecentViewsContainer, ReviewsContainer, TrendingContainer, TrandingBooksList, NavButton } from './styles';

import user1 from '../../assets/user1.jpg';
import user2 from '../../assets/user2.jpg';
import user3 from '../../assets/user3.jpg';
import HobbitCover from '../../assets/o-hobbit.png';
import RevolucaoBichos from '../../assets/Book.png';
import Algoritmos from '../../assets/entendendo-algoritmos.png';
import FimDaEternidade from '../../assets/o-fim-da-eternidade.png';
import PragmaticProgrammer from '../../assets/o-programador-pragmatico.png';
import GuiaGalaxia from '../../assets/o-guia-do-mochileiro-das-galaxias.png';
import Habitos from '../../assets/14-habitos-de-desenvolvedores-altamente-produtivos.png';
import { Header } from '@/components/Header';

export default function Home() {
	return (
		<MainContainer>
			<RecentViewsContainer>
				<Header css={{ padding: '40px 0' }}>
					<ChartLineUp size={22} />
					<h3>Início</h3>
				</Header>

				<BreadcrumbTitleContainer>
					<span>Avaliações mais recentes</span>
				</BreadcrumbTitleContainer>

				<ReviewsContainer>
					<BookReviewCard
						userName='Angela Vogl'
						publishedDate='2023-03-21 20:15:00'
						userAvatar={user1}
						bookTitle='O Hobbit'
						bookAuthor='J.R.R. Tolkien'
						bookCover={HobbitCover}
						comment='Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh. Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh.'
					/>

					<BookReviewCard
						userName='Dalton Paden'
						publishedDate='2023-02-18 15:25:30'
						userAvatar={user2}
						bookTitle='O guia do mochileiro das galáxias'
						bookAuthor='Douglas Adams'
						bookCover={GuiaGalaxia}
						comment='Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh. Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh.'
					/>

					<BookReviewCard
						userName='Camilla Moccha'
						publishedDate='2023-03-12 21:37:24'
						userAvatar={user3}
						bookTitle='O Programador Pragmático'
						bookAuthor='Andrew Hunt'
						bookCover={PragmaticProgrammer}
						comment='Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh. Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh. Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh. Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh.'
					/>
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
