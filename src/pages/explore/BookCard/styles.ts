import { styled } from '@stitches/react';

export const BookCardContainer = styled('div', {
	display: 'flex',
	gap: 20,
	padding: '18px 20px',

	background: '$gray700',
	borderRadius: '$md',

	'.group': {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
});

export const BookInfos = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	lineHeight: '140%',
	fontSize: '14px',

	maxWidth: 200,

	span: {
		fontWeight: 'bold',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},

	i: {
		color: '$gray400',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
});
