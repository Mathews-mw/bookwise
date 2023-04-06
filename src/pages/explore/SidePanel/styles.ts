import { styled } from '@/styles';

export const Container = styled('div', {
	display: 'flex',
	boxSizing: 'border-box',
	flexDirection: 'column',
	padding: '1.5rem 3rem',

	height: '100%',
	maxWidth: 660,

	overflowY: 'auto',

	background: '$gray800',
	boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
});

export const HeaderContainer = styled('div', {
	display: 'flex',
	justifyContent: 'end',

	marginBottom: '1rem',

	button: {
		color: '$gray400',
	},
});

export const BookDetail = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	padding: '1.5rem 2rem 1rem',
	position: 'relative',

	background: '$gray700',
	borderRadius: 10,

	'.divider': {
		width: '100%',
		height: '2.5rem',

		borderBottom: 'solid 1px $gray600',
	},
});

export const BookStatusContainer = styled('span', {
	position: 'absolute',
	fontSize: 10,
	fontWeight: 700,
	padding: '4px 10px',
	borderRadius: '0 $md 0 0',
	top: 0,
	right: 0,
});

export const BookCardContainer = styled('div', {
	display: 'flex',
	gap: 20,

	'.group': {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},

	'.view-rating': {
		display: 'flex',
		flexDirection: 'column',
		color: '$gray400',
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
		fontSize: 18,
		fontWeight: 'bold',
	},

	i: {
		color: '$gray400',
		whiteSpace: 'nowrap',
		overflow: 'hidden',
		textOverflow: 'ellipsis',
	},
});

export const AboutContainer = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	padding: '1.5rem 4px',

	svg: {
		color: '$green100',
	},

	small: {
		color: '$gray300',
	},

	span: {
		fontWeight: 'bold',
	},

	'.about-infos-group': {
		display: 'flex',
		gap: '0.5rem',
	},

	'.about-infos': {
		display: 'flex',
		flexDirection: 'column',
	},

	ul: {
		listStyleType: 'none',
		display: 'flex',
	},
});

export const TitleContainer = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '100%',

	margin: '2.5rem 0  1rem',

	small: {
		color: '$gray400',
	},

	'.group-title': {
		display: 'flex',
		flexDirection: 'column',
	},
});

export const CommentsContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '0.75rem',
});

export const CommentCard = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '1.25rem',
	padding: '1.5rem',

	background: '$gray700',
	borderRadius: 8,

	'&[data-current-user="true"]': {
		background: '$gray600',
	},
});

export const HeaderComment = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',

	'.profileInfos': {
		display: 'flex',
		gap: '1rem',
		width: '100%',

		time: {
			color: '$gray400',
		},
	},

	'.group': {
		display: 'flex',
		flexDirection: 'column',
	},
});

export const TextComment = styled('div', {
	p: {
		color: '$gray300',
		textAlign: 'justify',
	},
});

export const EmptyCommentContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '0 1.5rem',

	span: {
		color: '$gray400',
	},
});
