import { Board } from '@components/Board';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';
import { Layout } from '@layout/Layout';

function App() {
	return (
		<Layout >
			<Header />
			<Board />
			<Footer />
		</Layout>
	);
}

export default App;
