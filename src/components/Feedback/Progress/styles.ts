import { styled } from '@/styles';
import * as Progress from '@radix-ui/react-progress';

export const Container = styled('div', {});

export const ProgressRoot = styled(Progress.Root, {
	position: 'relative',
	overflow: 'hidden',
	background: '$gray600',
	borderRadius: '99999px',
	width: '100%',
	height: 12,

	transform: 'translateZ(0)',
});

export const ProgressIndicator = styled(Progress.Indicator, {
	background: '$gradient-horizontal',
	width: '100%',
	height: '100%',
	transition: 'transform 660ms cubic-bezier(0.65, 0, 0.35, 1)',
});
