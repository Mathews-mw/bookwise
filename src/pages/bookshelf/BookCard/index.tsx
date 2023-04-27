import Image from 'next/image';

import { Book, BookCategory } from '@prisma/client';

import { BookCardContainer, BookInfos } from './styles';

interface IBookCardProps {
	book: Book & {
		bookCategory: BookCategory[];
	};
	onSelectBook: () => void;
}

export function BookCard({ book, onSelectBook }: IBookCardProps) {
	function handlerOpenDrawer() {
		onSelectBook();
	}

	return (
		<BookCardContainer onClick={handlerOpenDrawer}>
			<Image src={`${process.env.NEXT_PUBLIC_BASE_IMAGE_URL}/${book.cover_image}`} alt={`Imagem da capa do livro ${book.title}`} height={152} width={108} />

			<div className='group'>
				<BookInfos>
					<span>{book.title}</span>
					<i>{book.author}</i>
				</BookInfos>
			</div>
		</BookCardContainer>
	);
}
