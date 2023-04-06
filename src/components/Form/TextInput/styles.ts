import { styled } from '@/styles';

export const InputTextContainer = styled('div', {});

export const TextInputContainer = styled('div', {
	backgroundColor: '$gray800',
	padding: '14px 20px',
	borderRadius: '$sm',
	boxSizing: 'border-box',
	border: '2px solid $gray500',
	display: 'flex',
	alignItems: 'center',
	width: '100%',

	transition: 'all 100ms ease-in-out',

	'&:has(input:focus)': {
		borderColor: '$purple200',
		boxShadow: '0 0 6px rgba(42, 40, 121, 1)',
	},

	'&:has(input:disabled)': {
		opacity: 0.5,
		cursor: 'not-allowed',
	},

	svg: {
		color: '$gray500',
	},
});

export const Prefix = styled('span', {
	fontFamily: '$default',
	fontSize: '$sm',
	color: '$gray400',
	fontWeight: '$regular',
});

export const Input = styled('input', {
	fontFamily: '$default',
	fontSize: '$sm',
	color: '$gray200',
	fontWeight: '$regular',
	background: 'transparent',
	border: 0,
	width: '100%',

	'&:focus': {
		outline: 0,
	},

	'&:disabled': {
		cursor: 'not-allowed',
	},

	'&::placeholder': {
		color: '$gray400',
	},
});
