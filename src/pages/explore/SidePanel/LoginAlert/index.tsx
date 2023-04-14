import Image from 'next/image';

import LogoGit from '../../../../assets/icons_github.svg';
import LogoGoogle from '../../../../assets/logos_google-icon.svg';

import { X } from '@phosphor-icons/react';
import { Container, CloseBtnContainer, Title, OptionsLoginContainer, OptionLogin } from './styles';

interface ILoginAlertProps {
	closeModal: () => void;
}

export function LoginAlert({ closeModal }: ILoginAlertProps) {
	return (
		<Container>
			<CloseBtnContainer>
				<button>
					<X size={24} onClick={closeModal} />
				</button>
			</CloseBtnContainer>

			<Title>Faça seu login para deixar sua avaliação</Title>

			<OptionsLoginContainer>
				<OptionLogin>
					<Image src={LogoGoogle} alt='google-logo' height={32} width={32} />
					<span>entrar com Google</span>
				</OptionLogin>

				<OptionLogin>
					<Image src={LogoGit} alt='google-logo' height={32} width={32} />
					<span>entrar com Github</span>
				</OptionLogin>
			</OptionsLoginContainer>
		</Container>
	);
}
