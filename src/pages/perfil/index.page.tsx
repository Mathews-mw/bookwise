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

export default function Perfil() {
	return (
		<PerfilContainer>
			<HeaderContainer>
				<Header>
					<User size={22} />
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
				<UserAnalytics />
			</AnalyticsSidebarContainer>
		</PerfilContainer>
	);
}

Perfil.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};
