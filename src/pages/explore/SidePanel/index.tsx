import dayjs from 'dayjs';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User } from 'next-auth/core/types';
import { useQuery } from '@tanstack/react-query';

import { theme } from '@/styles';
import { api } from '@/lib/axios';
import { UserPostComment } from './UserPostComment';
import { UserAvatar } from '@/components/UserAvatar';
import { ContextMenu } from '@/components/ContextMenu';
import { ratingCalculate } from '@/utils/rating-calculate';
import { Button } from '@/components/Action/Button/buttons';
import { UserEditPostComment } from './UserEditPostComment';
import { StarsRatingView } from '@/components/Rating/StarsRatingView';
import { BookDetailSkeleton } from './SkeletonsSidePanel/BookDetailSkeleton';
import { PostCommentSkeleton } from './SkeletonsSidePanel/PostCommentSkeleton';
import { TitleContainerSkeleton } from './SkeletonsSidePanel/TitleContainerSkeleton';
import { Book, BookCategory, Category, RatingBook, BookReview, UserBook } from '@prisma/client';

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
	BookStatusContainer,
} from './styles';

import emptyImg from '../../../assets/free-time.png';

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
	userBooks?: UserBook;
	onCloseDrawer: () => void;
}

export function SidePanel({ bookId, userSession, userBooks, onCloseDrawer }: ISidePanelProps) {
	const [showUserCommentCard, setShowUserCommentCard] = useState(false);
	const [showUserEditCommentCard, setShowUserEditCommentCard] = useState(false);

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
				{book && <ContextMenu bookId={book.id} userId={userSession?.id} userBook={userBooks} />}
				<Button size='sm' variant='ghost' onClick={() => onCloseDrawer()}>
					<X weight='bold' />
				</Button>
			</HeaderContainer>

			{!isFetching ? (
				<BookDetail>
					{userBooks?.has_already_read ? (
						<BookStatusContainer style={{ background: `${theme.colors.green300}`, color: `${theme.colors.green100}` }}>LIDO</BookStatusContainer>
					) : userBooks?.is_reading ? (
						<BookStatusContainer style={{ background: `${theme.colors.yellow200}`, color: `${theme.colors.yellow100}` }}>LENDO</BookStatusContainer>
					) : userBooks?.wish_read ? (
						<BookStatusContainer style={{ background: `${theme.colors.blue200}`, color: `${theme.colors.blue100}` }}>QUERO LER</BookStatusContainer>
					) : (
						''
					)}

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
					<div className='group-title'>
						<span>Avaliações</span>
						{UserAlreadyRatedBook && <small>Você já avaliou esse livro 😀</small>}
					</div>
					{UserAlreadyRatedBook ? (
						<Button variant='ghost' colorScheme='white' size='sm' onClick={() => setShowUserEditCommentCard(!showUserEditCommentCard)}>
							Editar comentário
						</Button>
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

					{showUserEditCommentCard && userSession && book && (
						<motion.div
							initial={{ y: -10, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: -10, opacity: 0 }}
							transition={{ duration: 0.5, type: 'spring', stiffness: 100 }}
						>
							<UserEditPostComment userSession={userSession} bookId={book.id} closeComment={() => setShowUserEditCommentCard(!showUserEditCommentCard)} />
						</motion.div>
					)}

					{book?.bookReview && book?.bookReview.length > 0 ? (
						book.bookReview.map((review) => {
							let published_date = dayjs(review.created_at);

							if (review.updated_at) {
								published_date = dayjs(review.updated_at);
							}

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
													{review.updated_at && 'modificado'} {publishedDistanceToNow}
												</time>
												{}
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
