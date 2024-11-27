import "@style/app.scss";

type Props = {
	children: React.ReactNode;
};
export function Layout({ children }: Props) {
	return (
		<div className="max-w-screen-2xl mx-auto">
			{children}
		</div>
	)
}
