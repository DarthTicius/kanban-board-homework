import { Column } from "@components/Column";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import {
	addTask,
	deleteTask,
	updateTask,
} from "@src/store/slices/boardSlice";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";


export function Board() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const boards = useAppSelector((state) => state.boards.boards);
	const [activeId, setActiveId] = useState<string | null>(null);
	const findBoardByTaskId = useCallback(
		(taskId: number) => {
			return boards.find((board) =>
				board.tasks.some((task) => task.id === taskId),
			);
		},
		[boards],
	);

	const findTask = useCallback(
		(taskId: number) => {
			for (const board of boards) {
				const task = board.tasks.find((t) => t.id === taskId);
				if (task) return task;
			}
			return null;
		},
		[boards],
	);
	const handleUpdateTask = (
		boardId: string,
		taskId: number,
		updates: Partial<TaskProp>,
	) => {
		dispatch(updateTask({ boardId, taskId, updates }));
	};

	const handleDeleteTask = (boardId: string, taskId: number) => {
		dispatch(deleteTask({ boardId, taskId }));
	};


	const handleAddTask = (boardId: string) => {
		const newTaskId = Date.now(); // Generate unique ID
		const newTask = {
			title: "New Task",
			content: "",
			boardId,
			id: newTaskId,
		};
		dispatch(addTask({ boardId, task: newTask }));
		navigate(`/board/${boardId}/task/${newTaskId}`);
	};

	return (
			<div className="flex flex-col h-full max-h-full sm:max-h-[66vh] bg-gray-200">
				<div className="px-10 mt-6">
					<h1 className="text-2xl font-bold">Homework Kanban Project Board</h1>
				</div>
				<div className="flex-grow overflow-auto mx-4 mb-4 pt-4 space-x-6">
					<div className="flex md:flex-row flex-col flex-shrink-0 gap-4">
						{boards.map((board) => (
							<Column
								key={board.id}
								columnId={board.id}
								title={board.title}
								tasks={board.tasks}
								onCreateTask={() => handleAddTask(board.id)}
								onUpdateTask={handleUpdateTask}
								onDeleteTask={handleDeleteTask}
								onMoveTask={handleMoveTask}
							/>
						))}
					</div>
				</div>
			</div>
	);
}
