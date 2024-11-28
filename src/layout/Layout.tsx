import { Board } from "@src/components/Board";
import { Footer } from "@src/components/Footer";
import { Header } from "@src/components/Header";
import { TaskDetails } from "@src/components/TaskDetails";
import { BoardProp } from "@src/data/boardEntries";
import { TaskManager } from "@src/data/taskManager";
import "@style/app.scss";
import { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router";

export function Layout() {
	const navigate = useNavigate();
	const [boards, setBoards] = useState<BoardProp[]>(() => TaskManager.getAllBoards());

	useEffect(() => {
		TaskManager.saveBoards(boards);
	}, [boards]);

	return (
		<div className="max-w-screen-2xl mx-auto">
			<Header />
			<Board boards={boards} setBoards={setBoards} />
			<Routes>
				<Route
					path="board/:boardId/task/:taskId"
					element={
						<TaskDetails
							onSave={(task) => {
								TaskManager.updateTask(task.boardId, task.id, task);
								setBoards(TaskManager.getAllBoards());
								navigate('/');
							}}
							onClose={() => navigate('/')}
						/>
					}
				/>
			</Routes>
			<Footer />
		</div>
	)
}
