import { ReactElement } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import DefaultLayout from '@/layouts/Default';

import { RegisterCard, RegisterContainer, BreadcrumbTitleContainer, Form, InputsGroup } from './styles';
import { Header } from '@/components/Header';
import { Notebook } from '@phosphor-icons/react';
import { TextInput } from '@/components/Form/TextInput';
import { theme } from '@/styles';
import { Dropdown } from '@/components/Form/Dropdown';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/Action/Button/buttons';
import { GetStaticProps } from 'next';
import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';
import { ErrorMessage } from '@/components/ErrorMessage';

interface IRegisterProps {
	categories: Category[];
}

const registerFormSchema = z.object({
	title: z.string().min(1, { message: '*Campo Obrigatório' }),
	author: z.string().min(1, { message: '*Campo Obrigatório' }),
	totalPages: z
		.string()
		.min(1, { message: '*Campo Obrigatório' })
		.transform((value) => Number(value)),
	coverImage: z.optional(z.any()),
	categories: z.array(z.object({ value: z.string(), label: z.string() }), { required_error: '*Campo Obrigatório' }).min(1, { message: '*Campo Obrigatório' }),
});

type registerFormData = z.infer<typeof registerFormSchema>;

export default function Register({ categories }: IRegisterProps) {
	const {
		handleSubmit,
		register,
		control,
		formState: { errors, isSubmitting },
	} = useForm<registerFormData>({
		resolver: zodResolver(registerFormSchema),
	});

	const categoriesDropDownMenu = categories.map((category) => {
		return { value: category.id, label: category.category };
	});

	function handleRegisterBook(data: registerFormData) {
		console.log('data: ', data);
	}

	return (
		<RegisterContainer>
			<Header css={{ padding: '40px 0' }}>
				<Notebook size={32} />
				<h3>Cadastrar</h3>
			</Header>

			<BreadcrumbTitleContainer>
				<span>Cadastrar um novo livro</span>
			</BreadcrumbTitleContainer>

			<RegisterCard>
				<Form onSubmit={handleSubmit(handleRegisterBook)}>
					<InputsGroup>
						<label>
							<span>Título</span>
							<TextInput {...register('title')} />
							{errors.title && <ErrorMessage>{errors.title.message}</ErrorMessage>}
						</label>
						<label>
							<span>Autor</span>
							<TextInput {...register('author')} />
							{errors.author && <ErrorMessage>{errors.author.message}</ErrorMessage>}
						</label>
					</InputsGroup>

					<InputsGroup>
						<label>
							<span>Total de páginas</span>
							<TextInput
								onChangeCapture={(e) => {
									// @ts-ignore
									e.target.value = e.target.value.normalize('NFD').replace(/[^0-9]/g, '');
								}}
								{...register('totalPages')}
							/>
							{errors.totalPages && <ErrorMessage>{errors.totalPages.message}</ErrorMessage>}
						</label>

						<Controller
							name='categories'
							control={control}
							render={({ field }) => {
								return (
									<label>
										<span>Categorias</span>
										<Dropdown options={categoriesDropDownMenu} isMulti value={field.value} onChange={field.onChange} />
										{errors.categories && <ErrorMessage>{errors.categories.message}</ErrorMessage>}
									</label>
								);
							}}
						/>
					</InputsGroup>

					<Button type='submit' disabled={isSubmitting}>
						Cadastrar
					</Button>
				</Form>
			</RegisterCard>
		</RegisterContainer>
	);
}

Register.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps = async () => {
	const categories = await prisma.category.findMany();

	return {
		props: {
			categories,
		},
		revalidate: 60 * 60 * 24,
	};
};
