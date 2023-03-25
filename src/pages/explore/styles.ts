import { styled } from '@/styles';

export const ExploreContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	maxWidth: 996,
	margin: 'auto',
});

export const HeaderContainer = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',
	width: '100%',

	'.inputContainer': {
		maxWidth: 433,
		width: '100%',
	},
});

export const CategoriesContainer = styled('div', {
	display: 'flex',
	gap: 8,
	flexWrap: 'wrap',

	width: '100%',
	margin: '2.5rem 0 3rem 0',
});

export const CategoryTag = styled('span', {
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
	padding: '4px 16px',
	border: '1px solid $purple100',
	borderRadius: '$full',
	color: '$purple100',
	cursor: 'pointer',

	textAlign: 'center',
	whiteSpace: 'nowrap',

	'&:hover': {
		background: '$purple200',
	},

	'&.selected': {
		backgroundColor: '$purple200',
		color: '$gray100',
	},
});

export const BooksListContainer = styled('div', {
	display: 'grid',
	gridGap: '1.25rem',
	gridTemplateColumns: 'repeat(auto-fit, minmax(318px, 1fr))',
});

export const ShowAllButton = styled('button', {
	all: 'unset',
	display: 'flex',
	alignItems: 'center',

	background: 'transparent',
	color: '$purple100',
	cursor: 'pointer',

	fontWeight: '$bold',

	marginLeft: '$1',

	'&:hover': {
		color: '$purple200',
	},
});
