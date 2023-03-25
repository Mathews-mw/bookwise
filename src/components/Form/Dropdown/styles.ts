import { styled } from '@/styles';
import * as Select from '@radix-ui/react-select';

export const SelectTrigger = styled(Select.SelectTrigger, {
	all: 'unset',
	boxSizing: 'border-box',
	display: 'inline-flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	width: '100%',
	padding: '14px 20px',
	gap: 5,
	borderRadius: '$sm',
	backgroundColor: '$gray800',
	border: '2px solid $gray500',
	color: '$purple100',
	boxShadow: `0 2px 10px $gray700`,

	transition: 'all 200ms ease-in-out',

	'&:hover': { border: '2px solid $purple200' },
	'&:focus': {
		borderColor: '$purple200',
		boxShadow: '0 0 6px rgba(42, 40, 121, 1)',
	},
	'&[data-placeholder]': { color: '$gray400' },
});

export const SelectIcon = styled(Select.SelectIcon, {
	color: '$gray200',
});

export const SelectContent = styled(Select.Content, {
	overflow: 'hidden',
	boxSizing: 'border-box',
	display: 'flex',
	width: '100%',

	backgroundColor: '$gray700',
	borderRadius: '$sm',
	boxShadow: '0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)',
});

export const SelectViewport = styled(Select.Viewport, {
	display: 'flex',
	flexDirection: 'column',
	boxSizing: 'border-box',
	width: '100%',
});

export const StyledItem = styled(Select.Item, {
	fontSize: 14,
	lineHeight: 1,
	color: '$purple100',
	borderRadius: 3,
	display: 'flex',
	alignItems: 'center',
	width: '100%',
	height: 25,
	padding: '0 35px 0 25px',
	position: 'relative',
	userSelect: 'none',

	'&[data-disabled]': {
		color: '$gray400',
		pointerEvents: 'none',
	},

	'&[data-highlighted]': {
		outline: 'none',
		backgroundColor: '$gray500',
		color: '$purple200',
	},
});
