import { styled } from '@/styles';

export const SkeletonContainer = styled('div', {
	display: 'flex',
	padding: '18px 20px',
	gap: 20,

	background: '$gray700',
	borderRadius: '$md',

	'.group': {
		flex: 1,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
});
