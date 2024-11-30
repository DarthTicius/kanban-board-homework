import { Card } from "@components/Card";
import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DownCaret } from "@src/assets/icons/DownCaret";
import { TaskProp } from "@src/data/boardEntries";

type Props = {
	id: string;
	title: string;
	items: TaskProp[];
	isOver: boolean;
	onAddTask: () => void;
	onDeleteTask: (taskId: string, boardId: string) => void;
};

export function Column({
	id,
	title,
	items,
	isOver,
	onAddTask,
	onDeleteTask,
}: Props) {
	const { setNodeRef } = useDroppable({
		id: id,
	});

	return (
		<div
			ref={setNodeRef}
			className={`group/column flex flex-col flex-shrink-0 w-full md:w-72 ${isOver ? "bg-indigo-50" : ""
				}`}
		>
			<details open >
				<summary className="flex justify-between items-center h-10 px-2">
					<div className="flex items-center">
						<h2 className="text-sm font-semibold">{title}</h2>
						<span className="ml-2 flex items-center justify-center w-5 h-5 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
							{items.length}
						</span>
					</div>
					<div className="flex items-center">
						<button
							onClick={onAddTask}
							className="flex items-center justify-center w-6 h-6 text-indigo-500 rounded hover:bg-indigo-500 hover:text-indigo-100"
						>
							<svg
								className="w-5 h-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M12 6v6m0 0v6m0-6h6m-6 0H6"
								></path>
							</svg>
						</button>
						<DownCaret className="transition-transform duration-300 group-open/column:-rotate-180" />
					</div>
				</summary>

				<SortableContext
					items={items.map((task) => task.id)}
					strategy={verticalListSortingStrategy}
				>
					<div className="space-y-4 pb-4">
						{items.map((task) => (
							<Card
								key={task.id}
								id={task.id}
								task={task}
								onDelete={() => onDeleteTask(task.id, id)}
							/>
						))}
					</div>
				</SortableContext>
				{items.length === 0 && (
					<div className="text-center text-gray-400 py-4">Drop items here</div>
				)}
			</details>
		</div>
	);
}
