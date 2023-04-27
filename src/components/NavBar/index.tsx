import Image from 'next/image';
import Modal from 'react-modal';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';

import { theme } from '@/styles';
import { NavLink } from './NavLink';
import { UserAvatar } from '../UserAvatar';
import { Button } from '../Action/Button/buttons';
import { BookshelfIcon } from '../CustomIcons/BookshelfIcon';

import { NavbarContainer, NavLinksContainer, UserContainer, LogoContainer, SignoutBtn, SignoutModalContainer, LoginContainer } from './styles';

import Logo from '../../assets/Logo.png';
import { BookPlus, LineChart, LogIn, LogOut, Rocket, User } from 'lucide-react';

const customStyles = {
	content: {
		margin: 'auto',
		maxHeight: 'max-content',
		width: 'max-content',
		alignSelf: 'center',
		borderRadius: 8,
		boxShadow: 'rgb(0 0 0 / 30%) 0px 0px 30px',
		padding: 0,
		background: '#181C2A',
		border: 'none',
	},
	overlay: {
		backgroundColor: 'rgba(0,0,0,0.5)',
		zIndex: 1050,
	},
};

export function NavBar() {
	const router = useRouter();
	const session = useSession();

	const [urlPath, setUrlPath] = useState('');
	const [modalIsOpen, setModalIsOpen] = useState(false);

	function handleSetUrlPath() {
		setUrlPath('');
	}

	async function handlerSingOut() {
		signOut({ redirect: true, callbackUrl: '/' });
	}

	return (
		<>
			<NavbarContainer>
				<div>
					<LogoContainer>
						<Image src={Logo} quality={100} height={32} alt='App logo' />
					</LogoContainer>

					<NavLinksContainer>
						<NavLink href={'/home'} getUrlPath={() => handleSetUrlPath()}>
							<>
								<LineChart size={24} />
								<span>Início</span>
							</>
						</NavLink>

						<NavLink href={'/explore'} getUrlPath={() => handleSetUrlPath()}>
							<>
								<Rocket size={24} />
								<span>Explorar</span>
							</>
						</NavLink>

						{session.status === 'authenticated' && (
							<>
								<NavLink href={'/register'} getUrlPath={() => handleSetUrlPath()}>
									<>
										<BookPlus size={24} />
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
							</>
						)}
					</NavLinksContainer>
				</div>

				{session.status === 'authenticated' ? (
					<UserContainer>
						<div className='user-infos'>
							<UserAvatar userSession={session.data.user} />
							<span>{session.data.user.name}</span>
						</div>

						<SignoutBtn onClick={() => setModalIsOpen(true)}>
							Sair
							<LogOut size={20} />
						</SignoutBtn>
					</UserContainer>
				) : (
					<LoginContainer onClick={() => router.push('/')}>
						<span>Fazer login</span>
						<LogIn size={20} />
					</LoginContainer>
				)}
			</NavbarContainer>

			<Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)} style={customStyles} contentLabel='Example Modal'>
				<SignoutModalContainer>
					<h3>Deseja mesmo sair?</h3>

					<div className='btn-group'>
						<Button size='sm' variant='ghost' onClick={() => setModalIsOpen(false)}>
							Não
						</Button>
						<Button size='sm' variant='ghost' onClick={() => handlerSingOut()}>
							Sim
						</Button>
					</div>
				</SignoutModalContainer>
			</Modal>
		</>
	);
}
