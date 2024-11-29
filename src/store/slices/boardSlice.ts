import { UniqueIdentifier } from "@dnd-kit/core";
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
			action: PayloadAction<{ boardId: string; task: Partial<TaskProp> }>,
		) => {
			const { boardId, task } = action.payload;
			const boardIndex = state.boards.findIndex(
				(board) => board.id === boardId,
			);

			if (boardIndex !== -1) {
				const newTask: TaskProp = {
					id: Date.now(),
					boardId,
					title: task.title || "New Task",
					content: task.content || "",
					order: state.boards[boardIndex].tasks.length,
				};

				state.boards[boardIndex].tasks.push(newTask);
				localStorage.setItem("kanbanBoards", JSON.stringify(state.boards));
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
					localStorage.setItem("kanbanBoards", JSON.stringify(state.boards));
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
		moveTask: (
			state,
			action: PayloadAction<{
				activeId: UniqueIdentifier;
				overId: UniqueIdentifier;
				sourceBoardId: string;
				destinationBoardId: string;
			}>,
		) => {
			const { activeId, overId, sourceBoardId, destinationBoardId } =
				action.payload;

			const sourceBoardIndex = state.boards.findIndex(
				(board) => board.id === sourceBoardId,
			);
			const destinationBoardIndex = state.boards.findIndex(
				(board) => board.id === destinationBoardId,
			);

			if (sourceBoardIndex === -1 || destinationBoardIndex === -1) return;

			const sourceBoard = state.boards[sourceBoardIndex];
			const destinationBoard = state.boards[destinationBoardIndex];

			const taskToMove = sourceBoard.tasks.find((task) => task.id === activeId);
			if (!taskToMove) return;

			sourceBoard.tasks = sourceBoard.tasks.filter(
				(task) => task.id !== activeId,
			);
			const overTaskIndex = destinationBoard.tasks.findIndex(
				(task) => task.id === overId,
			);

			const destinationIndex =
				overTaskIndex !== -1 ? overTaskIndex : destinationBoard.tasks.length;

			if (sourceBoardId !== destinationBoardId) {
				taskToMove.boardId = destinationBoardId;
			}
			destinationBoard.tasks.splice(destinationIndex, 0, {
				...taskToMove,
				order: destinationIndex,
			});
			destinationBoard.tasks = destinationBoard.tasks.map((task, index) => ({
				...task,
				order: index,
			}));

			localStorage.setItem("kanbanBoards", JSON.stringify(state.boards));
		},
	},
});

export const { addTask, updateTask, deleteTask, moveTask } = boardSlice.actions;
export default boardSlice.reducer;
