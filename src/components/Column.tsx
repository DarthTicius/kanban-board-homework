import { DownCaret } from "@src/assets/icons/DownCaret";
import { ReactNode } from "react";
type Props = {
	title: string;
	children: ReactNode;
};
export function Column({ children, title }: Props) {
	return (
		<details
			className="group/column flex flex-col flex-shrink-0 w-full md:w-72"
			open={true}
		>
			<summary className="flex justify-between items-center flex-shrink-0 h-10 px-2">
				<div className="flex items-center">
					<h2 className="block text-sm font-semibold">{title}</h2>
					<span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">6</span>
				</div>
				<div className="flex items-center">
					<button className="flex items-center justify-center w-6 h-6 text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100">
						<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
						</svg>
					</button>
					<div>
						<DownCaret className="flex-shrink-0 transition-transform duration-300 group-open/column:-rotate-180" />
					</div>
				</div>
			</summary>
			<div className="flex flex-col pb-2 overflow-auto">
				{children}
			</div>
		</details>
	)
}
