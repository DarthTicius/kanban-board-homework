import { Card } from "@components/Card";
import { Column } from "@components/Column";
import {
	DndContext,
	DragEndEvent,
	DragOverEvent,
	DragOverlay,
	DragStartEvent,
	KeyboardSensor,
	PointerSensor,
	rectIntersection,
	UniqueIdentifier,
	useSensor,
	useSensors,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { deleteTask, moveTaskBetweenBoards, reorderTasks, setActiveDragItem, setOverContainer } from "@src/store/slices/boardSlice";
import { useNavigate } from "react-router";

export function Board() {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const boards = useAppSelector((state) => state.boards.boards);
	const activeTaskId = useAppSelector((state) => state.boards.activeTaskId);
	const activeTask = useAppSelector((state) => state.boards.activeTask);
	const overContainerId = useAppSelector((state) => state.boards.overContainerId);
	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	const findBoardById = (id: UniqueIdentifier) => {
		return boards.find((board) => board.id === id);
	};

	const findBoardByItemId = (id: UniqueIdentifier) => {
		return boards.find((board) => board.tasks.some((task) => task.id === id));
	};

	const handleDragStart = (event: DragStartEvent) => {
		const { active } = event;
		const sourceBoard = findBoardByItemId(active.id);
		const item = sourceBoard?.tasks.find((task) => task.id === active.id);
		dispatch(setActiveDragItem({
			taskId: active.id.toString(),
			task: item || null
		}));
	};
	const handleDragOver = (event: DragOverEvent) => {
		const { active, over } = event;

		if (!over) {
			return;
		}
		const activeBoard = findBoardByItemId(active.id);
		if (!activeBoard) {
			return;
		}
		const overId = over.id;
		let destinationBoard = findBoardById(overId.toString());

		if (!destinationBoard) {
			destinationBoard = findBoardByItemId(overId);
		}
		if (!destinationBoard) {
			return;
		}

		dispatch(setOverContainer(destinationBoard.id));
		if (activeBoard.id === destinationBoard.id) {
			return;
		}
		dispatch(moveTaskBetweenBoards({
			activeId: active.id.toString(),
			overId: over.id.toString(),
			sourceBoardId: activeBoard.id,
			destinationBoardId: destinationBoard.id,
		}));
	}

	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event;
		if (!over) {
			return;
		}

		const activeBoard = findBoardByItemId(active.id);
		if (!activeBoard) {
			return;
		}
		// Destination board
		let destinationBoard = findBoardById(over.id);
		if (!destinationBoard) {
			destinationBoard = findBoardByItemId(over.id);
		}

		if (!destinationBoard) {
			return;
		}
		if (activeBoard.id === destinationBoard.id) {
			const items = destinationBoard.tasks;
			const oldIndex = items.findIndex(item => item.id === active.id);
			const newIndex = items.findIndex(item => item.id === over.id);

			if (oldIndex !== -1 && newIndex !== -1) {
				dispatch(reorderTasks({
					boardId: activeBoard.id,
					oldIndex,
					newIndex,
				}));
			}
		}

		dispatch(setActiveDragItem({ taskId: null, task: null }));
		dispatch(setOverContainer(null));
	}

	const handleAddTask = (columnId: string) => {
		navigate(`/board/${columnId}/task/new`);
	};
	const handleDeleteTask = (taskId: string, boardId: string) => {
		dispatch(deleteTask({ taskId, boardId }));
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
								id={board.id}
								title={board.title}
								items={board.tasks}
								isOver={board.id === overContainerId}
								onAddTask={() => handleAddTask(board.id)}
								onDeleteTask={handleDeleteTask}
							/>
						))}
					</div>
				</div>
			</div>

			<DragOverlay>
				{activeTaskId && activeTask ? (
					<Card id={activeTaskId.toString()} task={activeTask} onDelete={handleDeleteTask} />
				) : null}
			</DragOverlay>
		</DndContext>
	);
}
