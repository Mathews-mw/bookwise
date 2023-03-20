import { styled } from '@/styles';

export const MainContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
});

export const BreadcrumbTitle = styled('div', {});

export const BookReviewCard = styled('div', {
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
