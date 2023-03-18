import DefaultLayout from '@/layouts/Default';
import { ReactElement } from 'react';

export default function Home() {
	return (
		<div>
			<h1>Home</h1>
		</div>
	);
}

Home.getLayout = function getLayout(page: ReactElement) {
	return <DefaultLayout>{page}</DefaultLayout>;
};
