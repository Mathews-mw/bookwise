import { z } from 'zod';
import { User } from 'next-auth';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { queryClient } from '@/lib/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { theme } from '@/styles';
import { api } from '@/lib/axios';
import { Check, X } from '@phosphor-icons/react';
import { UserAvatar } from '@/components/UserAvatar';
import { TextArea } from '@/components/Form/TextArea';
import { Spinner } from '@/components/Loaders/Spinner';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/Action/Button/buttons';
import { ShowErrorRequest } from '@/utils/ShowErrorRequest';
import { StarsRating } from '@/components/Rating/StarsRating';
import { ShowSuccessRequest } from '@/utils/ShowSuccessRequest';

import { Container, HeaderComment, TextComment } from './styles';
import { useQuery } from '@tanstack/react-query';
import { BookReview, RatingBook } from '@prisma/client';

interface IBookReviewResponse extends BookReview {
	user: {
		ratingBook: RatingBook[];
	};
}

interface IUserPostCommentProps {
	closeComment: () => void;
	userSession: User;
	bookId: string;
}

const ratingEditFormSchema = z.object({
	review: z.string().min(1, { message: 'Campo obrigatório' }),
});

type RatingEditFormData = z.infer<typeof ratingEditFormSchema>;

export function UserEditPostComment({ userSession, closeComment, bookId }: IUserPostCommentProps) {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<RatingEditFormData>({
		resolver: zodResolver(ratingEditFormSchema),
	});

	const [actionLoading, setActionLoading] = useState(false);
	const [ratingValue, setRatingValue] = useState(0);
	const [ratingError, setRatingError] = useState(false);

	const { data: bookReview, isFetching } = useQuery<IBookReviewResponse>(['user-review', bookId, userSession.id], async () => {
		const { data } = await api.get(`/books/${bookId}/get-review`);

		return data;
	});

	function handlerRatingValue(value: number) {
		setRatingValue(value);
		setRatingError(false);
	}

	async function handleEditReviewForm(data: RatingEditFormData) {
		if (ratingValue <= 0) {
			setRatingError(!ratingError);
			return;
		}

		try {
			setActionLoading(true);

			const { data: result } = await api.put(`/books/${bookId}/update-review`, {
				review: data.review,
				rating: ratingValue,
			});

			reset();
			setRatingValue(0);
			closeComment();

			setActionLoading(false);
			queryClient.invalidateQueries(['book', bookId]);
			ShowSuccessRequest(result);
		} catch (error) {
			setActionLoading(false);
			ShowErrorRequest(error);
		}
	}

	return (
		<>
			{!isFetching ? (
				<Container>
					<HeaderComment>
						<div className='profileInfos'>
							<UserAvatar userSession={userSession} />
							<span>{userSession.name}</span>
						</div>
						<StarsRating precision={1 / 2} defaultValue={Number(bookReview?.user.ratingBook[0].rating)} getRatingStars={(value) => handlerRatingValue(value)} />
					</HeaderComment>

					<TextComment onSubmit={handleSubmit(handleEditReviewForm)}>
						<TextArea minHeight={164} maxCharacteres={450} defaultValue={bookReview?.review} placeholder='Escreva sua avaliação' {...register('review')} />

						<div className='group-elements'>
							{actionLoading ? <Spinner /> : <div></div>}

							<div className='btn-group'>
								<Button size='sm' onClick={() => closeComment()}>
									<X weight='bold' />
								</Button>

								<Button size='sm' disabled={isSubmitting || actionLoading || ratingError}>
									<Check color={`${theme.colors.green100}`} weight='bold' />
								</Button>
							</div>
						</div>
					</TextComment>
					{errors.review && <ErrorMessage error={errors.review} />}
					{ratingError && <ErrorMessage>*Você precisa selecionar algum valor de estrelas antes de enviar sua avaliação.</ErrorMessage>}
				</Container>
			) : (
				<Spinner />
			)}
		</>
	);
}
