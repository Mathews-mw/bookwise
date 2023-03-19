import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSession, getProviders } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

import { Multistep } from '@/components/Multistep';
import { RegisterUserForm } from './registerUserForm';
import { Button } from '@/components/Action/Button/buttons';

import { ArrowCircleRight, Check } from 'phosphor-react';

import appCover from '../../assets/capa.png';
import githubIcon from '../../assets/icons_github.svg';
import googleIcon from '../../assets/logos_google-icon.svg';
import rocketLaunchIcon from '../../assets/RocketLaunch.svg';

import { HomeContainer, Preview, LoginContainer, LoginGroup, LoginBox, LoginOptionBox, RegisterUserContainer } from './styles';
import { ErrorMessage } from '@/components/ErrorMessage';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api';
import { unstable_getServerSession } from 'next-auth';

export default function SignIn() {
	const router = useRouter();
	const session = useSession();

	console.log('session: ', session);

	const [selectedTab, setSelectedTab] = useState('authentications');

	const hasAuthError = !!router.query.error;
	const isSigedIn = session.status === 'authenticated';

	function loginAsGuest() {
		router.push('/home');
	}

	useEffect(() => {
		if (isSigedIn) {
			router.push('/home');
		}
	}, [session]);

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
										<LoginOptionBox onClick={() => setSelectedTab('registerUser')} disabled={isSigedIn}>
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

										<LoginOptionBox onClick={() => loginAsGuest()}>
											<Image src={rocketLaunchIcon} quality={100} height={32} priority alt='Imagem do logo de um foguete' />
											<div className='not-connected'>
												<span>Entrar como visitante</span>
												<ArrowCircleRight size={22} />
											</div>
										</LoginOptionBox>
									</>
								) : (
									<RegisterUserContainer>
										<RegisterUserForm onClickEvent={() => setSelectedTab('authentications')} />
									</RegisterUserContainer>
								)}
							</LoginBox>
						</motion.div>
					</AnimatePresence>

					{hasAuthError && <ErrorMessage>Falha ao se conectar ao Google, verifique se você habilitou as permissões de acesso</ErrorMessage>}
				</LoginGroup>
			</LoginContainer>
		</HomeContainer>
	);
}
