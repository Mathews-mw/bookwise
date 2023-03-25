import { IconProps } from '@phosphor-icons/react';
import { ComponentProps, forwardRef, ForwardRefRenderFunction } from 'react';

import { InputTextContainer, TextInputContainer, Prefix, Input } from './styles';

export interface ITextInputProps extends ComponentProps<typeof Input> {
	prefix?: string;
	iconRight?: IconProps;
}

const TextInputBase: ForwardRefRenderFunction<HTMLInputElement, ITextInputProps> = ({ prefix, iconRight, ...props }, ref) => {
	return (
		<InputTextContainer>
			<TextInputContainer>
				<>
					{!!prefix && <Prefix>{prefix}</Prefix>}
					<Input ref={ref} {...props} />
					{!!iconRight && iconRight}
				</>
			</TextInputContainer>
		</InputTextContainer>
	);
};

export const TextInput = forwardRef(TextInputBase);
