import { useDraggable } from "@dnd-kit/core";
import { Calendar } from "@src/assets/icons/Calendar";
import { CloseIcon } from "@src/assets/icons/Close";
import { TaskProp } from "@src/data/boardEntries";
import { motion } from "motion/react";
import { useRef, useState, type TouchEvent } from "react";
import { useNavigate } from "react-router";

type CardProps = {
	task: TaskProp;
	columnId: string;
	index: number;
	onDelete: (taskId: number, boardId: string) => void;
};
export function Card({ task, columnId, index, onDelete }: CardProps) {
	const navigate = useNavigate();

	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id: task.id.toString(),
		});

	const handleDelete = () => {
		onDelete(task.id, columnId);
	};

	const handleEdit = () => {
		navigate(`/board/${columnId}/task/${task.id}`);
	};

	const style = transform
		? {
				transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
				transition: "transform 0.2s ease",
				zIndex: isDragging ? 50 : "auto",
				opacity: isDragging ? 0.5 : 1,
			}
		: undefined;

	const date = new Date();
	const formattedDate = new Intl.DateTimeFormat("en-UK", {
		month: "short",
		day: "2-digit",
	}).format(date);
	const touchTimeout = useRef<ReturnType<typeof setTimeout>>();
	const [touchCount, setTouchCount] = useState(0);

	const handleTouch = (e: TouchEvent) => {
		e.preventDefault();
		setTouchCount((prev) => prev + 1);

		if (touchTimeout.current) {
			clearTimeout(touchTimeout.current);
		}

		if (touchCount === 1) {
			handleEdit();
			setTouchCount(0);
		} else {
			touchTimeout.current = setTimeout(() => {
				setTouchCount(0);
			}, 300);
		}
	};

	return (
		<motion.div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			layout
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{
				opacity: isDragging ? 0.5 : 1,
				scale: isDragging ? 0.95 : 1,
			}}
			className="draggable-card group/card relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 hover:bg-opacity-100"
			onDoubleClick={handleEdit}
			onTouchStart={handleTouch}
		>
			<button className="absolute top-0 right-0 hidden items-center justify-center w-5 h-5 mt-3 mr-2 text-gray-500 rounded group-hover/card:bg-gray-200 group-hover/card:text-gray-700 group-hover/card:flex">
				<CloseIcon
					className="w-4 h-4 fill-current"
					onClick={(e) => {
						e.stopPropagation();
						handleDelete();
					}}
				/>
			</button>
			<h3 className="flex items-center h-6 px-3 text-xs font-semibold bg-pink-100 rounded-full">
				{task.title}
			</h3>
			<div className="overflow-hidden text-ellipsis whitespace-normal line-clamp-2">
				<p className="mt-3 text-sm font-medium ">{task.content}</p>
			</div>
			<div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
				<div className="flex items-center">
					<Calendar className="w-4 h-4 text-gray-300" />
					<span className="ml-1 leading-none">{formattedDate}</span>
				</div>
			</div>
		</motion.div>
	);
}
