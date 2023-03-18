import type { AppProps } from 'next/app';
import { Nunito } from '@next/font/google';
import { SessionProvider } from 'next-auth/react';

import { globalStyles } from '@/styles/global';

const nunito = Nunito({ subsets: ['latin'] });

globalStyles();
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<div className={nunito.className}>
			<SessionProvider session={session}>
				<Component {...pageProps} />
			</SessionProvider>
		</div>
	);
}
