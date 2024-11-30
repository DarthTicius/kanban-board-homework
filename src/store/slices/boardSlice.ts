import { arrayMove } from "@dnd-kit/sortable";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardProp, initialBoardList, TaskProp } from "@src/data/boardEntries";

type BoardState = {
	boards: BoardProp[];
	activeBoardId: string | null;
	activeTaskId: string | null;
	activeTask: TaskProp | null;
	overContainerId: string | null;
};

const getFromLocalStorage = <T>(key: string, fallback: T): T => {
	const data = localStorage.getItem(key);
	return data ? JSON.parse(data) : fallback;
};
const saveToLocalStorage = <T>(key: string, value: T): void => {
	localStorage.setItem(key, JSON.stringify(value));
};

const initialState: BoardState = {
	boards: getFromLocalStorage("kanbanBoards", initialBoardList),
	activeBoardId: null,
	activeTaskId: null,
	activeTask: null,
	overContainerId: null,
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
				id: String(Date.now()),
				title: task.title || "New Task",
				content: task.content || "",
			};

			board.tasks.push(newTask);
			saveToLocalStorage("kanbanBoards", state.boards);
		},

		updateTask: (
			state,
			action: PayloadAction<{
				boardId: string;
				taskId: string;
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
			action: PayloadAction<{ boardId: string; taskId: string }>,
		) => {
			const { boardId, taskId } = action.payload;
			const board = state.boards.find((board) => board.id === boardId);
			if (!board) {
				return;
			}

			board.tasks = board.tasks.filter((task) => task.id !== taskId);
			saveToLocalStorage("kanbanBoards", state.boards);
		},
		//
		setActiveDragItem: (
			state,
			action: PayloadAction<{ taskId: string | null; task: TaskProp | null }>,
		) => {
			state.activeTaskId = action.payload.taskId;
			state.activeTask = action.payload.task;
		},

		setOverContainer: (state, action: PayloadAction<string | null>) => {
			state.overContainerId = action.payload;
		},

		moveTaskBetweenBoards: (
			state,
			action: PayloadAction<{
				activeId: string;
				overId: string;
				sourceBoardId: string;
				destinationBoardId: string;
			}>,
		) => {
			const { activeId, sourceBoardId, destinationBoardId } = action.payload;

			const sourceBoard = state.boards.find(
				(board) => board.id === sourceBoardId,
			);
			const destinationBoard = state.boards.find(
				(board) => board.id === destinationBoardId,
			);

			if (!sourceBoard || !destinationBoard) return;

			const taskIndex = sourceBoard.tasks.findIndex(
				(task) => task.id === activeId,
			);
			if (taskIndex === -1) return;

			// Remove task from source board
			const [movedTask] = sourceBoard.tasks.splice(taskIndex, 1);

			// Add task to destination board
			destinationBoard.tasks.push(movedTask);

			saveToLocalStorage("kanbanBoards", state.boards);
		},

		reorderTasks: (
			state,
			action: PayloadAction<{
				boardId: string;
				oldIndex: number;
				newIndex: number;
			}>,
		) => {
			const { boardId, oldIndex, newIndex } = action.payload;
			const board = state.boards.find((b) => b.id === boardId);

			if (board) {
				board.tasks = arrayMove(board.tasks, oldIndex, newIndex);
				saveToLocalStorage("kanbanBoards", state.boards);
			}
		},

		// moveTask: (
		// 	state,
		// 	action: PayloadAction<{
		// 		activeId: number;
		// 		overId: number | null;
		// 		sourceBoardId: string;
		// 		destinationBoardId: string;
		// 		sourceIndex?: number;
		// 		destinationIndex?: number;
		// 	}>,
		// ) => {
		// 	const { activeId, sourceBoardId, destinationBoardId, destinationIndex } =
		// 		action.payload;

		// 	const sourceBoard = state.boards.find(
		// 		(board) => board.id === sourceBoardId,
		// 	);
		// 	const destinationBoard = state.boards.find(
		// 		(board) => board.id === destinationBoardId,
		// 	);

		// 	if (!sourceBoard || !destinationBoard) {
		// 		return;
		// 	}

		// 	const taskIndex = sourceBoard.tasks.findIndex(
		// 		(task) => task.id === activeId,
		// 	);
		// 	if (taskIndex === -1) {
		// 		return;
		// 	}

		// 	const [taskToMove] = sourceBoard.tasks.splice(taskIndex, 1);
		// 	if (sourceBoardId !== destinationBoardId) {
		// 		taskToMove.boardId = destinationBoardId;
		// 	}

		// 	const insertIndex = destinationIndex ?? destinationBoard.tasks.length;
		// 	destinationBoard.tasks.splice(insertIndex, 0, taskToMove);

		// 	sourceBoard.tasks = reorderTasks(sourceBoard.tasks);
		// 	destinationBoard.tasks = reorderTasks(destinationBoard.tasks);

		// 	sourceBoard.tasks.forEach((task, index) => {
		// 		task.order = index + 1;
		// 	});
		// 	destinationBoard.tasks.forEach((task, index) => {
		// 		task.order = index + 1;
		// 	});

		// 	saveToLocalStorage("kanbanBoards", state.boards);
		// },
	},
});

export const {
	addTask,
	updateTask,
	deleteTask,
	setBoards,
	setActiveDragItem,
	setOverContainer,
	moveTaskBetweenBoards,
	reorderTasks,
} = boardSlice.actions;
export default boardSlice.reducer;
