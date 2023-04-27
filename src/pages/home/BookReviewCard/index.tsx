import dayjs from 'dayjs';
import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import * as Collapsible from '@radix-ui/react-collapsible';

import { User } from '@prisma/client';
import { UserAvatar } from '@/components/UserAvatar';
import { StarsRatingView } from '@/components/Rating/StarsRatingView';

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

export function BookReviewCard({ userName, user, publishedDate, updatedAt, bookTitle, bookAuthor, bookCover, comment, rating }: IBookReviewCardProps) {
	const [open, setOpen] = useState(false);

	console.log(rating);

	let published_date = dayjs(publishedDate);

	if (updatedAt) {
		published_date = dayjs(updatedAt);
	}

	const publishedDateFormatted = published_date.format('DD[ de ]MMMM[ às ]HH:mm');
	const publishedDistanceToNow = published_date.fromNow();

	const CollapsibleRoot = styled(Collapsible.Root, {
		width: 300,
	});

	return (
		<BookReviewContainer>
			<HeaderReview>
				<div className='profileInfos'>
					<div>
						<UserAvatar userSession={user} size={40} />
					</div>
					<div className='group'>
						<span>{userName}</span>
						<time title={publishedDateFormatted} dateTime={published_date.toISOString()}>
							{publishedDistanceToNow}
						</time>
					</div>
				</div>
				<StarsRatingView rating={rating} />
			</HeaderReview>

			<ReviewContainer>
				<Image src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${bookCover}`} height={152} width={108} quality={100} alt={`${bookTitle} cover`} />

				<div className='group'>
					<BookInfos>
						<span>{bookTitle}</span>
						<i>{bookAuthor}</i>
					</BookInfos>

					<CollapsibleRoot open={open} onOpenChange={setOpen} css={{ width: '100%' }}>
						<CommentContainer>
							<p>
								{comment.substring(0, 192)} {!open ? '...' : <CollapsibleContent className='CollapsibleContent'>{comment.substring(192)}</CollapsibleContent>}
							</p>
							<CollapsibleTrigger asChild>
								<CollapsibleButton>{!open ? 'ver mais' : 'ver menos'}</CollapsibleButton>
							</CollapsibleTrigger>
						</CommentContainer>
					</CollapsibleRoot>
				</div>
			</ReviewContainer>
		</BookReviewContainer>
	);
}
