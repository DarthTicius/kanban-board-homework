import { Board } from "@src/components/Board";
import { Footer } from "@src/components/Footer";
import { Header } from "@src/components/Header";
import { TaskDetails } from "@src/components/TaskDetails";
import "@style/app.scss";
import { Route, Routes, useNavigate } from "react-router";

export function Layout() {
	const navigate = useNavigate();

	return (
		<div className="max-w-screen-2xl mx-auto">
			<Header />
			<Board />
			<Routes>
				<Route
					path="board/:boardId/task/:taskId"
					element={
						<TaskDetails onClose={() => navigate('/')} />
					}
				/>
			</Routes>
			<Footer />
		</div>
	)
}
