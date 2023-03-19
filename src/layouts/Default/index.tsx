import { Header } from '@/components/Header';
import { NavBar } from '@/components/NavBar';
import { ReactNode } from 'react';
import { LayoutContainer, HeaderContainer, NavbarContainer, MainContainer, ASideBarContainer } from './styles';

interface LayoutProps {
	children: ReactNode;
}

export default function DefaultLayout({ children }: LayoutProps) {
	return (
		<LayoutContainer>
			<HeaderContainer>
				<Header />
			</HeaderContainer>
			<NavbarContainer>
				<NavBar />
			</NavbarContainer>
			<MainContainer>{children}</MainContainer>
			<ASideBarContainer>Side bar</ASideBarContainer>
		</LayoutContainer>
	);
}
