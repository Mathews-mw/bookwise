import { styled } from '@/styles';

export const RegisterContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	maxWidth: 996,
	margin: 'auto',
});

export const RegisterCard = styled('div', {
	padding: '1.5rem',
	background: '$gray700',
	borderRadius: 8,
});

export const BreadcrumbTitleContainer = styled('div', {
	display: 'flex',
	justifyContent: 'space-between',

	marginBottom: '1rem',
});

export const Form = styled('form', {
	display: 'flex',
	flexDirection: 'column',
	gap: '1rem',
});

export const InputsGroup = styled('div', {
	display: 'grid',
	gridGap: '1rem',
	gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
});

export const UploadContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '$3',
	maxWidth: 280,

	img: {
		borderRadius: '$md',
	},

	'.imgDisplay': {
		display: 'flex',
		flexDirection: 'column',
		gap: 8,
		color: '$gray400',
	},
});

export const SubmitButtonContainer = styled('div', {
	display: 'flex',
	justifyContent: 'end',
});
