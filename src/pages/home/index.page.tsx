import dayjs from 'dayjs';
import Image from 'next/image';
import { ReactElement } from 'react';

import DefaultLayout from '@/layouts/Default';

import user1 from '../../assets/user1.jpg';
import { MainContainer, BreadcrumbTitle, BookReviewCard, HeaderReview, ImageFrame } from './styles';
import { StarsRating } from '@/components/StarsRating';

export default function Home() {
	const publishedDate = dayjs().set('D', 17);
	const publishedDateFormatted = publishedDate.format('DD[ de ]MMMM[ às ]HH:mm');
	const publishedDistanceToNow = publishedDate.fromNow();

	return (
		<MainContainer>
			<BreadcrumbTitle>
				<span>Avaliações mais recentes</span>
			</BreadcrumbTitle>

			<BookReviewCard>
				<HeaderReview>
					<div className='profileInfos'>
						<ImageFrame>
							<Image src={user1} height={40} alt='Profile picture' />
						</ImageFrame>
						<div className='group'>
							<span>Angela Vogl</span>
							<time title={publishedDateFormatted} dateTime={publishedDate.toISOString()}>
								{publishedDistanceToNow}
							</time>
						</div>
					</div>
					<StarsRating precision={1 / 2} />
				</HeaderReview>
			</BookReviewCard>
		</MainContainer>
	);
}

Home.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};
