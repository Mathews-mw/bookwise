import { ReactElement } from 'react';
import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';

import { LinkContainer } from './styles';

interface INavLinkProps extends LinkProps {
	children: ReactElement;
	shouldMatchExactHref?: boolean;
	href: string;
	getUrlPath?: (urlPath: string) => void;
}

export function NavLink({ children, getUrlPath, shouldMatchExactHref, href, ...rest }: INavLinkProps) {
	const { asPath } = useRouter();

	let isActive = false;

	if (asPath === href || asPath === rest.as) {
		isActive = true;

		if (getUrlPath) {
			getUrlPath(asPath);
		}
	}

	return (
		<LinkContainer>
			<Link href={href} className={isActive ? 'activeLink' : ''} {...rest}>
				{children}
			</Link>
		</LinkContainer>
	);
}
