import '../lib/dayjs';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Nunito } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';

import { globalStyles } from '@/styles/global';
import { ReactElement, ReactNode } from 'react';

const nunito = Nunito({ subsets: ['latin'] });

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
	getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
	Component: NextPageWithLayout;
};

globalStyles();
export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
	const getLayout = Component.getLayout ?? ((page) => page);

	return (
		<div className={nunito.className}>
			<SessionProvider session={session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>
		</div>
	);
}
