import { styled } from '@/styles';

export const TextAreaContainer = styled('div', {
	position: 'relative',
});

export const TextAreaElement = styled('textarea', {
	backgroundColor: '$gray800',
	padding: '$3 $4',
	borderRadius: '$sm',
	boxSizing: 'border-box',
	border: '2px solid $gray500',

	fontFamily: '$default',
	fontSize: '$sm',
	color: '$gray200',
	fontWeight: '$regular',
	resize: 'vertical',
	minHeight: 80,
	width: '100%',

	transition: 'all 100ms ease-in-out',

	'&:focus': {
		borderColor: '$purple200',
		outline: 0,
		boxShadow: '0 0 6px rgba(42, 40, 121, 1)',
	},

	'&:disabled': {
		opacity: 0.5,
		cursor: 'not-allowed',
	},

	'&::placeholder': {
		color: '$gray400',
	},
});

export const CharacterCount = styled('span', {
	position: 'absolute',
	right: 10,
	bottom: 10,

	color: '$gray400',
	fontSize: 12,
});
