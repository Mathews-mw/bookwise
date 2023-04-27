import { theme } from '@/styles';

import { Container, StarsGroup, StarFilled, StartEmpty } from './styles';
import { Star } from 'lucide-react';

interface IStarsRatingView {
	totalStars?: number;
	rating: number;
	showAverage?: boolean;
}

export function StarsRatingView({ totalStars = 5, rating, showAverage }: IStarsRatingView) {
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
					<StarsGroup key={index} title={showAverage ? `Média: ${rating}` : undefined}>
						<StarFilled style={{ width: `${showRatingWithPrecision ? `${(activeState % 1) * 100}%` : '0%'}` }}>
							<Star size={22} fill={`${theme.colors.purple100}`} />
						</StarFilled>

						<StartEmpty style={{ color: `${showEmptyIcon ? theme.colors.purple100 : theme.colors.purple100}` }}>
							{showEmptyIcon ? <Star size={20} /> : <Star size={20} fill={`${theme.colors.purple100}`} />}
						</StartEmpty>
					</StarsGroup>
				);
			})}
		</Container>
	);
}
