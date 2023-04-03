import dayjs from 'dayjs';

import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'next-auth/core/types';
import { useQuery } from '@tanstack/react-query';

import { api } from '@/lib/axios';
import { UserPostComment } from './UserPostComment';
import { Button } from '@/components/Action/Button/buttons';
import { StarsRatingView } from '@/components/Rating/StarsRatingView';
import { Book, BookCategory, Category, RatingBook, BookReview } from '@prisma/client';

import { BookmarkSimple, BookOpen, X } from '@phosphor-icons/react';
import {
	AboutContainer,
	BookCardContainer,
	BookDetail,
	BookInfos,
	CommentCard,
	CommentsContainer,
	Container,
	HeaderComment,
	HeaderContainer,
	TextComment,
	TitleContainer,
	EmptyCommentContainer,
} from './styles';

import emptyImg from '../../../assets/free-time.png';
import { UserAvatar } from '@/components/UserAvatar';
import { ratingCalculate } from '@/utils/rating-calculate';
import { BookDetailSkeleton } from './SkeletonsSidePanel/BookDetailSkeleton';
import { TitleContainerSkeleton } from './SkeletonsSidePanel/TitleContainerSkeleton';
import { PostCommentSkeleton } from './SkeletonsSidePanel/PostCommentSkeleton';
import { ContextMenu } from '@/components/ContextMenu';

interface IBookCategory extends BookCategory {
	category: Category;
}

interface IBookReview extends BookReview {
	user: User;
}

interface IBook extends Book {
	bookCategory: IBookCategory[];
	ratingBook: RatingBook[];
	bookReview: IBookReview[];
}

interface ISidePanelProps {
	bookId: string;
	userSession?: User;
	onCloseDrawer: () => void;
}

export function SidePanel({ bookId, userSession, onCloseDrawer }: ISidePanelProps) {
	const [showUserCommentCard, setShowUserCommentCard] = useState(false);

	function handlerOpenReviewComment() {
		if (userSession) {
			setShowUserCommentCard(!showUserCommentCard);
		} else {
			alert('você precisa estar logado');
		}
	}

	const { data: book, isFetching } = useQuery<IBook>(['book', bookId], async () => {
		const { data } = await api.get(`/books/${bookId}`);

		return data;
	});

	const UserAlreadyRatedBook = book?.ratingBook.some((rating) => {
		return rating.user_id === userSession?.id;
	});

	return (
		<Container>
			<HeaderContainer>
				{book && <ContextMenu bookId={book.id} />}
				<Button size='sm' variant='ghost' onClick={() => onCloseDrawer()}>
					<X weight='bold' />
				</Button>
			</HeaderContainer>

			{!isFetching ? (
				<BookDetail>
					<BookCardContainer>
						<Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL}/uploads/${book?.cover_image}`} width={172} height={242} alt='book cover' />

						<div className='group'>
							<BookInfos>
								<span>{book?.title}</span>
								<i>{book?.author}</i>
							</BookInfos>

							<div className='view-rating'>
								{book?.ratingBook && book.ratingBook.length > 0 ? (
									<StarsRatingView rating={ratingCalculate(book.ratingBook)} />
								) : (
									<StarsRatingView rating={0} />
								)}
								{book?.ratingBook && (
									<small>
										{book.ratingBook.length} {book.ratingBook.length <= 1 ? 'Avaliação' : 'Avaliações'}
									</small>
								)}
							</div>
						</div>
					</BookCardContainer>

					<div className='divider'></div>

					<AboutContainer>
						<div className='about-infos-group'>
							<BookmarkSimple size={24} />

							<div className='about-infos'>
								<small>Categoria</small>
								<span>{book?.bookCategory.map((category) => category.category.category).join(', ')}</span>
							</div>
						</div>

						<div className='about-infos-group'>
							<BookOpen size={24} />

							<div className='about-infos'>
								<small>Páginas</small>
								<span>{book?.total_pages}</span>
							</div>
						</div>
					</AboutContainer>
				</BookDetail>
			) : (
				<BookDetailSkeleton />
			)}

			{!isFetching ? (
				<TitleContainer>
					<span>Avaliações</span>
					{UserAlreadyRatedBook ? (
						<small>Você já avaliou esse livro 😀</small>
					) : (
						<Button variant='ghost' colorScheme='purple' size='sm' onClick={() => handlerOpenReviewComment()}>
							Avaliar
						</Button>
					)}
				</TitleContainer>
			) : (
				<TitleContainerSkeleton />
			)}

			{!isFetching ? (
				<CommentsContainer>
					{showUserCommentCard && userSession && book && (
						<motion.div
							initial={{ y: -10, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -10, opacity: 0 }}
							transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
						>
							<UserPostComment userSession={userSession} bookId={book.id} closeComment={() => setShowUserCommentCard(!showUserCommentCard)} />
						</motion.div>
					)}

					{book?.bookReview && book?.bookReview.length > 0 ? (
						book.bookReview.map((review) => {
							const published_date = dayjs(review.created_at);
							const publishedDateFormatted = published_date.format('DD[ de ]MMMM[ às ]HH:mm');
							const publishedDistanceToNow = published_date.fromNow();

							const userRating = book.ratingBook.find((book) => {
								return book.book_id === review.book_id && book.user_id === review.user_id;
							});

							const ratingFormatted = Number(userRating?.rating);

							return (
								<CommentCard key={review.id} data-current-user={review.user_id === userSession?.id}>
									<HeaderComment>
										<div className='profileInfos'>
											<UserAvatar userSession={review.user} size={44} />

											<div className='group'>
												<span>{review.user.name}</span>
												<time title={publishedDateFormatted} dateTime={published_date.toISOString()}>
													{publishedDistanceToNow}
												</time>
											</div>
										</div>
										<StarsRatingView rating={ratingFormatted} />
									</HeaderComment>

									<TextComment>
										<p>{review.review}</p>
									</TextComment>
								</CommentCard>
							);
						})
					) : (
						<EmptyCommentContainer>
							<Image src={emptyImg} alt='Sem comentários ilustração' width={170} height={193} priority quality={100} />

							<span>Sem comentários por aqui...</span>
							<span>Que tal ser o primeiro a avaliar este livro?</span>
						</EmptyCommentContainer>
					)}
				</CommentsContainer>
			) : (
				<CommentsContainer>
					{Array.from({ length: 2 }).map((_, index) => {
						return <PostCommentSkeleton key={index} />;
					})}
				</CommentsContainer>
			)}
		</Container>
	);
}
