import Image from 'next/image';

import { Book, BookCategory, RatingBook } from '@prisma/client';
import { StarsRatingView } from '@/components/Rating/StarsRatingView';

import { BookCardContainer, BookInfos, AlreadyReadContainer } from './styles';

interface IBookCardProps {
	book: Book & {
		bookCategory: BookCategory[];
		ratingBook: RatingBook[];
	};
}

export function BookCard({ book }: IBookCardProps) {
	return (
		<BookCardContainer>
			{}
			<AlreadyReadContainer>LIDO</AlreadyReadContainer>
			<Image
				src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${book.cover_image}`}
				alt={`Imagem da capa do livro ${book.title}`}
				height={152}
				width={108}
			/>

			<div className='group'>
				<BookInfos>
					<span>{book.title}</span>
					<i>{book.author}</i>
				</BookInfos>
				<StarsRatingView rating={0} />
			</div>
		</BookCardContainer>
	);
}
