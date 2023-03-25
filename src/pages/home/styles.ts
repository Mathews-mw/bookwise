import { styled } from '@/styles';

export const MainContainer = styled('div', {
	display: 'grid',
	gridTemplateColumns: '1fr minmax(18.75rem, 20.25rem)',
	gridGap: '0.5rem',
});

export const BreadcrumbTitleContainer = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',

	marginBottom: '1rem',
});

export const NavButton = styled('button', {
	all: 'unset',
	background: 'none',
	border: 'none',

	display: 'flex',
	alignItems: 'center',

	color: '$purple100',
	fontWeight: '$bold',
	fontSize: 14,
	cursor: 'pointer',

	'&:hover': {
		color: '$purple200',
	},
});

export const RecentViewsContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	maxWidth: 608,
	height: 'auto',
	margin: '0 auto 1rem auto',
});

export const ReviewsContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '0.75rem',
	height: 'auto',
});

export const TrendingContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	marginTop: '6.625rem',

	maxWidth: '20.25rem',
});

export const TrandingBooksList = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: 12,
});
