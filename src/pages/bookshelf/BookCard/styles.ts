import { styled } from '@stitches/react';

export const BookCardContainer = styled('div', {
	display: 'flex',
	gap: 20,
	padding: '18px 20px',
	position: 'relative',

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
	width: '100%',
	height: '100%',

	span: {
		fontWeight: 'bold',
		wordWrap: 'break-word',
	},

	i: {
		color: '$gray400',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
});
