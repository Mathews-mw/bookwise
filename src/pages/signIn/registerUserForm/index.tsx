import { z } from 'zod';
import { useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { api } from '@/lib/axios';
import { Spinner } from '@/components/Loaders/Spinner';
import { TextInput } from '@/components/Form/TextInput';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Button } from '@/components/Action/Button/buttons';

import { Container, Form } from './styles';

interface IRegisterUserFormProps {
	onClickEvent: () => void;
}

const registerUserFormSchema = z.object({
	name: z.string({ required_error: 'Campo obrigatório' }).min(1, { message: 'Campo obrigatório' }),
	username: z
		.string()
		.min(3, { message: 'No mínimo 3 caracteres' })
		.regex(/^([a-z\\-]+)$/i, { message: 'Pode conter apenas letras e hifens.' })
		.transform((username) => username.toLocaleLowerCase()),
});

type registerUserFormData = z.infer<typeof registerUserFormSchema>;

export function RegisterUserForm({ onClickEvent }: IRegisterUserFormProps) {
	const {
		handleSubmit,
		register,
		formState: { errors, isSubmitting },
	} = useForm<registerUserFormData>({
		resolver: zodResolver(registerUserFormSchema),
	});

	const router = useRouter();

	const [actionLoading, setActionLoading] = useState(false);

	async function handleRegisterUser(data: registerUserFormData) {
		const { name, username } = data;

		try {
			setActionLoading(true);

			// const gitAcess = await signIn('github');

			await signIn('google');
			await api.post('/users/create', {
				name,
				username,
			});

			setActionLoading(false);

			await router.push('/home');
		} catch (error) {
			setActionLoading(false);

			if (error instanceof AxiosError && error?.response?.data?.message) {
				alert(error.response.data.message);
			}

			console.log('Erro ao tentar cadastrar usuário: ', error);
		}
	}

	return (
		<Container>
			<Form onSubmit={handleSubmit(handleRegisterUser)}>
				<label>
					<span>Nome completo</span>
					<TextInput placeholder='Seu nome' {...register('name')} />
					{errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
				</label>
				<label>
					<span>Nome do usuário</span>
					<TextInput prefix='@' placeholder='username' {...register('username')} />
					{errors.username && <ErrorMessage>{errors.username.message}</ErrorMessage>}
				</label>

				<div className='btnGroup'>
					<Button size='sm' colorScheme='white' variant='ghost' disabled={isSubmitting || actionLoading} onClick={() => onClickEvent()}>
						Voltar
					</Button>
					<Button size='sm' type='submit' disabled={isSubmitting || actionLoading}>
						Registrar
					</Button>

					{actionLoading && <Spinner />}
				</div>
			</Form>
		</Container>
	);
}
