export type TaskProp = {
	id: string;
	title: string;
	content: string;
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
				id: "1",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: "2",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: "3",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: "4",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: "5",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: "6",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: "7",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: "8",
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
				id: "9",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: "10",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: "11",
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
				id: "12",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				id: "13",
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
				id: "14",
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
				id: "15",
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
		],
	},
];
