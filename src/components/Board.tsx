import { Column } from "@components/Column";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { addTask } from "@src/store/slices/boardSlice";
import { useNavigate } from "react-router";


export function Board() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const boards = useAppSelector((state) => state.boards.boards);

	const handleAddTask = (boardId: string) => {
		const newTask = {
			title: "",
			content: "",
			boardId
		};

		const taskId = Date.now();
		dispatch(addTask({ boardId, task: newTask }));
		navigate(`/board/${boardId}/task/${taskId}`);
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
