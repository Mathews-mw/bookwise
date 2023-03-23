import dayjs from 'dayjs';
import { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import * as Collapsible from '@radix-ui/react-collapsible';

import { StarsRating } from '@/components/Rating/StarsRating';

import { styled } from '@/styles';
import {
	BookInfos,
	BookReviewContainer,
	HeaderReview,
	ImageFrame,
	ReviewContainer,
	CommentContainer,
	CollapsibleContent,
	CollapsibleTrigger,
	CollapsibleButton,
} from './styles';

interface IBookReviewCardProps {
	userName: string;
	publishedDate: string;
	userAvatar: string | StaticImageData;
	bookTitle: string;
	bookAuthor: string;
	bookCover: string | StaticImageData;
	comment: string;
}

export function BookReviewCard({ userName, publishedDate, userAvatar, bookTitle, bookAuthor, bookCover, comment }: IBookReviewCardProps) {
	const [open, setOpen] = useState(false);

	const published_date = dayjs(publishedDate);
	const publishedDateFormatted = published_date.format('DD[ de ]MMMM[ às ]HH:mm');
	const publishedDistanceToNow = published_date.fromNow();

	const CollapsibleRoot = styled(Collapsible.Root, {
		width: 300,
	});

	return (
		<BookReviewContainer>
			<HeaderReview>
				<div className='profileInfos'>
					<ImageFrame>
						<Image src={userAvatar} height={40} alt='Profile picture' />
					</ImageFrame>
					<div className='group'>
						<span>{userName}</span>
						<time title={publishedDateFormatted} dateTime={published_date.toISOString()}>
							{publishedDistanceToNow}
						</time>
					</div>
				</div>
				<StarsRating precision={1 / 2} />
			</HeaderReview>

			<ReviewContainer>
				<Image src={bookCover} height={152} width={108} quality={100} alt={`${bookTitle} cover`} />

				<div className='group'>
					<BookInfos>
						<span>{bookTitle}</span>
						<i>{bookAuthor}</i>
					</BookInfos>

					<CollapsibleRoot open={open} onOpenChange={setOpen} css={{ width: '100%' }}>
						<CommentContainer>
							<p>
								{comment.substring(0, 229)} {!open ? '...' : <CollapsibleContent className='CollapsibleContent'>{comment.substring(229)}</CollapsibleContent>}
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
