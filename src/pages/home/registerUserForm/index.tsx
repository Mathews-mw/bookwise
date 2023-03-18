import { TextInput } from '@/components/Form/TextInput';
import { Multistep } from '@/components/Multistep';
import { Container, Form } from './styles';

export function RegisterUserForm() {
	return (
		<Container>
			<Form>
				<label>
					<span>Nome completo</span>
					<TextInput name='username' placeholder='Seu nome' />
				</label>
				<label>
					<span>Nome do usuário</span>
					<TextInput name='username' prefix='@' placeholder='seu-usuário' />
				</label>
			</Form>
		</Container>
	);
}
