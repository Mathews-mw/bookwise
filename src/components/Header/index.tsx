import { ReactNode } from 'react';
import { HeaderContainer } from './styles';
import { CSSProperties } from '@stitches/react';

interface IHeaderProps {
	children: ReactNode;
	css?: CSSProperties;
}

export function Header({ children, css }: IHeaderProps) {
	return <HeaderContainer style={css}>{children}</HeaderContainer>;
}
