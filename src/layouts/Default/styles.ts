import { styled } from '@/styles';

export const LayoutContainer = styled('div', {
	display: 'grid',
	gridTemplateAreas: `
    "nav header aside" 
    "nav main aside"
  `,
	gridTemplateColumns: '232px 1fr 324px',
	gridTemplateRows: '5rem 100vh',
	gridGap: '0.5rem',

	margin: '1.25rem 6rem 1.25rem 1.25rem',
});

export const HeaderContainer = styled('header', {
	gridArea: 'header',

	display: 'flex',
	maxWidth: 608,
	width: '100%',
	margin: 'auto auto',
});

export const NavbarContainer = styled('nav', {
	gridArea: 'nav',
	display: 'flex',
	flexDirection: 'column',
	background: 'linear-gradient(180deg, #181C2A 0%, #252D4A 100%)',

	borderRadius: 12,
});

export const MainContainer = styled('main', {
	gridArea: 'main',

	display: 'flex',
	maxWidth: 608,
	width: '100%',
	margin: '0   auto',
});

export const ASideBarContainer = styled('aside', {
	gridArea: 'aside',
	display: 'flex',
	flexDirection: 'column',
	background: '$green300',

	marginTop: '88px',
});
