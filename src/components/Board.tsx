import { Card } from "@components/Card";
import { Column } from "@components/Column";
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	PointerSensor,
	rectIntersection,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { TaskProp } from "@src/data/boardEntries";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import {
	addTask,
	deleteTask,
	moveTask,
	updateTask,
} from "@src/store/slices/boardSlice";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";

export function Board() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const boards = useAppSelector((state) => state.boards.boards);
	const [activeId, setActiveId] = useState<string | null>(null);
	const [dragOverlay, setDragOverlay] = useState<TaskProp | null>(null);

	const findBoardByTaskId = useCallback(
		(taskId: number) => {
			return boards.find((board) =>
				board.tasks.some((task) => task.id === taskId),
			);
		},
		[boards],
	);

	const findTask = useCallback(
		(taskId: number) => {
			for (const board of boards) {
				const task = board.tasks.find((t) => t.id === taskId);
				if (task) return task;
			}
			return null;
		},
		[boards],
	);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		}),
	);

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		setActiveId(active.id.toString());

		const task = findTask(Number(active.id));
		if (task) {
			setDragOverlay(task);
		}
	};

	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event;
		if (!over) {
			return;
		}

		const activeId = Number(active.id);
		const overId = Number(over.id);

		const activeBoard = findBoardByTaskId(activeId);
		const overBoard = findBoardByTaskId(overId);

		if (!activeBoard || !overBoard) {
			return;
		}
		if (activeId === overId) {
			return;
		}
		const activeTaskIndex = activeBoard.tasks.findIndex(
			(t) => t.id === activeId,
		);
		const overTaskIndex = overBoard.tasks.findIndex((t) => t.id === overId);
		dispatch(
			moveTask({
				activeId: activeId,
				overId: activeBoard.id,
				sourceBoardId: activeBoard.id,
				destinationBoardId: overBoard.id,
			}),
		);
	};

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		setActiveId(null);
		setDragOverlay(null);

		if (!over) return;

		const activeBoard = findBoardByTaskId(Number(active.id));
		const overBoardId = (over.data.current as { boardId?: string })?.boardId;
		const overBoard = overBoardId
			? boards.find((b) => b.id === overBoardId)
			: findBoardByTaskId(Number(over.id));

		if (!activeBoard || !overBoard) return;

		dispatch(
			moveTask({
				activeId: Number(active.id),
				overId: overBoardId
					? activeBoard.tasks[activeBoard.tasks.length - 1]?.id
					: Number(over.id),
				sourceBoardId: activeBoard.id,
				destinationBoardId: overBoard.id,
			}),
		);
	};
	const handleUpdateTask = (
		boardId: string,
		taskId: number,
		updates: Partial<TaskProp>,
	) => {
		dispatch(updateTask({ boardId, taskId, updates }));
	};

	const handleDeleteTask = (boardId: string, taskId: number) => {
		dispatch(deleteTask({ boardId, taskId }));
	};

	const handleMoveTask = (
		taskId: number,
		sourceBoardId: string,
		destinationBoardId: string,
		sourceIndex: number,
		destinationIndex: number,
	) => {
		const sourceBoard = boards.find((board) => board.id === sourceBoardId);
		const taskToMove = sourceBoard?.tasks[sourceIndex];

		if (taskToMove) {
			const overTask = boards.find((board) => board.id === destinationBoardId)
				?.tasks[destinationIndex];

			dispatch(
				moveTask({
					activeId: taskToMove.id,
					overId: overTask?.id || taskToMove.id,
					sourceBoardId,
					destinationBoardId,
				}),
			);
		}
	};

	const handleAddTask = (boardId: string) => {
		const newTaskId = Date.now();
		const newTask = {
			title: "New Task",
			content: "",
			boardId,
			id: newTaskId,
		};
		dispatch(addTask({ boardId, task: newTask }));
		navigate(`/board/${boardId}/task/${newTaskId}`);
	};

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={rectIntersection}
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
								onCreateTask={() => handleAddTask(board.id)}
								onUpdateTask={handleUpdateTask}
								onDeleteTask={handleDeleteTask}
								onMoveTask={handleMoveTask}
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
						index={-1}
						onUpdate={handleUpdateTask}
						onDelete={handleDeleteTask}
					/>
				) : null}
			</DragOverlay>
		</DndContext>
	);
}
