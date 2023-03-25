import Image from 'next/image';

import { NavLink } from './NavLink';

import { NavbarContainer, NavLinksContainer } from './styles';
import { Binoculars, ChartLineUp, User } from '@phosphor-icons/react';

import Logo from '../../assets/Logo.png';

export function NavBar() {
	return (
		<NavbarContainer>
			<Image src={Logo} quality={100} height={32} alt='App logo' />

			<NavLinksContainer>
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

				<NavLink href={'/perfil'}>
					<>
						<User size={24} />
						<span>Perfil</span>
					</>
				</NavLink>
			</NavLinksContainer>
		</NavbarContainer>
	);
}
