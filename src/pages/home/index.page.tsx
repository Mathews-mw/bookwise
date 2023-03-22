import { ReactElement } from 'react';

import DefaultLayout from '@/layouts/Default';
import { BookReviewCard } from './BookReviewCard';

import { MainContainer, BreadcrumbTitle, ReviewsContainer } from './styles';

import user1 from '../../assets/user1.jpg';
import HobbitCover from '../../assets/o-hobbit.png';

export default function Home() {
	return (
		<MainContainer>
			<BreadcrumbTitle>
				<span>Avaliações mais recentes</span>
			</BreadcrumbTitle>

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
			</ReviewsContainer>
		</MainContainer>
	);
}

Home.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};
