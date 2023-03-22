import { styled } from '@/styles';
import * as Collapsible from '@radix-ui/react-collapsible';
import { keyframes } from '@stitches/react';

export const BookReviewContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '2rem',

	padding: '1.5rem',
	borderRadius: '$md',

	width: '100%',
	maxWidth: 608,

	background: '$gray700',
});

export const HeaderReview = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',
	'.profileInfos': {
		display: 'flex',
		gap: '1rem',

		time: {
			color: '$gray400',
		},
	},

	'.group': {
		display: 'flex',
		flexDirection: 'column',

		width: '100%',
	},
});

export const ImageFrame = styled('div', {
	borderRadius: '$full',
	height: 44,
	width: 44,
	background: '$gradient-horizontal',

	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	img: {
		borderRadius: '$full',
	},
});

export const ReviewContainer = styled('div', {
	display: 'flex',
	gap: '1.25rem',

	'.group': {
		display: 'flex',
		flexDirection: 'column',
		gap: '1.25rem',
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
		display: 'inline',
		textAlign: 'justify',
		width: '100%',

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
