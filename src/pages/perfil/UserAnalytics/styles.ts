import { styled } from '@/styles';

export const UserAnalyticsContainer = styled('div', {
	borderLeft: '1px solid $gray700',
});

export const UserInfosContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '1.25rem',

	'.userName': {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',

		time: {
			fontSize: 14,
			color: '$gray400',
		},
	},
});

export const AvatarFrame = styled('div', {
	borderRadius: '$full',
	height: 78,
	width: 78,
	background: '$gradient-horizontal',

	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',

	img: {
		borderRadius: '$full',
	},
});

export const Rectangle = styled('div', {
	display: 'flex',
	padding: '2rem 0',

	'.bar': {
		width: 32,
		height: 4,
		borderRadius: '$full',

		background: '$gradient-horizontal',
	},
});

export const UserStatisticsContainer = styled('div', {
	display: 'flex',
	flexDirection: 'column',
	gap: '2.5rem',
});

export const ItemContainer = styled('div', {
	display: 'flex',
	alignItems: 'center',
	gap: '1.5rem',

	svg: {
		color: '$green100',
	},

	'.itensGroup': {
		display: 'flex',
		flexDirection: 'column',
	},

	'span:last-child': {
		color: '$gray300',
		fontSize: 14,
	},
});
