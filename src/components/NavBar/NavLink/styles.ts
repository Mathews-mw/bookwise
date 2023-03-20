import { styled } from '@/styles';

export const LinkContainer = styled('div', {
	a: {
		textDecoration: 'none',

		display: 'flex',
		alignItems: 'end',
		gap: 8,

		color: '$gray400',
	},

	'a::before': {
		content: '',
		width: 4,
		height: 24,
		borderRadius: 6,

		background: 'transparent',
	},

	'.activeLink': {
		color: '$gray100',
	},

	'.activeLink::before': {
		content: '',
		width: 4,
		height: 24,
		borderRadius: 6,

		background: '$gradient-vertical',
	},
});
