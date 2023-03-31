import dayjs from 'dayjs';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { UserPostComment } from './UserPostComment';
import { Button } from '@/components/Action/Button/buttons';
import { StarsRatingView } from '@/components/Rating/StarsRatingView';

import { BookmarkSimple, BookOpen } from '@phosphor-icons/react';
import {
	AboutContainer,
	BookCardContainer,
	BookDetail,
	BookInfos,
	CommentCard,
	CommentsContainer,
	Container,
	HeaderComment,
	ImageFrame,
	TextComment,
	TitleContainer,
} from './styles';

import userAvatar from '../../../assets/user3.jpg';
import bookCoverImg from '../../../assets/14-habitos-de-desenvolvedores-altamente-produtivos.png';
import { useState } from 'react';

export function SidePanel() {
	const [showUserCommentCard, setShowUserCommentCard] = useState(false);

	const published_date = dayjs('2023-03-21 20:15:00');
	const publishedDateFormatted = published_date.format('DD[ de ]MMMM[ às ]HH:mm');
	const publishedDistanceToNow = published_date.fromNow();

	return (
		<Container>
			<BookDetail>
				<BookCardContainer>
					<Image src={bookCoverImg} width={172} height={242} alt='book cover' />

					<div className='group'>
						<BookInfos>
							<span>14 Hábitos de Desenvolvedores Altamente Produtivos</span>
							<i>Zeno Rocha</i>
						</BookInfos>

						<div className='view-rating'>
							<StarsRatingView rating={4} />
							<small>3 visualizações</small>
						</div>
					</div>
				</BookCardContainer>

				<div className='divider'></div>

				<AboutContainer>
					<div className='about-infos-group'>
						<BookmarkSimple size={24} />

						<div className='about-infos'>
							<small>Categoria</small>
							<span>Computação, Educação</span>
						</div>
					</div>

					<div className='about-infos-group'>
						<BookOpen size={24} />

						<div className='about-infos'>
							<small>Páginas</small>
							<span>160</span>
						</div>
					</div>
				</AboutContainer>
			</BookDetail>

			<TitleContainer>
				<span>Avaliações</span>
				<Button variant='ghost' colorScheme='purple' size='sm' onClick={() => setShowUserCommentCard(!showUserCommentCard)}>
					Avaliar
				</Button>
			</TitleContainer>

			<CommentsContainer>
				{showUserCommentCard && (
					<motion.div
						initial={{ y: -10, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						exit={{ y: -10, opacity: 0 }}
						transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
					>
						<UserPostComment closeComment={() => setShowUserCommentCard(!showUserCommentCard)} />
					</motion.div>
				)}

				{Array.from({ length: 4 }).map((_, index) => {
					return (
						<CommentCard key={index}>
							<HeaderComment>
								<div className='profileInfos'>
									<ImageFrame>
										<Image src={userAvatar} alt='Profile picture' />
									</ImageFrame>
									<div className='group'>
										<span>Sarah Botosh</span>
										<time title={publishedDateFormatted} dateTime={published_date.toISOString()}>
											{publishedDistanceToNow}
										</time>
									</div>
								</div>
								<StarsRatingView rating={4} />
							</HeaderComment>

							<TextComment>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat obcaecati accusantium molestias libero nulla commodi, sunt doloribus a?
									Praesentium eveniet beatae voluptas quod consectetur voluptates iusto facilis velit rerum et.
								</p>
							</TextComment>
						</CommentCard>
					);
				})}
			</CommentsContainer>
		</Container>
	);
}
