import { ReactNode } from 'react';
import { FieldError } from 'react-hook-form';
import { ErrorMessageContainer } from './styles';

interface IErrorMessageProps {
	children?: ReactNode;
	error?: FieldError;
}

export function ErrorMessage({ error, children }: IErrorMessageProps) {
	if (error) {
		return <ErrorMessageContainer>{error.message}</ErrorMessageContainer>;
	}

	return <ErrorMessageContainer>{children}</ErrorMessageContainer>;
}
