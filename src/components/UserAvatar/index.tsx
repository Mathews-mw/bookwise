import Image from 'next/image';
import { User } from 'next-auth';
import { ImageFrame, LettersContainer } from './styles';
import { useEffect, useState } from 'react';

interface IUserAvatarProps {
	userSession: User;
	size?: number;
}

export function UserAvatar({ userSession, size = 32 }: IUserAvatarProps) {
	const [firstLetterNames, setFirstLetterNames] = useState('');

	useEffect(() => {
		if (userSession.name) {
			const splitFirstAndLastName = userSession.name.split(' ');
			const firtsNameLetter = splitFirstAndLastName[0]?.substring(1, 0);
			const lastNameLetter = splitFirstAndLastName[1]?.substring(1, 0);

			setFirstLetterNames(firtsNameLetter + lastNameLetter);
		}
	}, [userSession]);

	return (
		<ImageFrame style={{ width: size, height: size }}>
			{userSession.avatar_url ? (
				<Image src={userSession.avatar_url} alt='avatar do usuário' />
			) : (
				<LettersContainer style={{ width: size - 4, height: size - 4, fontSize: size / 3.2 }}>
					<span>{firstLetterNames}</span>
				</LettersContainer>
			)}
		</ImageFrame>
	);
}
