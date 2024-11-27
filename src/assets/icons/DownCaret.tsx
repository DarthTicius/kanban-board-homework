import type { ComponentProps } from "react";

type Props = ComponentProps<"svg">;

export function DownCaret(props: Props) {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="15"
			height="9"
			fill="currentColor"
			{...props}
		>
			<path
				fill="currentColor"
				d="M2.474.857C2.048.391 1.622.381 1.196.828c-.426.447-.426.885 0 1.313l6.042 6.067a.772.772 0 0 0 .639.292.772.772 0 0 0 .639-.292l6.041-6.067c.426-.428.426-.866 0-1.313-.426-.447-.852-.437-1.278.03L7.877 6.224 2.474.857Z"
			/>
		</svg>
	);
}
