import { RatingBook } from '@prisma/client';

export function ratingCalculate(ratingBook: RatingBook[]) {
	const total = ratingBook.reduce((acc, value, index, original) => {
		return (acc += Number(original[index].rating));
	}, 0);

	return total;
}
