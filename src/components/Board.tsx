import { Card } from "@components/Card";
import { Column } from "@components/Column";
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
} from "@dnd-kit/core";
import { BoardProp, TaskProp } from "@src/data/boardEntries";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { deleteTask, moveTask } from "@src/store/slices/boardSlice";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

const useFinders = (boards: BoardProp[]) => {
	const findBoardByTaskId = useCallback(
		(taskId: TaskProp["id"]) =>
			boards.find((board) => board.tasks.some((task) => task.id === taskId)),
		[boards],
	);

	const findTask = useCallback(
		(taskId: TaskProp["id"]) => {
			for (const board of boards) {
				const task = board.tasks.find((t) => t.id === taskId);
				if (task) return task;
			}
			return null;
		},
		[boards],
	);

	return { findBoardByTaskId, findTask };
};

export function Board() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const boards = useAppSelector((state) => state.boards.boards);

	const [activeId, setActiveId] = useState<string | null>(null);
	const [dragOverlay, setDragOverlay] = useState<TaskProp | null>(null);

	const { findBoardByTaskId, findTask } = useFinders(boards);

	const handleDragStart = useCallback(
		(event: DragStartEvent) => {
			const task = findTask(Number(event.active.id));
			setActiveId(event.active.id.toString());
			setDragOverlay(task || null);
		},
		[findTask],
	);
	const handleDragOver = useCallback(
		(event: DragOverEvent) => {
			const { active, over } = event;
			if (!over || active.id === over.id) return;

			const activeId = Number(active.id);
			const overId = Number(over.id);

			const activeBoard = findBoardByTaskId(activeId);
			const overBoard = findBoardByTaskId(overId);

			if (activeBoard && overBoard && activeBoard.id !== overBoard.id) {
				const sourceIndex = activeBoard.tasks.findIndex(
					(task) => task.id === activeId,
				);
				const destinationIndex = overBoard.tasks.findIndex(
					(task) => task.id === overId,
				);

				dispatch(
					moveTask({
						activeId,
						overId,
						sourceBoardId: activeBoard.id,
						destinationBoardId: overBoard.id,
						sourceIndex,
						destinationIndex,
					}),
				);
			}
		},
		[dispatch, findBoardByTaskId],
	);
	const handleDragEnd = useCallback(
		(event: DragEndEvent) => {
			const { active, over } = event;

			if (over) {
				const task = findTask(Number(active.id));
				const newBoardId = over.id;

				if (task) {
					dispatch(
						moveTask({
							activeId: task.id,
							overId: Number(newBoardId),
							sourceBoardId: task.boardId,
							destinationBoardId: newBoardId.toString(),
						}),
					);
				}
			}
			setDragOverlay(null);
		},
		[dispatch, findTask],
	);

	const handleAddTask = (columnId: string) => {
		navigate(`/board/${columnId}/task/new`);
	};
	const handleDeleteTask = (taskId: number, boardId: string) => {
		dispatch(deleteTask({ taskId, boardId }));
	};

	return (
		<DndContext
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
			onDragEnd={handleDragEnd}
		>
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
								onAddTask={() => handleAddTask(board.id)}
								onDeleteTask={handleDeleteTask}
							/>
						))}
					</div>
				</div>
			</div>

			<DragOverlay>
				{dragOverlay ? (
					<Card
						task={dragOverlay}
						columnId={dragOverlay.boardId}
						index={0}
						onDelete={handleDeleteTask}
					/>
				) : null}
			</DragOverlay>
		</DndContext>
	);
}
