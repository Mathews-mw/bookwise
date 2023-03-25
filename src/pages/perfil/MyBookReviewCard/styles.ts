import { styled } from '@/styles';

export const Container = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: 8,

	time: {
		fontSize: 14,
		color: '$gray300',
	},
});

export const CardContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem',

	padding: '1.5rem',
	borderRadius: 8,
	background: '$gray700',
});

export const BookInfos = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	lineHeight: '140%',

	span: {
		fontWeight: 'bold',
	},

	i: {
		color: '$gray400',
	},
});

export const HeaderCardContainer = styled('div', {
	display: 'flex',
	gap: '1.5rem',

	'.group': {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
});

export const OpinionCardContainer = styled('div', {
	p: {
		fontSize: 14,
		textAlign: 'justify',
		color: '$gray300',
	},
});
