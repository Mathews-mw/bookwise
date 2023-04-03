import { styled } from '@/styles';

export const ImageFrame = styled('div', {
	borderRadius: '$full',

	background: '$gradient-horizontal',

	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	img: {
		borderRadius: '$full',
	},
});

export const LettersContainer = styled('div', {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	background: '$gray800',
	color: '$purple100',
	borderRadius: '$full',

	fontWeight: 700,
});
