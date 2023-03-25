import Image from 'next/image';

import { StarsRatingView } from '@/components/Rating/StarsRatingView';

import { BookCardContainer, BookInfos } from './styles';

import CodigoLimpo from '../../../assets/codigo-limpo.png';

export function BookCard() {
	return (
		<BookCardContainer>
			<Image src={CodigoLimpo} alt='Book cover' height={152} width={108} />

			<div className='group'>
				<BookInfos>
					<span>Revolução</span>
					<i>George Orwell</i>
				</BookInfos>
				<StarsRatingView rating={4.5} />
			</div>
		</BookCardContainer>
	);
}
