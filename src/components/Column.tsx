import { Card } from "@components/Card";
import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DownCaret } from "@src/assets/icons/DownCaret";
import { TaskProp } from "@src/data/boardEntries";

type Props = {
	title: string;
	tasks: TaskProp[];
	columnId: string;
	onAddTask: () => void;
	onDeleteTask: (taskId: number, boardId: string) => void;
};

export function Column({
	columnId,
	title,
	tasks,
	onAddTask,
	onDeleteTask,
}: Props) {
	const { setNodeRef, isOver } = useDroppable({
		id: columnId,
		data: { type: "column", boardId: columnId },
	});

	return (
		<div
			className={`group/column flex flex-col flex-shrink-0 w-full md:w-72 ${
				isOver ? "bg-indigo-50" : ""
			}`}
		>
			<details open data-column-id={columnId}>
				<summary className="flex justify-between items-center h-10 px-2">
					<div className="flex items-center">
						<h2 className="text-sm font-semibold">{title}</h2>
						<span className="ml-2 flex items-center justify-center w-5 h-5 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
							{tasks.length}
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
					id={columnId}
					items={tasks.map((task) => task.id)}
					strategy={verticalListSortingStrategy}
				>
					<div className="space-y-4 pb-4" ref={setNodeRef}>
						{tasks.map((task, index) => (
							<Card
								key={task.id}
								task={task}
								index={index}
								columnId={columnId}
								onDelete={() => onDeleteTask(task.id, columnId)}
							/>
						))}
					</div>
				</SortableContext>
			</details>
		</div>
	);
}
