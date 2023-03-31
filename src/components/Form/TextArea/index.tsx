import { ChangeEvent, ComponentProps, forwardRef, ForwardRefRenderFunction, useState } from 'react';

import { CharacterCount, TextAreaContainer, TextAreaElement } from './styles';

interface ITextAreaProps extends ComponentProps<typeof TextAreaElement> {
	minHeight?: number;
	maxCharacteres?: number;
}

const TextAreaBase: ForwardRefRenderFunction<HTMLTextAreaElement, ITextAreaProps> = ({ minHeight, maxCharacteres, ...props }, ref) => {
	const [charactersAmount, setCharactersAmount] = useState('');

	function handlerCharacterCounter(event: ChangeEvent<HTMLTextAreaElement>) {
		setCharactersAmount(event.target.value);
	}

	return (
		<TextAreaContainer>
			<TextAreaElement
				style={{ minHeight }}
				maxLength={maxCharacteres}
				{...props}
				ref={ref}
				onChangeCapture={(e: ChangeEvent<HTMLTextAreaElement>) => handlerCharacterCounter(e)}
			/>

			{!!maxCharacteres && (
				<CharacterCount>
					{charactersAmount.length} / {maxCharacteres}
				</CharacterCount>
			)}
		</TextAreaContainer>
	);
};

export const TextArea = forwardRef(TextAreaBase);
