import { CloseIcon } from "@src/assets/icons/Close";
import { TaskProp } from "@src/data/boardEntries";
import { TaskManager } from "@src/data/taskManager";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

type Props = {
	onSave: (task: TaskProp) => void;
	onClose: () => void;
};

export function TaskDetails({ onSave, onClose }: Props) {
	const navigate = useNavigate();
	const { boardId, taskId } = useParams<{ boardId: string; taskId: string }>();
	const [task, setTask] = useState<TaskProp | null>(null);
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');

	useEffect(() => {
		if (boardId && taskId) {
			const existingTask = TaskManager.getTask(boardId, Number(taskId));
			if (existingTask) {
				setTask(existingTask);
				setTitle(existingTask.title);
				setContent(existingTask.content);
			}
		}
	}, [boardId, taskId]);

	const handleSave = () => {
		if (!title.trim()) {
			alert('Task title cannot be empty.');
			return;
		}

		if (!boardId || !taskId) {
			console.error('Missing boardId or taskId');
			return;
		}

		const updatedTask: TaskProp = {
			id: Number(taskId),
			boardId,
			title,
			content
		};

		onSave(updatedTask);
		navigate('/');
	};

	const handleClose = () => {
		onClose();
		navigate('/');
	};

	return (
		<div className="fixed top-0 right-0 h-full w-11/12 md:w-1/3 bg-white shadow-lg p-4 z-50">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-lg font-bold">{task ? 'Edit Task' : 'New Task'}</h2>
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
