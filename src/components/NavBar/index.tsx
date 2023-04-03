import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { NavLink } from './NavLink';
import { UserAvatar } from '../UserAvatar';
import { BookshelfIcon } from '../CustomIcons/BookshelfIcon';

import { NavbarContainer, NavLinksContainer, UserContainer } from './styles';
import { Binoculars, ChartLineUp, Notebook, SignOut, User } from '@phosphor-icons/react';
import Logo from '../../assets/Logo.png';
import { useState } from 'react';
import { theme } from '@/styles';

export function NavBar() {
	const session = useSession();

	const [urlPath, setUrlPath] = useState('');

	function handleSetUrlPath() {
		setUrlPath('');
	}

	return (
		<NavbarContainer>
			<div>
				<Image src={Logo} quality={100} height={32} alt='App logo' />

				<NavLinksContainer>
					<NavLink href={'/home'} getUrlPath={() => handleSetUrlPath()}>
						<>
							<ChartLineUp size={24} />
							<span>Início</span>
						</>
					</NavLink>

					<NavLink href={'/explore'} getUrlPath={() => handleSetUrlPath()}>
						<>
							<Binoculars size={24} />
							<span>Explorar</span>
						</>
					</NavLink>

					<NavLink href={'/register'} getUrlPath={() => handleSetUrlPath()}>
						<>
							<Notebook size={24} />
							<span>Cadastrar</span>
						</>
					</NavLink>

					<NavLink href={'/perfil'} getUrlPath={() => handleSetUrlPath()}>
						<>
							<User size={24} />
							<span>Perfil</span>
						</>
					</NavLink>

					<NavLink href={'/bookshelf'} getUrlPath={(urlPath) => setUrlPath(urlPath)}>
						<>
							<BookshelfIcon size={24} color={urlPath === '/bookshelf' ? `${theme.colors.gray100}` : `${theme.colors.gray400}`} />
							<span>Estante</span>
						</>
					</NavLink>
				</NavLinksContainer>
			</div>

			{session.status === 'authenticated' && (
				<UserContainer>
					<UserAvatar userSession={session.data.user} />
					<span>{session.data.user.username}</span>
					<SignOut size={20} />
				</UserContainer>
			)}
		</NavbarContainer>
	);
}
