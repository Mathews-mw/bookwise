import Image from 'next/image';

import { Books, BookmarksSimple, BookOpenText } from '@phosphor-icons/react';
import { AvatarFrame, UserAnalyticsContainer, UserInfosContainer, Rectangle, UserStatisticsContainer, ItemContainer } from './styles';

import user1 from '../../../assets/user1.jpg';
import BookStar from '../../../assets/book-star.svg';

export function UserAnalytics() {
	return (
		<UserAnalyticsContainer>
			<UserInfosContainer>
				<AvatarFrame>
					<Image src={user1} height={72} width={72} alt='User avatar' />
				</AvatarFrame>

				<div className='userName'>
					<strong>Lisa Rosser</strong>
					<time>membro desde 2022</time>
				</div>

				<Rectangle>
					<div className='bar'></div>
				</Rectangle>

				<UserStatisticsContainer>
					<ItemContainer>
						<Books size={32} />
						<div className='itensGroup'>
							<span>48</span>
							<span>Livros lidos</span>
						</div>
					</ItemContainer>

					<ItemContainer>
						<BookOpenText size={32} />
						<div className='itensGroup'>
							<span>3853</span>
							<span>Páginas lidas</span>
						</div>
					</ItemContainer>

					<ItemContainer>
						<BookmarksSimple size={32} />
						<div className='itensGroup'>
							<span>3853</span>
							<span>Categoria mais lida</span>
						</div>
					</ItemContainer>

					<ItemContainer>
						<Image src={BookStar} alt='book star icon' />
						<div className='itensGroup'>
							<span>10</span>
							<span>Livros avaliados</span>
						</div>
					</ItemContainer>
				</UserStatisticsContainer>
			</UserInfosContainer>
		</UserAnalyticsContainer>
	);
}
