import dayjs from 'dayjs';
import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import * as Collapsible from '@radix-ui/react-collapsible';

import { User } from '@prisma/client';
import { UserAvatar } from '@/components/UserAvatar';
import { StarsRating } from '@/components/Rating/StarsRating';

import { styled } from '@/styles';
import {
	BookInfos,
	BookReviewContainer,
	HeaderReview,
	ReviewContainer,
	CommentContainer,
	CollapsibleContent,
	CollapsibleTrigger,
	CollapsibleButton,
} from './styles';
import { StarsRatingView } from '@/components/Rating/StarsRatingView';

interface IBookReviewCardProps {
	userName: string;
	publishedDate: Date;
	updatedAt?: Date;
	bookTitle: string;
	bookAuthor: string;
	bookCover: string | StaticImageData;
	comment: string;
	rating: number;
	user: User;
}

export function UserReviewCard({ userName, user, publishedDate, updatedAt, bookTitle, bookAuthor, bookCover, comment, rating }: IBookReviewCardProps) {
	const [open, setOpen] = useState(false);

	let published_date = dayjs(publishedDate);

	if (updatedAt) {
		published_date = dayjs(updatedAt);
	}

	const publishedDateFormatted = published_date.format('DD[ de ]MMMM[ às ]HH:mm');
	const publishedDistanceToNow = published_date.fromNow();

	const CollapsibleRoot = styled(Collapsible.Root, {
		width: 300,
	});

	console.log('rating: ', rating);

	return (
		<BookReviewContainer>
			<ReviewContainer>
				<Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${bookCover}`} height={152} width={108} quality={100} alt={`${bookTitle} cover`} />

				<div className='group'>
					<HeaderReview>
						<time title={publishedDateFormatted} dateTime={published_date.toISOString()}>
							{publishedDistanceToNow}
						</time>
						<StarsRatingView rating={rating} />
					</HeaderReview>

					<BookInfos>
						<span>{bookTitle}</span>
						<i>{bookAuthor}</i>
					</BookInfos>

					<CollapsibleRoot open={open} onOpenChange={setOpen} css={{ width: '100%' }}>
						<CommentContainer>
							<p>{comment}</p>
						</CommentContainer>
					</CollapsibleRoot>
				</div>
			</ReviewContainer>
		</BookReviewContainer>
	);
}
