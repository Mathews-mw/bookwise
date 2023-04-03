import Skeleton from 'react-loading-skeleton';
import { BookCardContainer, BookDetail } from '../styles';

export function BookDetailSkeleton() {
	return (
		<BookDetail>
			<BookCardContainer>
				<Skeleton width={172} height={242} />

				<div className='group' style={{ width: '100%' }}>
					<div style={{ width: '100%' }}>
						<Skeleton count={2} style={{ width: '100%' }} />
					</div>

					<div style={{ width: '100%' }}>
						<Skeleton />
					</div>
				</div>
			</BookCardContainer>

			<div className='divider'></div>

			<div style={{ width: '100%', padding: '1rem 0' }}>
				<Skeleton style={{ width: '100%' }} />
			</div>
		</BookDetail>
	);
}
