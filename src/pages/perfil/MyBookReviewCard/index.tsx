import Image, { StaticImageData } from 'next/image';

import { StarsRatingView } from '@/components/Rating/StarsRatingView';

import { BookInfos, CardContainer, Container, HeaderCardContainer, OpinionCardContainer } from './styles';
import dayjs from 'dayjs';

interface IMyBookReviewCardProps {
	bookTitle: string;
	bookAuthor: string;
	bookCover: string | StaticImageData;
	userOpinion: string;
	puplishedAt: string;
	userBookRating: number;
}

export function MyBookReviewCard({ bookTitle, bookAuthor, bookCover, userOpinion, puplishedAt, userBookRating }: IMyBookReviewCardProps) {
	const publishedDate = dayjs(puplishedAt);
	const publishedDateFormatted = publishedDate.format('DD[ de ]MMMM[ às ]HH:mm');
	const publishedDistanceToNow = publishedDate.fromNow();

	return (
		<Container>
			<time title={publishedDateFormatted} dateTime={publishedDate.toISOString()}>
				{publishedDistanceToNow}
			</time>
			<CardContainer>
				<HeaderCardContainer>
					<Image src={bookCover} height={134} width={98} alt='Book cover' />

					<div className='group'>
						<BookInfos>
							<span>{bookTitle}</span>
							<i>{bookAuthor}</i>
						</BookInfos>
						<StarsRatingView rating={userBookRating} />
					</div>
				</HeaderCardContainer>

				<OpinionCardContainer>
					<p>{userOpinion}</p>
				</OpinionCardContainer>
			</CardContainer>
		</Container>
	);
}
