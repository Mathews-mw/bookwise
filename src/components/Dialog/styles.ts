import { styled, keyframes } from '@/styles';
import * as Dialog from '@radix-ui/react-dialog';

export const Container = styled('div', {});

const overlayShow = keyframes({
	'0%': { opacity: 0 },
	'100%': { opacity: 1 },
});

const contentShow = keyframes({
	'0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
	'100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

export const DialogOverlay = styled(Dialog.Overlay, {
	backgroundColor: '$gray800',
	position: 'fixed',
	inset: 0,
	animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const DialogContent = styled(Dialog.Content, {
	backgroundColor: 'white',
	borderRadius: 6,
	boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
	position: 'fixed',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: '90vw',
	maxWidth: '450px',
	maxHeight: '85vh',
	padding: 25,
	animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
	'&:focus': { outline: 'none' },
});

export const DialogTitle = styled(Dialog.Title, {
	margin: 0,
	fontWeight: 500,
	color: '$gray900',
	fontSize: 17,
});

export const DialogDescription = styled(Dialog.Description, {
	margin: '10px 0 20px',
	color: '$gray800',
	fontSize: 15,
	lineHeight: 1.5,
});

export const Flex = styled('div', { display: 'flex' });

export const Button = styled('button', {
	all: 'unset',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: 4,
	padding: '0 15px',
	fontSize: 15,
	lineHeight: 1,
	fontWeight: 500,
	height: 35,

	variants: {
		variant: {
			violet: {
				backgroundColor: 'white',
				color: '$purple200',
				boxShadow: `0 2px 10px $gray600`,
				'&:hover': { backgroundColor: '$purple100' },
				'&:focus': { boxShadow: `0 0 0 2px black` },
			},
			green: {
				backgroundColor: '$green200',
				color: '$green100',
				'&:hover': { backgroundColor: '$green300' },
				'&:focus': { boxShadow: `0 0 0 2px green` },
			},
		},
	},

	defaultVariants: {
		variant: 'violet',
	},
});

export const IconButton = styled('button', {
	all: 'unset',
	fontFamily: 'inherit',
	borderRadius: '100%',
	height: 25,
	width: 25,
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	color: '$purple100',
	position: 'absolute',
	top: 10,
	right: 10,

	'&:hover': { backgroundColor: '$purple200' },
	'&:focus': { boxShadow: `0 0 0 2px $purple200` },
});

export const Fieldset = styled('fieldset', {
	all: 'unset',
	display: 'flex',
	gap: 20,
	alignItems: 'center',
	marginBottom: 15,
});

export const Label = styled('label', {
	fontSize: 15,
	color: '$purple100',
	width: 90,
	textAlign: 'right',
});

export const Input = styled('input', {
	all: 'unset',
	width: '100%',
	flex: '1',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'center',
	borderRadius: 4,
	padding: '0 10px',
	fontSize: 15,
	lineHeight: 1,
	color: '$purple100',
	boxShadow: `0 0 0 1px $purple200`,
	height: 35,

	'&:focus': { boxShadow: `0 0 0 2px $purple200` },
});
