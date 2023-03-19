import Image from 'next/image';
import { Binoculars, ChartLineUp } from 'phosphor-react';

import Logo from '../../assets/Logo.png';
import { NavLink } from './NavLink';
import { NavbarContainer } from './styles';

export function NavBar() {
	return (
		<NavbarContainer>
			<Image src={Logo} quality={100} height={32} alt='App logo' />
			<NavLink href={'/home'}>
				<>
					<ChartLineUp size={24} />
					<span>Início</span>
				</>
			</NavLink>

			<NavLink href={'/explore'}>
				<>
					<Binoculars size={24} />
					<span>Explorar</span>
				</>
			</NavLink>
		</NavbarContainer>
	);
}
