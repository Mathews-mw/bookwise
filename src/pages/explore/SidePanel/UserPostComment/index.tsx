import { z } from 'zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { queryClient } from '@/lib/react-query';
import { zodResolver } from '@hookform/resolvers/zod';

import { theme } from '@/styles';
import { api } from '@/lib/axios';
import { User } from '@prisma/client';
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

interface IUserPostCommentProps {
	closeComment: () => void;
	userSession: User;
	bookId: string;
}

const ratingFormSchema = z.object({
	review: z.string().min(1, { message: 'Campo obrigatório' }),
});

type RatingFormData = z.infer<typeof ratingFormSchema>;

export function UserPostComment({ userSession, closeComment, bookId }: IUserPostCommentProps) {
	const {
		handleSubmit,
		register,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<RatingFormData>({
		resolver: zodResolver(ratingFormSchema),
	});

	const [actionLoading, setActionLoading] = useState(false);
	const [ratingValue, setRatingValue] = useState(0);
	const [ratingError, setRatingError] = useState(false);

	function handlerRatingValue(value: number) {
		setRatingValue(value);
		setRatingError(false);
	}

	async function handleReviewForm(data: RatingFormData) {
		if (ratingValue <= 0) {
			setRatingError(!ratingError);
			return;
		}

		try {
			setActionLoading(true);

			const { data: result } = await api.post(`/books/${bookId}/review`, {
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
		<Container>
			<HeaderComment>
				<div className='profileInfos'>
					<UserAvatar userSession={userSession} />
					<span>{userSession.name}</span>
				</div>
				<StarsRating precision={1 / 2} getRatingStars={(value) => handlerRatingValue(value)} />
			</HeaderComment>

			<TextComment onSubmit={handleSubmit(handleReviewForm)}>
				<TextArea minHeight={164} maxCharacteres={450} placeholder='Escreva sua avaliação' {...register('review')} />

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
	);
}
