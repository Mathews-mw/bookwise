import { styled } from '@/styles';

export const Container = styled('div', {
	height: '16rem',
	width: '28rem',
	maxWidth: '100%',
	textAlign: 'center',
	position: 'relative',

	'.input-file-upload': {
		display: 'none',
	},

	'.label-file-upload': {
		height: '100%',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderWidth: 2,
		borderRadius: '1rem',
		borderStyle: 'dashed',
		borderColor: '#cbd5e1',
		backgroundColor: '#f8fafc',
	},

	'.upload-button': {
		cursor: 'pointer',
		padding: '0.25rem',
		fontSize: '1rem',
		border: 'none',
		backgroundColor: 'transparent',
	},

	'.upload-button:hover': {
		textDecorationLine: 'underline',
	},
});
