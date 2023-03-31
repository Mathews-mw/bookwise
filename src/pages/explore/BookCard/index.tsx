import Image from 'next/image';
import { motion } from 'framer-motion';

import { Book, BookCategory, RatingBook } from '@prisma/client';
import { StarsRatingView } from '@/components/Rating/StarsRatingView';

import { BookCardContainer, BookInfos, AlreadyReadContainer } from './styles';

interface IBookCardProps {
	book: Book & {
		bookCategory: BookCategory[];
		ratingBook: RatingBook[];
	};
	onOpenDrawer: () => void;
}

export function BookCard({ book, onOpenDrawer }: IBookCardProps) {
	return (
		<motion.div whileHover={{ scale: 1.03 }} transition={{ type: 'spring', stiffness: 400, damping: 10 }}>
			<BookCardContainer onClick={onOpenDrawer}>
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
		</motion.div>
	);
}
