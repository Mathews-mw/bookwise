import { Star } from 'phosphor-react';
import { MouseEvent, useRef, useState } from 'react';

import { theme } from '@/styles';
import { Container, StarsGroup, StarFilled, StartEmpty } from './styles';

interface IStarsRatingProps {
	precision?: number;
	totalStars?: number;
}

export function StarsRating({ precision = 1, totalStars = 5 }: IStarsRatingProps) {
	const [activeStar, setActiveStar] = useState(-1);
	const [isHovered, setIsHovered] = useState(false);
	const [hoverActiveStar, setHoverActiveStar] = useState(-1);

	const ratingContainerRef = useRef<HTMLDivElement>(null!);

	const calculateRating = (e: MouseEvent<HTMLDivElement>) => {
		const { width, left } = ratingContainerRef.current.getBoundingClientRect();
		let percent = (e.clientX - left) / width;
		const numberInStars = percent * totalStars;
		const nearestNumber = Math.round((numberInStars + precision / 2) / precision) * precision;

		return Number(nearestNumber.toFixed(precision.toString().split('.')[1]?.length || 0));
	};

	const handleClick = (e: MouseEvent<HTMLDivElement>) => {
		setIsHovered(false);
		setActiveStar(calculateRating(e));
	};

	const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
		setIsHovered(true);
		setHoverActiveStar(calculateRating(e));
	};

	const handleMouseLeave = () => {
		setHoverActiveStar(-1); // Reset to default state
		setIsHovered(false);
	};

	return (
		<Container onClick={handleClick} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} ref={ratingContainerRef}>
			{[...new Array(totalStars)].map((_, index) => {
				const activeState = isHovered ? hoverActiveStar : activeStar;

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
