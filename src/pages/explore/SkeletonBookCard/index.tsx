import Skeleton from 'react-loading-skeleton';
import { SkeletonContainer } from './styles';

export function SkeletonBookCard() {
	return (
		<SkeletonContainer>
			<Skeleton height={152} width={108} />

			<div className='group'>
				<Skeleton count={2} />
				<Skeleton />
			</div>
		</SkeletonContainer>
	);
}
