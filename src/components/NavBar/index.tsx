import Image from 'next/image';

import { NavLink } from './NavLink';

import { ImageFrame, LettersContainer, NavbarContainer, NavLinksContainer, UserContainer } from './styles';
import { Binoculars, ChartLineUp, Notebook, SignOut, User } from '@phosphor-icons/react';

import Logo from '../../assets/Logo.png';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export function NavBar() {
	const session = useSession();

	const [firstLetterNames, setFirstLetterNames] = useState('');

	useEffect(() => {
		if (session?.data?.user.name) {
			const splitFirstAndLastName = session.data.user.name.split(' ');
			const firtsNameLetter = splitFirstAndLastName[0]?.substring(1, 0);
			const lastNameLetter = splitFirstAndLastName[1]?.substring(1, 0);

			setFirstLetterNames(firtsNameLetter + lastNameLetter);
		}
	}, [session]);

	return (
		<NavbarContainer>
			<div>
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

					<NavLink href={'/register'}>
						<>
							<Notebook size={24} />
							<span>Cadastrar</span>
						</>
					</NavLink>

					<NavLink href={'/perfil'}>
						<>
							<User size={24} />
							<span>Perfil</span>
						</>
					</NavLink>
				</NavLinksContainer>
			</div>

			{session.status === 'authenticated' && (
				<UserContainer>
					<ImageFrame>
						{session.data.user.avatar_url ? (
							<Image src={session.data.user.avatar_url} alt='avatar do usuário' />
						) : (
							<LettersContainer>
								<span>{firstLetterNames}</span>
							</LettersContainer>
						)}
					</ImageFrame>
					<span>{session.data.user.username}</span>
					<SignOut size={20} />
				</UserContainer>
			)}
		</NavbarContainer>
	);
}
