import { useRouter } from 'next/router';
import Link, { LinkProps } from 'next/link';
import { cloneElement, ReactElement } from 'react';
import { LinkContainer } from './styles';
import { Url } from 'next/dist/shared/lib/router/router';

interface INavLinkProps extends LinkProps {
	children: ReactElement;
	shouldMatchExactHref?: boolean;
	href: string;
}

export function NavLink({ children, shouldMatchExactHref, href, ...rest }: INavLinkProps) {
	const { asPath } = useRouter();
	console.log('asPath: ', asPath);

	let isActive = false;

	if (asPath === href || asPath === rest.as) {
		isActive = true;
	}

	console.log('isActive: ', href, isActive);

	return (
		<LinkContainer>
			<Link href={href} className={isActive ? 'activeLink' : ''} {...rest}>
				{children}
			</Link>
		</LinkContainer>
	);
}
