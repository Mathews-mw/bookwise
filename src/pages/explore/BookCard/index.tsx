import Image from 'next/image';
import { motion } from 'framer-motion';

import { theme } from '@/styles';
import { ratingCalculate } from '@/utils/rating-calculate';
import { StarsRatingView } from '@/components/Rating/StarsRatingView';
import { Book, BookCategory, RatingBook, UserBook } from '@prisma/client';

import { BookCardContainer, BookInfos, BookStatusContainer } from './styles';

interface IBookCardProps {
	book: Book & {
		bookCategory: BookCategory[];
		ratingBook: RatingBook[];
	};
	userBooks?: UserBook;
	onOpenDrawer: () => void;
	onSelectBook: () => void;
}

export function BookCard({ book, userBooks, onOpenDrawer, onSelectBook }: IBookCardProps) {
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

					{userBooks?.has_already_read ? (
						<BookStatusContainer style={{ background: `${theme.colors.green300}`, color: `${theme.colors.green100}` }}>LIDO</BookStatusContainer>
					) : userBooks?.is_reading ? (
						<BookStatusContainer style={{ background: `${theme.colors.yellow200}`, color: `${theme.colors.yellow100}` }}>LENDO</BookStatusContainer>
					) : userBooks?.wish_read ? (
						<BookStatusContainer style={{ background: `${theme.colors.blue200}`, color: `${theme.colors.blue100}` }}>QUERO LER</BookStatusContainer>
					) : (
						''
					)}
				</BookCardContainer>
			</motion.div>
		</>
	);
}
