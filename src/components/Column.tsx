import { Card } from "@components/Card";
import { useDroppable } from "@dnd-kit/core";
import { DownCaret } from "@src/assets/icons/DownCaret";
import { TaskProp } from "@src/data/boardEntries";
import { useAppDispatch } from "@src/hooks/redux";
import { deleteTask } from "@src/store/slices/boardSlice";
import { useNavigate } from "react-router";

type Props = {
	title: string;
	tasks: TaskProp[];
	columnId: string;
	onCreateTask: () => void;
	onMoveTask: (
		taskId: number,
		sourceBoardId: string,
		destinationBoardId: string,
		sourceIndex: number,
		destinationIndex: number,
	) => void;
	onUpdateTask: (
		boardId: string,
		taskId: number,
		updates: Partial<TaskProp>,
	) => void;
	onDeleteTask: (boardId: string, taskId: number) => void;
};

export function Column({
	columnId,
	title,
	tasks,
	onCreateTask,
	onUpdateTask,
	onDeleteTask,
}: Props) {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { setNodeRef } = useDroppable({
		id: columnId,
		data: {
			boardId: columnId,
			type: "column",
		},
	});

	const handleDeleteTask = (taskId: number) => {
		dispatch(deleteTask({ boardId: columnId, taskId }));
	};

	const handleTaskClick = (taskId: number) => {
		navigate(`/board/${columnId}/task/${taskId}`);
	};
	return (
		<details
			className="group/column flex flex-col flex-shrink-0 w-full md:w-72"
			open={true}
			data-column-id={columnId}
		>
			<summary className="flex justify-between items-center flex-shrink-0 h-10 px-2">
				<div className="flex items-center">
					<h2 className="block text-sm font-semibold">{title}</h2>
					<span className="flex items-center justify-center w-5 h-5 ml-2 text-sm font-semibold text-indigo-500 bg-white rounded bg-opacity-30">
						{tasks.length}
					</span>
				</div>
				<div className="flex items-center">
					<button
						onClick={onCreateTask}
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
					<div>
						<DownCaret className="flex-shrink-0 transition-transform duration-300 group-open/column:-rotate-180" />
					</div>
				</div>
			</summary>
			<div
				ref={setNodeRef}
				className="flex flex-col pb-2 overflow-auto"
				data-column-id={columnId}
			>
				{tasks.map((task, idx) => (
					<Card
						key={`${task.id}`}
						task={task}
						columnId={columnId}
						index={idx}
						onUpdate={onUpdateTask}
						onDelete={onDeleteTask}
					/>
				))}
			</div>
		</details>
	);
}
