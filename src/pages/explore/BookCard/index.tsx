import Image from 'next/image';
import { motion } from 'framer-motion';

import { ratingCalculate } from '@/utils/rating-calculate';
import { Book, BookCategory, RatingBook } from '@prisma/client';
import { StarsRatingView } from '@/components/Rating/StarsRatingView';

import { BookCardContainer, BookInfos, AlreadyReadContainer } from './styles';

interface IBookCardProps {
	book: Book & {
		bookCategory: BookCategory[];
		ratingBook: RatingBook[];
	};
	onOpenDrawer: () => void;
	onSelectBook: () => void;
}

export function BookCard({ book, onOpenDrawer, onSelectBook }: IBookCardProps) {
	function handlerOpenDrawer() {
		onOpenDrawer();
		onSelectBook();
	}

	return (
		<>
			<motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
				<BookCardContainer onClick={handlerOpenDrawer}>
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

						{book.ratingBook.length > 0 ? <StarsRatingView rating={ratingCalculate(book.ratingBook)} /> : <StarsRatingView rating={0} />}
					</div>
					<AlreadyReadContainer>LIDO</AlreadyReadContainer>
				</BookCardContainer>
			</motion.div>
		</>
	);
}
