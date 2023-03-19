import DefaultLayout from '@/layouts/Default';
import { ReactElement } from 'react';

export default function Explore() {
	return (
		<div>
			<h3>Explore</h3>
		</div>
	);
}

Explore.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};
