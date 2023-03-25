import { theme } from '@/styles';
import { ComponentProps, forwardRef, ForwardRefRenderFunction } from 'react';
import Select, { Props } from 'react-select';
import makeAnimated from 'react-select/animated';

interface IDropdownProps extends Props {
	label?: string;
	isMulti?: boolean;
}

const DropdownBase: ForwardRefRenderFunction<HTMLSelectElement, IDropdownProps> = ({ label, isMulti = false, ...props }, ref) => {
	const animatedComponents = makeAnimated();

	return (
		<Select
			closeMenuOnSelect={false}
			components={animatedComponents}
			isMulti={isMulti}
			theme={(defaultTheme) => ({
				...defaultTheme,
				borderRadius: 5,
				colors: {
					...defaultTheme.colors,
					primary25: `${theme.colors.purple200}`,
					primary: `${theme.colors.purple200}`,
					neutral0: `${theme.colors.gray800}`,
					neutral10: `${theme.colors.green200}`,
					neutral20: `${theme.colors.gray500}`,
					neutral30: `${theme.colors.purple200}`,
					neutral40: `${theme.colors.purple200}`,
					neutral50: `${theme.colors.gray400}`,
					neutral60: `${theme.colors.purple200}`,
					neutral70: `red`,
					neutral80: `${theme.colors.gray200}`, // multiValue text color
					neutral90: `yellow`,
				},
			})}
			styles={{
				control: (baseStyles, state) => ({
					...baseStyles,
					border: `solid 2px ${state.isFocused ? theme.colors.purple200 : theme.colors.gray500}`,
					boxShadow: `${state.isFocused && '0 0 6px rgba(42, 40, 121, 1)'}`,
					padding: 4,
				}),
				option: (baseStyle, state) => ({
					...baseStyle,
					color: `${state.isDisabled ? theme.colors.gray400 : theme.colors.gray200}`,
					opacity: `${state.isDisabled ? 0.5 : 1}`,
				}),
			}}
			// ref={ref}
			{...props}
		/>
	);
};

export const Dropdown = forwardRef(DropdownBase);
