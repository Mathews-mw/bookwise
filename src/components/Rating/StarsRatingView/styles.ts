import { styled } from '@/styles';

export const Container = styled('div', {
	display: 'inline-flex',
	gap: 4,
	position: 'relative',
	textAlign: 'left',

	color: '$purple100',
});

export const StarsGroup = styled('div', {
	position: 'relative',
});

export const StarFilled = styled('div', {
	overflow: 'hidden',
	position: 'absolute',
});

export const StartEmpty = styled('div', {});
