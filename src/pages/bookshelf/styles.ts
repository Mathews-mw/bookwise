import { styled } from '@/styles';

export const BookShelfContainer = styled('div', {
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
	maxWidth: 1332,
	width: '100%',

	margin: '0 auto',
});

export const GroupingBooksContainer = styled('div', {
	gridArea: 'main',

	display: 'flex',
	flexDirection: 'column',
	gap: '2rem',
	maxWidth: 996,
	width: '100%',
	margin: '0 auto 1rem auto',
});

export const BreadcrumbTitleContainer = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',

	marginBottom: '1rem',
});

export const ReadedBooksContainer = styled('div', {});

export const WishReadBookContainer = styled('div', {});

export const CurrentlyReadingContainer = styled('div', {});

export const BooksListContainer = styled('div', {
	display: 'grid',
	gridGap: '1.25rem',
	gridTemplateColumns: 'repeat(auto-fit, minmax(302px, 1fr))',
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
