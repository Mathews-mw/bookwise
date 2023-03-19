import { styled } from '@/styles';
import { motion } from 'framer-motion';

export const Container = styled('div', {
	position: 'relative',
	width: '2rem',
	height: '2rem',
});

export const Circle = styled(motion.span, {
	display: 'block',
	width: '2rem',
	height: '2rem',
	border: '0.25rem solid $gray300',
	borderTop: '0.25rem solid $gray500',
	borderRadius: '50%',
	position: 'absolute',
	boxSizing: 'border-box',
	top: 0,
	left: 0,
});
