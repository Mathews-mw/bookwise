import { styled } from '@/styles';

export const LayoutContainer = styled('div', {
	display: 'grid',
	gridTemplateAreas: `
    "nav header" 
    "nav main"
		"footer footer"
  `,
	gridTemplateColumns: '232px 1fr',
	gridTemplateRows: '5rem 1fr',
	gridGap: '0.5rem',

	height: '100%',

	margin: '1.25rem 6rem 1.25rem 1.25rem',
});

export const HeaderContainer = styled('header', {
	gridArea: 'header',
	width: '100%',
	height: '100%',

	'.gridLayout': {
		display: 'grid',
		gridTemplateColumns: '1fr minmax(18.75rem, 20.25rem)',
		gridGap: '0.5rem',
		height: '100%',
	},

	'.headerAdjustment': {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		maxWidth: 608,
		width: '100%',
		height: '100%',
		margin: '0 auto',
	},
});

export const NavbarContainer = styled('nav', {
	gridArea: 'nav',
	display: 'flex',
	flexDirection: 'column',
	maxHeight: '61.75rem',

	background: 'linear-gradient(180deg, #181C2A 0%, #252D4A 100%)',
	borderRadius: 12,
});

export const MainContainer = styled('main', {
	gridArea: 'main',
	width: '100%',
});

export const ASideBarContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	maxHeight: '38rem',

	marginTop: '88px',
});

export const FooterContainer = styled('footer', {
	gridArea: 'footer',
});
