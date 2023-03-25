import { styled } from '@/styles';

export const PerfilContainer = styled('div', {
	display: 'grid',
	gridTemplateAreas: `
    "header header"
    "main aside"
  `,

	gridTemplateColumns: '1fr minmax(18.75rem, 20.25rem)',
	gridTemplateRows: '92px 1fr',

	width: '100%',
	margin: '0 auto',
});

export const HeaderContainer = styled('header', {
	gridArea: 'header',

	display: 'flex',
	maxWidth: 932,
	width: '100%',

	margin: '0 auto',
});

export const MyBookReviewsContainer = styled('div', {
	gridArea: 'main',

	display: 'flex',
	flexDirection: 'column',
	maxWidth: 608,
	width: '100%',
	margin: '0 auto 1rem auto',
});

export const ReviewsContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '1.5rem',
	paddingTop: '2rem',
});

export const AnalyticsSidebarContainer = styled('aside', {
	gridArea: 'aside',
});
