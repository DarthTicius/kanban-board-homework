type TaskProp = {
	title: string;
	content: string;
};
type BoardProp = {
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
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
		],
	},
	{
		title: "Ready",
		id: "Ready",
		tasks: [
			{
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
		],
	},
	{
		title: "In Progress",
		id: "progress",
		tasks: [
			{
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
			{
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
				title: "A long long title of the card ",
				content:
					"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut voluptatum, magni ullam doloribus aliquam quae optio consectetur odit ut tempora nobis et assumenda quidem molestiae recusandae, eius nulla facere provident.",
			},
		],
	},
];
