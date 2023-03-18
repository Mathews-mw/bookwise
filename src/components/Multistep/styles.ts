import { styled } from '@/styles';

export const MultiStepContainer = styled('div', {});

export const Label = styled('small', {
	color: '$gray200',
});

export const Steps = styled('div', {
	display: 'grid',
	gridTemplateColumns: 'repeat(var(--steps-size), 1fr)',
	gap: '0.5rem',
	marginTop: '0.25rem',
});

export const Step = styled('div', {
	height: '0.25rem',
	borderRadius: '2px',
	backgroundColor: '$gray600',
	transition: '0.3s',
	transitionTimingFunction: 'ease-in-out',

	variants: {
		active: {
			true: {
				backgroundColor: '$purple100',
			},
		},
	},
});
