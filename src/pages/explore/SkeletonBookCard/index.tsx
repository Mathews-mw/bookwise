import { SkeletonContainer } from './styles';
import Skeleton from 'react-loading-skeleton';

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
