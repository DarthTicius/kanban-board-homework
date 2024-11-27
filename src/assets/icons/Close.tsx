import type { ComponentProps } from "react";

type Props = ComponentProps<"svg">;

export function CloseIcon(props: Props) {
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
				stroke="currentColor"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M18 6L6 18M6 6L18 18"
			/>
		</svg>
	);
}
