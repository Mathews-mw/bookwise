import { styled } from '@stitches/react';

export const Container = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '1.25rem',
	padding: '1.5rem',

	background: '$gray700',
	borderRadius: 8,
});

export const HeaderComment = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',

	'.profileInfos': {
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		gap: '1rem',

		fontWeight: 'bold',
	},
});

export const ImageFrame = styled('div', {
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	padding: 2,

	borderRadius: '50%',
	background: '$gradient-horizontal',

	img: {
		borderRadius: '$full',
		width: 40,
		height: 40,
	},
});

export const TextComment = styled('div', {
	'.btn-group': {
		display: 'flex',
		justifyContent: 'end',

		gap: 8,
		width: '100%',

		marginTop: 8,
	},
});
