import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardProp, initialBoardList, TaskProp } from "@src/data/boardEntries";

type BoardState = {
	boards: BoardProp[];
	activeBoardId: string | null;
};

const getFromLocalStorage = <T>(key: string, fallback: T): T => {
	const data = localStorage.getItem(key);
	return data ? JSON.parse(data) : fallback;
};
const saveToLocalStorage = <T>(key: string, value: T): void => {
	localStorage.setItem(key, JSON.stringify(value));
};
const reorderTasks = (tasks: TaskProp[]): TaskProp[] => {
	return tasks.map((task, index) => ({ ...task, order: index }));
};

const initialState: BoardState = {
	boards: getFromLocalStorage("kanbanBoards", initialBoardList),
	activeBoardId: null,
};

const boardSlice = createSlice({
	name: "boards",
	initialState,
	reducers: {
		setBoards: (state, action: PayloadAction<BoardProp[]>) => {
			state.boards = action.payload;
			saveToLocalStorage("kanbanBoards", state.boards);
		},

		addTask: (
			state,
			action: PayloadAction<{ boardId: string; task: Partial<TaskProp> }>,
		) => {
			const { boardId, task } = action.payload;
			const board = state.boards.find((board) => board.id === boardId);
			if (!board) {
				return;
			}

			const newTask: TaskProp = {
				id: Date.now(),
				boardId,
				title: task.title || "New Task",
				content: task.content || "",
				order: board.tasks.length,
			};

			board.tasks.push(newTask);
			saveToLocalStorage("kanbanBoards", state.boards);
		},

		updateTask: (
			state,
			action: PayloadAction<{
				boardId: string;
				taskId: number;
				updates: Partial<TaskProp>;
			}>,
		) => {
			const { boardId, taskId, updates } = action.payload;
			const board = state.boards.find((board) => board.id === boardId);
			if (!board) {
				return;
			}

			const task = board.tasks.find((task) => task.id === taskId);
			if (task) {
				Object.assign(task, updates);
			}
			saveToLocalStorage("kanbanBoards", state.boards);
		},

		deleteTask: (
			state,
			action: PayloadAction<{ boardId: string; taskId: number }>,
		) => {
			const { boardId, taskId } = action.payload;
			const board = state.boards.find((board) => board.id === boardId);
			if (!board) {
				return;
			}

			board.tasks = board.tasks.filter((task) => task.id !== taskId);
			saveToLocalStorage("kanbanBoards", state.boards);
		},

		moveTask: (
			state,
			action: PayloadAction<{
				activeId: number;
				overId: number | null;
				sourceBoardId: string;
				destinationBoardId: string;
				sourceIndex?: number;
				destinationIndex?: number;
			}>,
		) => {
			const { activeId, sourceBoardId, destinationBoardId, destinationIndex } =
				action.payload;

			const sourceBoard = state.boards.find(
				(board) => board.id === sourceBoardId,
			);
			const destinationBoard = state.boards.find(
				(board) => board.id === destinationBoardId,
			);

			if (!sourceBoard || !destinationBoard) {
				return;
			}

			const taskIndex = sourceBoard.tasks.findIndex(
				(task) => task.id === activeId,
			);
			if (taskIndex === -1) {
				return;
			}

			const [taskToMove] = sourceBoard.tasks.splice(taskIndex, 1);
			if (sourceBoardId !== destinationBoardId) {
				taskToMove.boardId = destinationBoardId;
			}

			const insertIndex = destinationIndex ?? destinationBoard.tasks.length;
			destinationBoard.tasks.splice(insertIndex, 0, taskToMove);

			sourceBoard.tasks = reorderTasks(sourceBoard.tasks);
			destinationBoard.tasks = reorderTasks(destinationBoard.tasks);

			sourceBoard.tasks.forEach((task, index) => {
				task.order = index + 1;
			});
			destinationBoard.tasks.forEach((task, index) => {
				task.order = index + 1;
			});

			saveToLocalStorage("kanbanBoards", state.boards);
		},
	},
});

export const { addTask, updateTask, deleteTask, moveTask, setBoards } =
	boardSlice.actions;
export default boardSlice.reducer;
