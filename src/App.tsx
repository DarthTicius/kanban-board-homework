import { Layout } from "@layout/Layout";
import { persistor, store } from "@src/store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from 'react-router';
import { PersistGate } from "redux-persist/integration/react";

function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<BrowserRouter>
					<Layout />
				</BrowserRouter>
			</PersistGate>
		</Provider>
	);
}

export default App;
