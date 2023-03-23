import { styled } from '@/styles';

export const HeaderContainer = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: '0.75rem',
	height: '100%',

	svg: {
		color: '$green100',
	},

	h3: {
		color: '$gray100',
	},
});
