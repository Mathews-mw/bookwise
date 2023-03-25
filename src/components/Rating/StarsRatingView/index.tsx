import { theme } from '@/styles';

import { Star } from '@phosphor-icons/react';
import { Container, StarsGroup, StarFilled, StartEmpty } from './styles';

interface IStarsRatingView {
	totalStars?: number;
	rating: number;
}

export function StarsRatingView({ totalStars = 5, rating }: IStarsRatingView) {
	return (
		<Container>
			{[...new Array(totalStars)].map((_, index) => {
				const activeState = rating;

				const showEmptyIcon = activeState === -1 || activeState < index + 1;

				const isActiveRating = activeState !== 1;
				const isRatingWithPrecision = activeState % 1 !== 0;
				const isRatingEqualToIndex = Math.ceil(activeState) === index + 1;
				const showRatingWithPrecision = isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

				return (
					<StarsGroup key={index}>
						<StarFilled style={{ width: `${showRatingWithPrecision ? `${(activeState % 1) * 100}%` : '0%'}` }}>
							<Star size={22} weight='fill' />
						</StarFilled>

						<StartEmpty style={{ color: `${showEmptyIcon ? theme.colors.purple100 : theme.colors.purple100}` }}>
							{showEmptyIcon ? <Star size={20} weight='regular' /> : <Star size={20} weight='fill' />}
						</StartEmpty>
					</StarsGroup>
				);
			})}
		</Container>
	);
}
