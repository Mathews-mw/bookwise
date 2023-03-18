import Image from 'next/image';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

import { ArrowCircleLeft, ArrowCircleRight, Check } from 'phosphor-react';

import appCover from '../../assets/capa.png';
import githubIcon from '../../assets/icons_github.svg';
import googleIcon from '../../assets/logos_google-icon.svg';
import rocketLaunchIcon from '../../assets/RocketLaunch.svg';

import { HomeContainer, Preview, LoginContainer, LoginGroup, LoginBox, LoginOptionBox, RegisterUserContainer, ErrorMessage } from './styles';
import { RegisterUserForm } from './registerUserForm';
import { Multistep } from '@/components/Multistep';
import { useState } from 'react';
import { Button } from '@/components/Action/Button/buttons';

export default function Home() {
	const router = useRouter();
	const session = useSession();

	const [isFirstSection, setIsFirstSection] = useState(true);
	const [selectedTab, setSelectedTab] = useState('auth');

	const hasAuthError = !!router.query.error;
	const isSigedIn = session.status === 'authenticated';

	async function handleSignInGoogle() {
		await signIn('google');
	}

	function handleNextSection() {
		setIsFirstSection(!isFirstSection);
	}

	return (
		<HomeContainer>
			<Preview>
				<Image src={appCover} quality={100} priority alt='Imagem de uma pessoa lendo um livro. Capa da Home' />
			</Preview>

			<LoginContainer>
				<LoginGroup>
					<div className='header'>
						<h3>Boas vindas!</h3>
						<p>Faça seu login ou acesso como visitante</p>

						<Multistep size={2} currentStep={selectedTab === 'authentications' ? 1 : 2} />
					</div>

					<AnimatePresence mode='wait'>
						<motion.div
							key={selectedTab}
							initial={{ x: 10, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: -10, opacity: 0 }}
							transition={{ duration: 0.2 }}
						>
							<LoginBox>
								{selectedTab === 'authentications' ? (
									<>
										<LoginOptionBox onClick={() => handleSignInGoogle()} disabled={isSigedIn}>
											<Image src={googleIcon} quality={100} height={32} priority alt='Imagem do logo da google' />
											{isSigedIn ? (
												<div className='connected'>
													<span>Conectado com a Google</span>
													<Check size={22} />
												</div>
											) : (
												<div className='not-connected'>
													<span>Entrar com o Google</span>
													<ArrowCircleRight size={22} />
												</div>
											)}
										</LoginOptionBox>

										<LoginOptionBox onClick={() => setSelectedTab('registerUser')}>
											<Image src={githubIcon} quality={100} height={32} priority alt='Imagem do logo do github' />
											<div className='not-connected'>
												<span>Entrar com o Github</span>
												<ArrowCircleRight size={22} />
											</div>
										</LoginOptionBox>

										<LoginOptionBox>
											<Image src={rocketLaunchIcon} quality={100} height={32} priority alt='Imagem do logo de um foguete' />
											<div className='not-connected'>
												<span>Entrar como visitante</span>
												<ArrowCircleRight size={22} />
											</div>
										</LoginOptionBox>
									</>
								) : (
									<RegisterUserContainer>
										<RegisterUserForm />
										<Button onClick={() => setSelectedTab('authentications')}>
											<ArrowCircleLeft size={32} weight='fill' />
										</Button>
										<Button>Registrar</Button>
									</RegisterUserContainer>
								)}
							</LoginBox>
						</motion.div>
					</AnimatePresence>

					{hasAuthError && <ErrorMessage>Falha ao se conectar ao Google, verifique se você habilitou as permissões de acesso.</ErrorMessage>}
				</LoginGroup>
			</LoginContainer>
		</HomeContainer>
	);
}
