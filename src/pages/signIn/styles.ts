import { styled } from '@/styles';

export const HomeContainer = styled('div', {
	display: 'grid',
	gridGap: 5,
	gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',

	padding: '1rem',

	'@media(max-width: 600px)': {
		padding: '1rem 0',
	},
});

export const Preview = styled('div', {
	img: {
		maxHeight: 912,
		maxWidth: 598,
		width: '100%',
		height: 'calc(100vh - 3rem)',
		objectFit: 'cover',
		borderRadius: '$sm',
	},

	'@media(max-width: 600px)': {
		display: 'none',
	},
});

export const LoginContainer = styled('div', {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const LoginGroup = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',

	position: 'relative',
	overflow: 'hidden',

	maxWidth: 372,
	maxHeight: 420,
	height: '100%',
	width: '100%',

	'.header': {
		display: 'flex',
		flexDirection: 'column',
		gap: 6,
	},

	'.header p': {
		color: '$gray300',
	},

	'@media(max-width: 600px)': {
		maxWidth: 272,
	},
});

export const LoginBox = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: 12,
});

export const LoginOptionBox = styled('button', {
	display: 'flex',
	alignItems: 'center',
	gap: '1.25rem',

	borderRadius: 8,
	padding: '1.2rem 1.5rem',

	backgroundColor: '$gray600',
	color: '$gray200',

	fontWeight: 700,

	border: 'none',
	cursor: 'pointer',

	fontFamily: '$default',
	fontSize: 14,

	'&:hover': {
		color: '$purple100',
	},

	'&:disabled': {
		opacity: 0.6,
		cursor: 'initial',
		border: '1px solid $green100',
	},

	'.not-connected': {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		gap: '0.5rem',
		width: '100%',
	},

	'.connected': {
		display: 'flex',
		alignItems: 'center',
		gap: '0.5rem',
		color: '$green100',
	},
});

export const RegisterUserContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

export const ErrorMessage = styled('span', {
	color: '$errorMsg',
	marginTop: 8,
});
