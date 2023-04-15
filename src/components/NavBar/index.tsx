import Image from 'next/image';
import { useState } from 'react';
import { signOut, useSession, signIn } from 'next-auth/react';

import { theme } from '@/styles';
import { NavLink } from './NavLink';
import { UserAvatar } from '../UserAvatar';
import { BookshelfIcon } from '../CustomIcons/BookshelfIcon';

import { Binoculars, ChartLineUp, Notebook, SignOut, User } from '@phosphor-icons/react';
import { NavbarContainer, NavLinksContainer, UserContainer, LogoContainer, SignoutBtn } from './styles';

import Logo from '../../assets/Logo.png';

export function NavBar() {
	const session = useSession();

	const [urlPath, setUrlPath] = useState('');

	function handleSetUrlPath() {
		setUrlPath('');
	}

	async function handlerSingOut() {
		signOut({ redirect: true, callbackUrl: '/' });
	}

	return (
		<NavbarContainer>
			<div>
				<LogoContainer>
					<Image src={Logo} quality={100} height={32} alt='App logo' />
				</LogoContainer>

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

					<SignoutBtn onClick={() => handlerSingOut()}>
						<SignOut size={20} />
					</SignoutBtn>
				</UserContainer>
			)}
		</NavbarContainer>
	);
}
