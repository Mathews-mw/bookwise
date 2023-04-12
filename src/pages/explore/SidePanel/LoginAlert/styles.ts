import { styled } from '@/styles';

export const Container = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	padding: '3.5rem',

	background: '$gray700',

	fontFamily: '$default',

	position: 'relative',
});

export const CloseBtnContainer = styled('div', {
	position: 'absolute',
	top: '1rem',
	right: '1rem',

	button: {
		all: 'unset',
		color: '$gray400',
		cursor: 'pointer',

		'&:hover': {
			color: '$gray200',
		},
	},
});

export const Title = styled('span', {
	fontWeight: '$bold',
	marginBottom: '2.5rem',
});

export const OptionsLoginContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

export const OptionLogin = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: '1.25rem',
	padding: '1.25rem 1.5rem',
	borderRadius: '8px',

	background: '$gray600',

	span: {
		fontWeight: '$bold',
	},
});
