import { FieldError } from 'react-hook-form';
import { ComponentProps, forwardRef, ForwardRefRenderFunction } from 'react';

import { InputTextContainer, TextInputContainer, Prefix, Input } from './styles';

export interface ITextInputProps extends ComponentProps<typeof Input> {
	prefix?: string;
}

export function TextInput({ prefix, ...props }: ITextInputProps) {
	return (
		<InputTextContainer>
			<TextInputContainer>
				{!!prefix && <Prefix>{prefix}</Prefix>}
				<Input {...props} />
			</TextInputContainer>
		</InputTextContainer>
	);
}
