import { ReactNode } from 'react';

interface LayoutProps {
	children: ReactNode;
}

export default function DefaultLayout({ children }: LayoutProps) {
	return (
		<div>
			<div>Nav Bar</div>
			<div>Header</div>
			<div>{children}</div>
			<div>Side bar</div>
		</div>
	);
}
