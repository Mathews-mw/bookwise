import dayjs from 'dayjs';
import Image, { StaticImageData } from 'next/image';

import { StarsRatingView } from '@/components/Rating/StarsRatingView';

import { BookInfos, CardContainer, Container, HeaderCardContainer, OpinionCardContainer } from './styles';

interface IMyBookReviewCardProps {
	bookTitle: string;
	bookAuthor: string;
	bookCover: string | StaticImageData;
	userOpinion: string;
	userBookRating: number;
	puplishedAt: Date;
	updatedAt?: Date;
}

export function MyBookReviewCard({ bookTitle, bookAuthor, bookCover, userOpinion, puplishedAt, updatedAt, userBookRating }: IMyBookReviewCardProps) {
	let publishedDate = dayjs(puplishedAt);

	if (updatedAt) {
		publishedDate = dayjs(updatedAt);
	}

	const publishedDateFormatted = publishedDate.format('DD[ de ]MMMM[ às ]HH:mm');
	const publishedDistanceToNow = publishedDate.fromNow();

	return (
		<Container>
			<time title={publishedDateFormatted} dateTime={publishedDate.toISOString()}>
				{updatedAt && 'modificado'} {publishedDistanceToNow}
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
