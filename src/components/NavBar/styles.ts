import { styled } from '@/styles';

export const NavbarContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'space-between',
	padding: '2.8rem',
	height: '100%',
});

export const LogoContainer = styled('div', {
	marginBottom: '4rem',
});

export const NavLinksContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

export const UserContainer = styled('div', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	fontSize: 14,

	svg: {
		color: '$dangerLight',
	},
});

export const ImageFrame = styled('div', {
	borderRadius: '$full',
	height: 32,
	width: 32,
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

	height: 28,
	width: 28,

	background: '$gray800',
	color: '$purple100',
	borderRadius: '$full',

	fontSize: 10,
	fontWeight: 700,
});

export const SignoutBtn = styled('button', {
	all: 'unset',
	cursor: 'pointer',
});
