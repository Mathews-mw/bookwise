import { ComponentProps, forwardRef, ForwardRefRenderFunction } from 'react';

import { InputTextContainer, TextInputContainer, Prefix, Input } from './styles';

export interface ITextInputProps extends ComponentProps<typeof Input> {
	prefix?: string;
}

const TextInputBase: ForwardRefRenderFunction<HTMLInputElement, ITextInputProps> = ({ prefix, ...props }, ref) => {
	return (
		<InputTextContainer>
			<TextInputContainer>
				{!!prefix && <Prefix>{prefix}</Prefix>}
				<Input ref={ref} {...props} />
			</TextInputContainer>
		</InputTextContainer>
	);
};

export const TextInput = forwardRef(TextInputBase);
