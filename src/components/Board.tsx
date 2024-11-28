import { Column } from "@components/Column";
import { BoardProp, TaskProp } from "@src/data/boardEntries";
import { TaskManager } from "@src/data/taskManager";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router";

type Props = {
	boards: BoardProp[];
	setBoards: Dispatch<SetStateAction<BoardProp[]>>;
};

export function Board({ boards, setBoards }: Props) {
	const navigate = useNavigate();
	const handleAddTask = (boardId: string): void => {
		const newTask = TaskManager.addTask(boardId, {
			title: "",
			content: "",
			boardId
		});
		setBoards(TaskManager.getAllBoards());
		navigate(`/board/${boardId}/task/${newTask.id}`);
	};

	const handleUpdateTask = (boardId: string, taskId: number, updates: Partial<TaskProp>): void => {
		TaskManager.updateTask(boardId, taskId, updates);
		setBoards(TaskManager.getAllBoards());
	};

	const handleDeleteTask = (boardId: string, taskId: number): void => {
		TaskManager.deleteTask(boardId, taskId);
		setBoards(TaskManager.getAllBoards());
	};

	return (
		<div className="flex flex-col h-full max-g-full sm:max-h-[66vh] bg-gray-200">
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
						/>
					))}
				</div>
			</div>
		</div>
	);
}
