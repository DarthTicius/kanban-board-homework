import { Calendar } from "@src/assets/icons/Calendar";
import { CloseIcon } from "@src/assets/icons/Close";
import { TaskProp } from "@src/data/boardEntries";
import { useRef, useState, type TouchEvent } from "react";
import { useNavigate } from "react-router";

type CardProps = {
	task: TaskProp;
	columnId: string;
	onDelete: () => void;
	onClick: () => void;
};
export function Card({ task, columnId, onClick, onDelete }: CardProps) {
	const navigate = useNavigate();

	const date = new Date();
	const formattedDate = new Intl.DateTimeFormat('en-UK', {
		month: 'short',
		day: '2-digit',
	}).format(date);

	const handleEdit = () => {
		navigate(`/board/${columnId}/task/${task.id}`);
	};
	const touchTimeout = useRef<ReturnType<typeof setTimeout>>();
	const [touchCount, setTouchCount] = useState(0);

	const handleTouch = (e: TouchEvent) => {
		e.preventDefault();
		setTouchCount(prev => prev + 1);

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
		<div
			className="group/card relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 hover:bg-opacity-100"
			draggable="true"
			onDoubleClick={handleEdit}
			onTouchStart={handleTouch}
		>
			<button className="absolute top-0 right-0 hidden items-center justify-center w-5 h-5 mt-3 mr-2 text-gray-500 rounded group-hover/card:bg-gray-200 group-hover/card:text-gray-700 group-hover/card:flex">
				<CloseIcon
					className="w-4 h-4 fill-current"
					onClick={(e) => {
						e.stopPropagation();
						onDelete();
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
		</div>
	);
}
