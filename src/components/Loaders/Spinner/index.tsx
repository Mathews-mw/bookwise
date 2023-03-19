import { Container, Circle } from './styles';

export function Spinner() {
	return (
		<Container>
			<Circle animate={{ rotate: 360 }} transition={{ repeat: Infinity, repeatDelay: 0, ease: 'linear', duration: 1 }}></Circle>
		</Container>
	);
}
