import { BoardProp, initialBoardList, TaskProp } from "@src/data/boardEntries";

const STORAGE_KEY = "kanbanBoards";

export const TaskManager = {
	getAllBoards: (): BoardProp[] => {
		const savedBoards = localStorage.getItem(STORAGE_KEY);
		return savedBoards ? JSON.parse(savedBoards) : initialBoardList;
	},

	saveBoards: (boards: BoardProp[]): void => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(boards));
	},

	getTask: (boardId: string, taskId: number): TaskProp | null => {
		const boards = TaskManager.getAllBoards();
		const board = boards.find((b) => b.id === boardId);
		return board?.tasks.find((t) => t.id === taskId) || null;
	},

	addTask: (boardId: string, task: Omit<TaskProp, "id">): TaskProp => {
		const boards = TaskManager.getAllBoards();
		const newTask: TaskProp = {
			...task,
			id: Date.now(),
			boardId,
		};

		const updatedBoards = boards.map((board) =>
			board.id === boardId
				? { ...board, tasks: [...board.tasks, newTask] }
				: board,
		);

		TaskManager.saveBoards(updatedBoards);
		return newTask;
	},

	updateTask: (
		boardId: string,
		taskId: number,
		updates: Partial<TaskProp>,
	): TaskProp | null => {
		const boards = TaskManager.getAllBoards();
		let updatedTask: TaskProp | null = null;

		const updatedBoards = boards.map((board) => {
			if (board.id === boardId) {
				const updatedTasks = board.tasks.map((task) => {
					if (task.id === taskId) {
						updatedTask = { ...task, ...updates };
						return updatedTask;
					}
					return task;
				});
				return { ...board, tasks: updatedTasks };
			}
			return board;
		});

		TaskManager.saveBoards(updatedBoards);
		return updatedTask;
	},

	deleteTask: (boardId: string, taskId: number): void => {
		const boards = TaskManager.getAllBoards();
		const updatedBoards = boards.map((board) =>
			board.id === boardId
				? { ...board, tasks: board.tasks.filter((task) => task.id !== taskId) }
				: board,
		);
		TaskManager.saveBoards(updatedBoards);
	},
};
