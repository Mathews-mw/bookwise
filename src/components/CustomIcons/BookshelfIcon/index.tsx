interface IBookshelfIconProps {
	size?: number;
	color?: string;
}

export function BookshelfIcon({ size = 32, color = '#000' }: IBookshelfIconProps) {
	return (
		<div style={{ display: 'flex', width: size, height: size, color }}>
			<svg
				fill={color}
				height={size}
				width={size}
				version='1.1'
				id='Layer_1'
				xmlns='http://www.w3.org/2000/svg'
				xmlnsXlink='http://www.w3.org/1999/xlink'
				viewBox='0 0 502 502'
				xmlSpace='preserve'
			>
				<g id='SVGRepo_bgCarrier' strokeWidth='0'></g>
				<g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round'></g>
				<g id='SVGRepo_iconCarrier'>
					{' '}
					<g>
						{' '}
						<g>
							{' '}
							<g>
								{' '}
								<path d='M492,309h-45V128c0-5.523-4.477-10-10-10h-52V86c0-5.523-4.477-10-10-10h-62c-5.523,0-10,4.477-10,10v70h-42v-44 c0-5.523-4.477-10-10-10h-52V73c0-5.523-4.477-10-10-10h-62c-5.523,0-10,4.477-10,10v29H65c-5.523,0-10,4.477-10,10v197H10 c-5.523,0-10,4.477-10,10v36c0,5.523,4.477,10,10,10h42v64c0,5.523,4.477,10,10,10s10-4.477,10-10v-64h420 c5.523,0,10-4.477,10-10v-36C502,313.477,497.523,309,492,309z M385,138h42v171h-42V138z M323,96h42v213h-42V96z M261,176h42v133 h-42V176z M199,122h42v187h-42V122z M137,83h42v226h-42V83z M75,122h42v187H75V122z M482,345H20v-16h462V345z'></path>{' '}
								<path d='M440,379c-5.523,0-10,4.477-10,10v40c0,5.523,4.477,10,10,10s10-4.477,10-10v-40C450,383.477,445.523,379,440,379z'></path>{' '}
								<path d='M96,140c-5.523,0-10,4.477-10,10v9c0,5.523,4.477,10,10,10s10-4.477,10-10v-9C106,144.477,101.523,140,96,140z'></path>{' '}
								<path d='M96,185c-5.523,0-10,4.477-10,10v90c0,5.523,4.477,10,10,10s10-4.477,10-10v-90C106,189.477,101.523,185,96,185z'></path>{' '}
								<path d='M282,192c-5.523,0-10,4.477-10,10v5.533c0,5.523,4.477,10,10,10s10-4.477,10-10V202C292,196.477,287.523,192,282,192z'></path>{' '}
								<path d='M282,232c-5.523,0-10,4.477-10,10v43c0,5.523,4.477,10,10,10s10-4.477,10-10v-43C292,236.477,287.523,232,282,232z'></path>{' '}
							</g>{' '}
						</g>{' '}
					</g>{' '}
				</g>
			</svg>
		</div>
	);
}
