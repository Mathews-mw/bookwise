import dayjs from 'dayjs';
import Image from 'next/image';

import { Container, HeaderComment, ImageFrame, TextComment } from './styles';
import userAvatar from '../../../../assets/user2.jpg';
import { StarsRating } from '@/components/Rating/StarsRating';
import { TextArea } from '@/components/Form/TextArea';
import { Button } from '@/components/Action/Button/buttons';
import { Check, X } from '@phosphor-icons/react';
import { theme } from '@/styles';

interface Props {
	closeComment: () => void;
}

export function UserPostComment({ closeComment }: Props) {
	const published_date = dayjs('2023-03-21 20:15:00');
	const publishedDateFormatted = published_date.format('DD[ de ]MMMM[ às ]HH:mm');
	const publishedDistanceToNow = published_date.fromNow();

	return (
		<Container>
			<HeaderComment>
				<div className='profileInfos'>
					<ImageFrame>
						<Image src={userAvatar} alt='Profile picture' />
					</ImageFrame>
					<span>Cristofer Rosser</span>
				</div>
				<StarsRating precision={1 / 2} />
			</HeaderComment>

			<TextComment>
				<TextArea minHeight={164} maxCharacteres={450} placeholder='Escreva sua avaliação' />

				<div className='btn-group'>
					<Button size='sm' onClick={() => closeComment()}>
						<X weight='bold' />
					</Button>

					<Button size='sm'>
						<Check color={`${theme.colors.green100}`} weight='bold' />
					</Button>
				</div>
			</TextComment>
		</Container>
	);
}
