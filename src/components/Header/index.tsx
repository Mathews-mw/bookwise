import { ChartLineUp } from 'phosphor-react';
import { HeaderContainer } from './styles';

export function Header() {
	return (
		<HeaderContainer>
			<ChartLineUp size={24} />
			<h3>Início</h3>
		</HeaderContainer>
	);
}
