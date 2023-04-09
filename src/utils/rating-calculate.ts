import { RatingBook } from '@prisma/client';

export function ratingCalculate(ratingBook: RatingBook[]) {
	const total = ratingBook.reduce((acc, value, index, original) => {
		const ratingFormatted = parseFloat(original[index].rating.toString());
		return (acc += ratingFormatted);
	}, 0);

	const average = total / ratingBook.length;

	return average;
}
