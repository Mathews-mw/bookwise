import { ComponentProps, ReactNode } from 'react';
import { Button as StichesButton } from './styles';

export interface IButtonProps extends ComponentProps<typeof StichesButton> {
	children: ReactNode;
	variant?: 'outline' | 'primary' | 'ghost';
	colorScheme?: 'purple' | 'white';
	size?: 'sm' | 'md';
}

export function Button({ children, variant, colorScheme, size }: IButtonProps) {
	return (
		<StichesButton variant={variant} colorScheme={colorScheme} size={size}>
			{children}
		</StichesButton>
	);
}
