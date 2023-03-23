import Image, { StaticImageData } from 'next/image';

import { StarsRatingView } from '@/components/Rating/StarsRatingView';

import { BookInfos, TrendingContainer } from './styles';

interface ITrendingProps {
	bookTitle: string;
	bookAuthor: string;
	bookCover: string | StaticImageData;
	rating: number;
}

export function TrendingBooks({ bookTitle, bookAuthor, bookCover, rating }: ITrendingProps) {
	return (
		<TrendingContainer>
			<Image width={64} height={94} src={bookCover} alt='Book cover' />

			<div className='group'>
				<BookInfos>
					<span>{bookTitle}</span>
					<i>{bookAuthor}</i>
				</BookInfos>
				<StarsRatingView rating={rating} />
			</div>
		</TrendingContainer>
	);
}
