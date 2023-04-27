import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { getServerSession } from 'next-auth';
import { signIn, useSession } from 'next-auth/react';

import { api } from '@/lib/axios';
import { prisma } from '@/lib/prisma';
import { Account, Session, User } from '@prisma/client';
import { ErrorMessage } from '@/components/ErrorMessage';
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api';

import appCover from '../../assets/capa.png';
import githubIcon from '../../assets/icons_github.svg';
import googleIcon from '../../assets/logos_google-icon.svg';
import rocketLaunchIcon from '../../assets/RocketLaunch.svg';

import { HomeContainer, Preview, LoginContainer, LoginGroup, LoginBox, LoginOptionBox } from './styles';
import { ArrowRightCircle, Check } from 'lucide-react';

enum EAcessTypes {
	github = 'github',
	google = 'google',
	none = '',
}

interface UserAccount extends User {
	accounts: Account[];
	sessions: Session[];
}

export default function SignIn() {
	const router = useRouter();
	const session = useSession();

	const [account, setAccount] = useState<Account>();

	const hasAuthError = !!router.query.error;
	const isSigedIn = session.status === 'authenticated';

	function loginAsGuest() {
		router.push('/home');
	}

	async function handlerAcessType(type: EAcessTypes) {
		await signIn(type);
	}

	useEffect(() => {
		if (isSigedIn) {
			api
				.get<UserAccount>(`/users/${session.data?.user.id}/get-user-by-id`)
				.then((result) => {
					if (result.data.id) {
						setAccount(result.data.accounts[0]);
						return result.data;
					}
				})
				.then(() => {
					router.push('/home');
				})
				.catch((error) => {
					throw new Error(error);
				});
		}
	}, [session]);

	return (
		<>
			<NextSeo title='Acessar BookWise' noindex />

			<HomeContainer>
				<Preview>
					<Image src={appCover} quality={100} priority alt='Imagem de uma pessoa lendo um livro. Capa da Home' />
				</Preview>

				<LoginContainer>
					<LoginGroup>
						<div className='header'>
							<h3>Boas vindas!</h3>
							<p>Faça seu login ou acesse como visitante</p>
						</div>

						<LoginBox>
							<LoginOptionBox onClick={() => handlerAcessType(EAcessTypes.google)} disabled={isSigedIn}>
								<Image src={googleIcon} quality={100} height={32} priority alt='Imagem do logo da google' />
								{isSigedIn && account?.provider === 'google' ? (
									<div className='connected'>
										<span>Conectado com Google</span>
										<Check size={22} />
									</div>
								) : (
									<div className='not-connected'>
										<span>Entrar com Google</span>
										<ArrowRightCircle size={22} />
									</div>
								)}
							</LoginOptionBox>

							<LoginOptionBox onClick={() => handlerAcessType(EAcessTypes.github)} disabled={isSigedIn}>
								<Image src={githubIcon} quality={100} height={32} priority alt='Imagem do logo do github' />
								{isSigedIn && account?.provider === 'github' ? (
									<div className='connected'>
										<span>Conectado com Github</span>
										<Check size={22} />
									</div>
								) : (
									<div className='not-connected'>
										<span>Entrar com Github</span>
										<ArrowRightCircle size={22} />
									</div>
								)}
							</LoginOptionBox>

							<LoginOptionBox onClick={() => loginAsGuest()} disabled={isSigedIn}>
								<Image src={rocketLaunchIcon} quality={100} height={32} priority alt='Imagem do logo de um foguete' />
								<div className='not-connected'>
									<span>Entrar como visitante</span>
									<ArrowRightCircle size={22} />
								</div>
							</LoginOptionBox>
						</LoginBox>

						{hasAuthError && <ErrorMessage>Falha ao se conectar ao Google, verifique se você habilitou as permissões de acesso</ErrorMessage>}
					</LoginGroup>
				</LoginContainer>
			</HomeContainer>
		</>
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
