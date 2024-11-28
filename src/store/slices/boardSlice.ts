import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardProp, initialBoardList, TaskProp } from "@src/data/boardEntries";

type BoardState = {
	boards: BoardProp[];
};

const initialState: BoardState = {
	boards: localStorage.getItem("kanbanBoards")
		? JSON.parse(localStorage.getItem("kanbanBoards")!)
		: initialBoardList,
};

const boardSlice = createSlice({
	name: "boards",
	initialState,
	reducers: {
		setBoards: (state, action: PayloadAction<BoardProp[]>) => {
			state.boards = action.payload;
			localStorage.setItem("kanbanBoards", JSON.stringify(action.payload));
		},
		addTask: (
			state,
			action: PayloadAction<{ boardId: string; task: Omit<TaskProp, "id"> }>,
		) => {
			const { boardId, task } = action.payload;
			const boardIndex = state.boards.findIndex(
				(board) => board.id === boardId,
			);

			if (boardIndex !== -1) {
				const newTask: TaskProp = {
					...task,
					id: Date.now(),
					boardId,
				};
				state.boards[boardIndex].tasks.push(newTask);
			}
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
			const boardIndex = state.boards.findIndex(
				(board) => board.id === boardId,
			);

			if (boardIndex !== -1) {
				const taskIndex = state.boards[boardIndex].tasks.findIndex(
					(task) => task.id === taskId,
				);

				if (taskIndex !== -1) {
					state.boards[boardIndex].tasks[taskIndex] = {
						...state.boards[boardIndex].tasks[taskIndex],
						...updates,
					};
				}
			}
		},
		deleteTask: (
			state,
			action: PayloadAction<{ boardId: string; taskId: number }>,
		) => {
			const { boardId, taskId } = action.payload;
			const boardIndex = state.boards.findIndex(
				(board) => board.id === boardId,
			);

			if (boardIndex !== -1) {
				state.boards[boardIndex].tasks = state.boards[boardIndex].tasks.filter(
					(task) => task.id !== taskId,
				);
			}
		},
	},
});

export const { addTask, updateTask, deleteTask } = boardSlice.actions;
export default boardSlice.reducer;
