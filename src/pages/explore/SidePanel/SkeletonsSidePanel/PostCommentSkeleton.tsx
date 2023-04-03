import Skeleton from 'react-loading-skeleton';
import { theme } from '@/styles';

export function PostCommentSkeleton() {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16, background: `${theme.colors.gray700}`, padding: '1rem', borderRadius: 8 }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%' }}>
				<Skeleton circle width={40} height={40} />
				<div style={{ width: '100%' }}>
					<Skeleton width='100%' />
				</div>
			</div>

			<div>
				<Skeleton count={4} />
			</div>
		</div>
	);
}
