import { styled } from '@/styles';

export const NavbarContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	padding: '2.8rem',

	img: {
		marginBottom: '4rem',
	},
});

export const NavLinksContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});
