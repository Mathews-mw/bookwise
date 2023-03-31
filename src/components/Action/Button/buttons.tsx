import { ComponentProps, ElementType, ReactNode } from 'react';
import { ButtonElement } from './styles';

export interface IButtonProps extends ComponentProps<typeof ButtonElement> {
	children: ReactNode;
	variant?: 'outline' | 'primary' | 'ghost';
	colorScheme?: 'purple' | 'white';
	size?: 'sm' | 'md';
	as?: ElementType;
}

export function Button({ children, variant, colorScheme, size, as, ...props }: IButtonProps) {
	return (
		<ButtonElement as={as} variant={variant} colorScheme={colorScheme} size={size} {...props}>
			{children}
		</ButtonElement>
	);
}
