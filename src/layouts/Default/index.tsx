import { ReactNode } from 'react';

import { Footer } from '@/components/Footer';
import { NavBar } from '@/components/NavBar';

import { LayoutContainer, NavbarContainer, MainContainer, FooterContainer } from './styles';

interface LayoutProps {
	children: ReactNode;
}

export default function DefaultLayout({ children }: LayoutProps) {
	return (
		<LayoutContainer>
			<NavbarContainer>
				<NavBar />
			</NavbarContainer>
			<MainContainer>{children}</MainContainer>

			<FooterContainer>
				<Footer />
			</FooterContainer>
		</LayoutContainer>
	);
}
