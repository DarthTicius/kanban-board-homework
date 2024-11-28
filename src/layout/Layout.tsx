import { Board } from "@src/components/Board";
import { Footer } from "@src/components/Footer";
import { Header } from "@src/components/Header";
import { TaskDetails } from "@src/components/TaskDetails";
import { useAppSelector } from "@src/hooks/redux";
import "@style/app.scss";
import { Route, Routes, useNavigate } from "react-router";

export function Layout() {
	const navigate = useNavigate();
	const boards = useAppSelector((state) => state.boards.boards);

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
