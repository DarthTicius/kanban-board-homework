export type TaskProp = {
	id: number;
	boardId: string;
	title: string;
	content: string;
	order?: number;
};
export type BoardProp = {
	title: string;
	id: string;
	tasks: TaskProp[];
};

export const initialBoardList: BoardProp[] = [
	{
		title: "Done",
		id: "done",
		tasks: [
			{
				id: 1,
				boardId: "done",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: 2,
				boardId: "done",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: 3,
				boardId: "done",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: 4,
				boardId: "done",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: 5,
				boardId: "done",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: 6,
				boardId: "done",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: 7,
				boardId: "done",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: 8,
				boardId: "done",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
		],
	},
	{
		title: "Ready",
		id: "ready",
		tasks: [
			{
				id: 9,
				boardId: "ready",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: 10,
				boardId: "ready",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: 11,
				boardId: "ready",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
		],
	},
	{
		title: "In Progress",
		id: "inProgress",
		tasks: [
			{
				id: 12,
				boardId: "inProgress",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: 13,
				boardId: "inProgress",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
		],
	},
	{
		title: "Review",
		id: "review",
		tasks: [
			{
				id: 14,
				boardId: "review",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
		],
	},
	{
		title: "Discussion",
		id: "discussion",
		tasks: [
			{
				id: 15,
				boardId: "discussion",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
		],
	},
];
