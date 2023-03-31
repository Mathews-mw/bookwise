import { styled } from '@/styles';

export const ButtonElement = styled('button', {
	all: 'unset',

	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	gap: 16,

	fontSize: '$md',
	fontWeight: '$bold',
	fontFamily: '$default',
	boxSizing: 'border-box',
	padding: '0 $6',

	borderRadius: '$sm',

	cursor: 'pointer',

	'&:disabled': {
		cursor: 'not-allowed',
	},

	variants: {
		variant: {
			primary: {
				'&:disabled': {
					cursor: 'not-allowed',
					background: '$gray400',
					color: '$gray300',
				},
			},

			outline: {
				background: 'transparent',
				border: '2px solid $gray600',

				'&:hover': {
					background: '$gray700',
				},

				'&:disabled': {
					cursor: 'not-allowed',
					background: 'transparent',
					border: '2px solid $gray400',
					color: '$gray400',
				},
			},

			ghost: {
				background: 'none !important',
				border: 'none',

				'&:hover': {
					background: 'rgba(131, 129, 217, 0.02) !important',
				},

				'&:disabled': {
					cursor: 'not-allowed',
					background: 'transparent',
					color: '$gray400',
				},
			},
		},

		colorScheme: {
			purple: {
				background: 'rgba(131, 129, 217, 0.06)',
				color: '$purple100',

				'&:hover': {
					background: '$gray600',
				},
			},

			white: {
				background: 'rgba(230, 232, 242, 0.04);',
				color: '$gray200',

				'&:hover': {
					background: '$gray700',
				},
			},
		},

		size: {
			sm: {
				height: 38,
				padding: '0 $4',
			},

			md: {
				height: 46,
			},
		},
	},

	defaultVariants: {
		variant: 'primary',
		colorScheme: 'purple',
		size: 'md',
	},
});
