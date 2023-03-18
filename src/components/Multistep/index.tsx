import { MultiStepContainer, Label, Steps, Step } from './styles';

export interface IMultiStepProps {
	size: number;
	currentStep: number;
	showSteps?: boolean;
}

export function Multistep({ size, currentStep, showSteps = false }: IMultiStepProps) {
	return (
		<MultiStepContainer>
			{showSteps && (
				<Label>
					Passo {currentStep} de {size}
				</Label>
			)}

			<Steps css={{ '--steps-size': size }}>
				{Array.from({ length: size }, (_, i) => i + 1).map((step) => {
					return <Step key={step} active={currentStep >= step} />;
				})}
			</Steps>
		</MultiStepContainer>
	);
}
