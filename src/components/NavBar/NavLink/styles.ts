import { styled } from '@/styles';

export const LinkContainer = styled('div', {
	a: {
		textDecoration: 'none',

		display: 'flex',
		alignItems: 'end',
		gap: 8,

		color: '$gray400',
	},

	'.activeLink': {
		color: '$gray100',
	},
});
