import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';

import { Multistep } from '@/components/Multistep';
import { RegisterUserForm } from './registerUserForm';
import { ErrorMessage } from '@/components/ErrorMessage';

import appCover from '../../assets/capa.png';
import githubIcon from '../../assets/icons_github.svg';
import googleIcon from '../../assets/logos_google-icon.svg';
import rocketLaunchIcon from '../../assets/RocketLaunch.svg';

import { HomeContainer, Preview, LoginContainer, LoginGroup, LoginBox, LoginOptionBox, RegisterUserContainer } from './styles';
import { ArrowCircleRight, Check } from '@phosphor-icons/react';
import { GetServerSideProps } from 'next';
import { getServerSession } from 'next-auth';
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api';
import { prisma } from '@/lib/prisma';
import { Account } from '@prisma/client';

enum EAcessTypes {
	github = 'github',
	google = 'google',
	none = '',
}

interface ISignIn {
	account: Account | null;
}

export default function SignIn({ account }: ISignIn) {
	const router = useRouter();
	const session = useSession();

	console.log('session: ', session);

	const [selectedTab, setSelectedTab] = useState('authentications');
	const [acessType, setAcessType] = useState<EAcessTypes>(EAcessTypes.none);

	const hasAuthError = !!router.query.error;
	const isSigedIn = session.status === 'authenticated';

	function loginAsGuest() {
		router.push('/home');
	}

	function handlerAcessType(tab: string, type: EAcessTypes) {
		setSelectedTab(tab);
		setAcessType(type);
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
						<p>Faça seu login ou acesse como visitante</p>

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
										<LoginOptionBox onClick={() => handlerAcessType('registerUser', EAcessTypes.google)} disabled={isSigedIn}>
											<Image src={googleIcon} quality={100} height={32} priority alt='Imagem do logo da google' />
											{isSigedIn && account?.provider === 'google' ? (
												<div className='connected'>
													<span>Conectado com Google</span>
													<Check size={22} />
												</div>
											) : (
												<div className='not-connected'>
													<span>Entrar com Google</span>
													<ArrowCircleRight size={22} />
												</div>
											)}
										</LoginOptionBox>

										<LoginOptionBox onClick={() => handlerAcessType('registerUser', EAcessTypes.github)}>
											<Image src={githubIcon} quality={100} height={32} priority alt='Imagem do logo do github' />
											{isSigedIn && account?.provider === 'github' ? (
												<div className='connected'>
													<span>Conectado com Github</span>
													<Check size={22} />
												</div>
											) : (
												<div className='not-connected'>
													<span>Entrar com Github</span>
													<ArrowCircleRight size={22} />
												</div>
											)}
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
										<RegisterUserForm acessType={acessType} onClickEvent={() => handlerAcessType('authentications', EAcessTypes.none)} />
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
	const session = await getServerSession(req, res, buildNextAuthOptions(req, res));

	const account = await prisma.account.findFirst({
		where: {
			user_id: session?.user.id,
		},
	});

	return {
		props: {
			session,
			account,
		},
	};
};
