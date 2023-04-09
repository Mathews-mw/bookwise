import { styled } from '@/styles';
import * as Collapsible from '@radix-ui/react-collapsible';
import { keyframes } from '@stitches/react';

export const BookReviewContainer = styled('div', {
	padding: '1.5rem',
	marginBottom: '2rem',
	borderRadius: '$md',

	maxWidth: 608,

	background: '$gray600',
});

export const HeaderReview = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
});

export const ReviewContainer = styled('div', {
	display: 'flex',
	gap: '1.25rem',

	'.group': {
		display: 'flex',
		flexDirection: 'column',
		gap: '1.25rem',

		height: 'auto',
	},
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

export const CommentContainer = styled('div', {
	p: {
		overflow: 'hidden',
		textOverflow: 'ellipsis',
		display: '-webkit-box',
		'-webkit-line-clamp': 2,
		'-webkit-box-orient': 'vertical',

		fontSize: 14,
		color: '$gray300',
	},
});

const slideDown = keyframes({
	from: {
		height: 0,
	},
	to: {
		height: 'var(--radix-collapsible-content-height)',
	},
});

const slideUp = keyframes({
	from: {
		height: 'var(--radix-collapsible-content-height)',
	},
	to: {
		height: 0,
	},
});

export const CollapsibleContent = styled(Collapsible.Content, {
	display: 'inline',
	overflow: 'hidden',

	'&:[data-state=open]': {
		animation: `${slideDown} 500ms ease-out`,
	},

	'&:[data-state=closed]': {
		animation: `${slideUp} 500ms ease-out`,
	},
});

export const CollapsibleTrigger = styled(Collapsible.Trigger, {
	display: 'inline',
	marginLeft: 4,
});

export const CollapsibleButton = styled('button', {
	all: 'unset',
	background: 'transparent',
	color: '$purple100',
	cursor: 'pointer',

	fontWeight: '$bold',

	marginLeft: '$1',

	'&:hover': {
		color: '$purple200',
	},
});
