import type { ComponentProps } from 'react';

type IconProps = ComponentProps<'svg'>;

export function Twitter(props: IconProps) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="100%"
			height="100%"
			viewBox="0 0 24 24"
			fill="none"
			{...props}
		>
			<path
				fill="currentColor"
				fillRule="evenodd"
				clipRule="evenodd"
				d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z"
			/>
		</svg>
	);
}
