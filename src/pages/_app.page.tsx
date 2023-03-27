import '../lib/dayjs';
import 'react-toastify/dist/ReactToastify.css';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { Nunito } from '@next/font/google';
import { queryClient } from '@/lib/react-query';
import { ReactElement, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from 'next-auth/react';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { globalStyles } from '@/styles/global';

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
			<QueryClientProvider client={queryClient}>
				<SessionProvider session={session}>{getLayout(<Component {...pageProps} />)}</SessionProvider>

				<ToastContainer />
				<ReactQueryDevtools />
			</QueryClientProvider>
		</div>
	);
}
