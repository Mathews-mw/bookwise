import { styled } from '@/styles';

export const Container = styled('div', {});

export const Form = styled('form', {
	display: 'flex',
	flexDirection: 'column',
	gap: '$4',

	label: {
		display: 'flex',
		flexDirection: 'column',
		gap: '$2',

		color: '$gray300',
	},
});
