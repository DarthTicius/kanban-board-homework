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

if (!localStorage.getItem("kanbanBoards")) {
	saveToLocalStorage("kanbanBoards", initialBoardList);
}
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
			action: PayloadAction<{
				columnId: string;
				task: Partial<TaskProp>;
			}>,
		) => {
			const { columnId, task } = action.payload;
			const board = state.boards.find((board) => board.id === columnId);

			if (!board) {
				console.error(`Board with ID ${columnId} not found.`);
				return;
			}

			const newTask: TaskProp = {
				id: String(Date.now()),
				title: task.title?.trim() || "Untitled Task",
				content: task.content?.trim() || "",
			};

			board.tasks.push(newTask);
			saveToLocalStorage("kanbanBoards", state.boards);
		},

		updateTask: (
			state,
			action: PayloadAction<{
				updates: Partial<TaskProp>;
				activeBoardId: string;
				activeTaskId: string;
				isNew?: boolean;
			}>,
		) => {
			const { updates, activeBoardId, activeTaskId, isNew } = action.payload;

			const board = state.boards.find((board) => board.id === activeBoardId);
			if (!board) {
				console.error(`Board with ID ${activeBoardId} not found.`);
				return;
			}

			if (isNew) {
				const newTask: TaskProp = {
					id: String(Date.now()),
					title: updates.title || "New Task",
					content: updates.content || "",
				};
				board.tasks.push(newTask);
			} else {
				const taskIndex = board.tasks.findIndex(
					(task) => task.id === activeTaskId,
				);
				if (taskIndex === -1) {
					console.error(`Task with ID ${activeTaskId} not found.`);
					return;
				}

				board.tasks[taskIndex] = {
					...board.tasks[taskIndex],
					...updates,
					title: updates.title?.trim() || board.tasks[taskIndex].title,
					content: updates.content?.trim() || board.tasks[taskIndex].content,
				};
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

			if (!sourceBoard || !destinationBoard) {
				return;
			}

			const taskIndex = sourceBoard.tasks.findIndex(
				(task) => task.id === activeId,
			);
			if (taskIndex === -1) {
				return;
			}
			const [movedTask] = sourceBoard.tasks.splice(taskIndex, 1);
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
