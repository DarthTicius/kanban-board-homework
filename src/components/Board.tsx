import { Card } from "@components/Card";
import { Column } from "@components/Column";
import { initialBoardList } from "@src/data/boardEntries";

export function Board() {
	return (
		<div className="flex flex-col h-full max-g-full sm:max-h-[66vh] bg-gray-200">
			<div className="px-10 mt-6">
				<h1 className="text-2xl font-bold">Homework Kanban Project Board</h1>
			</div>
			<div className="flex-grow overflow-auto mx-4 mb-4 pt-4 space-x-6">
				<div className="flex md:flex-row flex-col flex-shrink-0 gap-4">
					{initialBoardList.map((board) => (
						<Column key={board.id} title={board.title}>
							{board.tasks.map((task, idx) => (
								<Card key={idx + 1} title={task.title} content={task.content} />
							))}
						</Column>
					))}

				</div>
			</div>
		</div>
	)
}
