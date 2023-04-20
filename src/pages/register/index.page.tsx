import { z } from 'zod';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { GetStaticProps } from 'next';
import { motion } from 'framer-motion';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';
import { ReactElement, useEffect, useState } from 'react';

import { api } from '@/lib/axios';
import { prisma } from '@/lib/prisma';
import { Category } from '@prisma/client';
import { Header } from '@/components/Header';
import DefaultLayout from '@/layouts/Default';
import { Dropdown } from '@/components/Form/Dropdown';
import { Spinner } from '@/components/Loaders/Spinner';
import { TextInput } from '@/components/Form/TextInput';
import { ErrorMessage } from '@/components/ErrorMessage';
import { Progress } from '@/components/Feedback/Progress';
import { Button } from '@/components/Action/Button/buttons';
import { ShowErrorRequest } from '@/utils/ShowErrorRequest';
import { ShowSuccessRequest } from '@/utils/ShowSuccessRequest';

import { Notebook, UploadSimple } from '@phosphor-icons/react';
import { RegisterCard, RegisterContainer, Form, InputsGroup, UploadContainer, SubmitButtonContainer, TextsContainer } from './styles';

interface IRegisterProps {
	categories: Category[];
}

const MAX_FILE_SIZE = 500000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
const registerFormSchema = z.object({
	title: z.string().min(1, { message: '*Campo Obrigatório' }),
	author: z.string().min(1, { message: '*Campo Obrigatório' }),
	totalPages: z
		.string()
		.min(1, { message: '*Campo Obrigatório' })
		.transform((value) => Number(value)),
	coverImage: z
		.any()
		.refine((files) => files?.length === 1, 'Imagem é obrigatória.')
		.refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, `Tamanho máximodo suportado do arquivo é de 5MB.`)
		.refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), 'apenas os formatos .jpg, .jpeg, .png, .svg e .webp são aceitos.'),
	categories: z.array(z.object({ value: z.string(), label: z.string() }), { required_error: '*Campo Obrigatório' }).min(1, { message: '*Campo Obrigatório' }),
});

type registerFormData = z.infer<typeof registerFormSchema>;

export default function Register({ categories }: IRegisterProps) {
	const {
		handleSubmit,
		register,
		control,
		watch,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<registerFormData>({
		resolver: zodResolver(registerFormSchema),
	});

	const [submtingFormLoading, setSubmtingFormLoading] = useState(false);

	const [imageName, setImageName] = useState<any>();
	const [imageDisplay, setImageDisplay] = useState<any>('');
	const [imageIsLoading, setImageIsLoading] = useState(false);

	const categoriesDropDownMenu = categories.map((category) => {
		return { value: category.id, label: category.category };
	});

	function convertBase64(file: Blob) {
		return new Promise((resolve, reject) => {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);

			fileReader.onload = () => {
				resolve(fileReader.result);
			};

			fileReader.onerror = (error) => {
				reject(error);
			};
		});
	}

	const fileUpload = watch('coverImage');

	async function uploadImage() {
		if (fileUpload) {
			const base64 = await convertBase64(fileUpload[0]);

			setImageIsLoading(true);
			const timer = setTimeout(() => {
				setImageDisplay(base64);
				setImageName(fileUpload[0]);

				setImageIsLoading(false);
			}, 1200);
			return () => clearTimeout(timer);
		}
	}

	async function handleRegisterBook(data: registerFormData) {
		const config = {
			headers: { 'content-type': 'multipart/form-data' },
			onUploadProgress: (event: any) => {
				console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total));
			},
		};

		const formData = new FormData();

		try {
			setSubmtingFormLoading(true);

			formData.append('cover_image', fileUpload[0]);
			formData.append('author', data.author);
			formData.append('title', data.title);
			formData.append('total_pages', data.totalPages.toString());
			formData.append('categories', JSON.stringify(data.categories));

			const { data: result } = await api.post('/books/register', formData, config);

			setSubmtingFormLoading(false);
			ShowSuccessRequest(result);
			reset();
			setImageDisplay('');
			setImageName('');
		} catch (error) {
			setSubmtingFormLoading(false);
			ShowErrorRequest(error);
		}
	}

	useEffect(() => {
		if (fileUpload?.length > 0) {
			uploadImage();
		}
	}, [fileUpload]);

	return (
		<>
			<NextSeo title='Cadastrar novos livros | BookWise' noindex />

			<RegisterContainer>
				<Header css={{ padding: '40px 0' }}>
					<Notebook size={32} />
					<h3>Cadastrar</h3>
				</Header>

				<TextsContainer>
					<p>
						Caso você queira contribuir com a plataforma, é possível cadastrar um novo livro. O livro que você cadastrar ficará disponível na seção{' '}
						<i>
							<strong>explorar</strong>
						</i>
						, assim, todos poderão comentá-lo e avaliá-lo.
					</p>

					<p>
						Para cadastrar um novo livro, é necessário preencher o pequeno formulário logo abaixo. Todos os campos são obrigatórios, inclusive o de inserir uma
						imagem como capa para o livro. Certifique-se de escolher uma boa imagem para servir como capa do livro.
					</p>

					<p>
						Por favor, não use esse espaço para violar as políticas da plataforma, insira apenas livros de conteúdo que estão de acordo e respeitem os termos da
						plataforma.
					</p>
				</TextsContainer>

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

						<UploadContainer>
							<Button as='label' type='button' colorScheme='white'>
								<UploadSimple size={22} />
								Inserir imagem
								<input hidden accept='image/*' type='file' {...register('coverImage')} />
							</Button>

							{imageDisplay && !imageIsLoading && (
								<motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ duration: 0.2 }}>
									<div className='imgDisplay'>
										<Image src={imageDisplay} alt='' width={108} height={152} />
										<span>{imageName.name}</span>
									</div>
								</motion.div>
							)}
							{imageIsLoading && <Progress />}

							{errors.coverImage && <ErrorMessage>{errors.coverImage.message?.toString()}</ErrorMessage>}
						</UploadContainer>

						<SubmitButtonContainer>
							<Button type='submit' disabled={isSubmitting || submtingFormLoading || imageIsLoading}>
								Cadastrar
								{submtingFormLoading && <Spinner />}
							</Button>
						</SubmitButtonContainer>
					</Form>
				</RegisterCard>
			</RegisterContainer>
		</>
	);
}

Register.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};

export const getStaticProps: GetStaticProps = async () => {
	const categories = await prisma.category.findMany({
		orderBy: {
			category: 'asc',
		},
	});

	return {
		props: {
			categories,
		},
		revalidate: 60 * 60 * 24,
	};
};
