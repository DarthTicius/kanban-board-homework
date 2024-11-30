import { beforeEach, describe, expect, it, vi } from "vitest";
import { initialBoardList } from "../src/data/boardEntries";
import reducer, {
	addTask,
	moveTaskBetweenBoards,
	reorderTasks,
	updateTask,
} from "../src/store/slices/boardSlice";

describe("Board Slice Reducer", () => {
	let initialState: ReturnType<typeof reducer>;

	beforeEach(() => {
		// Reset localStorage and state before each test
		localStorage.clear();
		initialState = {
			boards: initialBoardList,
			activeBoardId: null,
			activeTaskId: null,
			activeTask: null,
			overContainerId: null,
		};
	});

	it("should add a new task to a specific board", () => {
		const newTask = { title: "Test Task", content: "Test Content" };
		const action = addTask({
			columnId: initialBoardList[0].id,
			task: newTask,
		});

		const nextState = reducer(initialState, action);

		expect(nextState.boards[0].tasks).toHaveLength(
			initialBoardList[0].tasks.length + 1,
		);
		expect(
			nextState.boards[0].tasks[nextState.boards[0].tasks.length - 1].title,
		).toBe(newTask.title);
	});

	it("should fail to add task to non-existent board", () => {
		const newTask = { title: "Test Task", content: "Test Content" };
		const action = addTask({
			columnId: "non-existent-board",
			task: newTask,
		});

		const nextState = reducer(initialState, action);

		// State should remain unchanged
		expect(nextState).toEqual(initialState);
	});

	it("should update an existing task", () => {
		const existingTask = initialBoardList[0].tasks[0];
		const action = updateTask({
			activeBoardId: initialBoardList[0].id,
			activeTaskId: existingTask.id,
			updates: { title: "Updated Task Title" },
		});

		const nextState = reducer(initialState, action);

		const updatedTask = nextState.boards[0].tasks.find(
			(task) => task.id === existingTask.id,
		);
		expect(updatedTask?.title).toBe("Updated Task Title");
	});

	it("should move a task between boards", () => {
		const sourceBoardId = initialBoardList[0].id;
		const destinationBoardId = initialBoardList[1].id;
		const taskToMove = initialBoardList[0].tasks[0];

		const action = moveTaskBetweenBoards({
			activeId: taskToMove.id,
			overId: destinationBoardId,
			sourceBoardId,
			destinationBoardId,
		});

		const nextState = reducer(initialState, action);

		// Check source board
		expect(nextState.boards[0].tasks).not.toContain(taskToMove);
		// Check destination board
		expect(nextState.boards[1].tasks).toContain(taskToMove);
	});

	it("should reorder tasks within a board", () => {
		const boardId = initialBoardList[0].id;
		const initialTasks = [...initialBoardList[0].tasks];

		const action = reorderTasks({
			boardId,
			oldIndex: 0,
			newIndex: 1,
		});

		const nextState = reducer(initialState, action);

		const updatedTasks = nextState.boards[0].tasks;
		expect(updatedTasks[0]).toBe(initialTasks[1]);
		expect(updatedTasks[1]).toBe(initialTasks[0]);
	});

	it("should fail to update task in non-existent board and log an error", () => {
		// Mock console.error
		const consoleErrorSpy = vi
			.spyOn(console, "error")
			.mockImplementation(() => {});

		const action = updateTask({
			activeBoardId: "non-existent-board",
			activeTaskId: "some-task-id",
			updates: { title: "Updated Task Title" },
		});

		const nextState = reducer(initialState, action);

		// Check that console.error was called
		expect(consoleErrorSpy).toHaveBeenCalledWith(
			`Board with ID non-existent-board not found.`,
		);

		// State should remain unchanged
		expect(nextState).toEqual(initialState);

		// Restore the original console.error
		consoleErrorSpy.mockRestore();
	});
});
