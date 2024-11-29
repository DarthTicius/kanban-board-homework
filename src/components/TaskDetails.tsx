import { CloseIcon } from "@src/assets/icons/Close";
import { useAppDispatch, useAppSelector } from "@src/hooks/redux";
import { addTask, updateTask } from "@src/store/slices/boardSlice";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Props = {
	onClose: () => void;
};

export function TaskDetails({ onClose }: Props) {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { boardId, taskId } = useParams<{ boardId: string; taskId: string }>();
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [isNew] = useState(!taskId || taskId === "new");

	// Get the task from Redux store
	const task = useAppSelector((state) => {
		if (!boardId || !taskId || isNew) return null;

		const board = state.boards.boards.find((b) => b.id === boardId);
		const foundTask = board?.tasks.find((t) => t.id === Number(taskId));
		return foundTask || null;
	});

	// Load task data when component mounts or when task changes
	useEffect(() => {
		if (task) {
			setTitle(task.title);
			setContent(task.content);
		}
	}, [task]);

	const handleSave = () => {
		if (!title.trim()) {
			alert("Task title cannot be empty.");
			return;
		}

		if (!boardId) {
			console.error("Missing boardId");
			return;
		}

		if (isNew) {
			dispatch(
				addTask({
					boardId,
					task: {
						title,
						content,
					},
				}),
			);
		} else {
			dispatch(
				updateTask({
					boardId,
					taskId: Number(taskId),
					updates: {
						title,
						content,
					},
				}),
			);
		}

		handleClose();
	};

	const handleClose = () => {
		onClose();
		navigate("/");
	};

	return (
		<div className="fixed top-0 right-0 h-full w-11/12 md:w-1/3 bg-white shadow-lg p-4 z-50">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-bold">
					{isNew ? "New Task" : `Edit Task: ${task?.title}`}
				</h2>
				<button
					onClick={handleClose}
					className="text-gray-500 hover:text-gray-800"
				>
					<CloseIcon className="w-5 h-5" />
				</button>
			</div>
			<div className="space-y-4">
				<input
					type="text"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Task title..."
					className="w-full px-3 py-2 border rounded focus:outline-none"
				/>
				<textarea
					value={content}
					onChange={(e) => setContent(e.target.value)}
					placeholder="Task content..."
					className="w-full px-3 py-2 border rounded focus:outline-none"
					rows={5}
				/>
			</div>
			<button
				onClick={handleSave}
				className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
			>
				Save Task
			</button>
		</div>
	);
}
