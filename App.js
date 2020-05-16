import React from "react";
import { YellowBox } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/es/integration/react";
import Loading from "./components/LoadingComponent";
import { ConfigureStore } from "./redux/configureStore";
const { persistor, store } = ConfigureStore();
import Main from "./components/MainComponent";
YellowBox.ignoreWarnings(["Warning: ..."]);
console.disableYellowBox = true;

export default function App() {
	return (
		<Provider store={store}>
			<PersistGate loading={<Loading />} persistor={persistor}>
				<Main />
			</PersistGate>
		</Provider>
	);
}
