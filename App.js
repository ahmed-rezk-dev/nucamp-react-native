import React from "react";
import { YellowBox } from "react-native";
import { Provider } from "react-redux";
import { ConfigureStore } from "./redux/configureStore";
const store = ConfigureStore();
import Main from "./components/MainComponent";
YellowBox.ignoreWarnings(["Warning: ..."]);
console.disableYellowBox = true;

export default function App() {
	return (
		<Provider store={store}>
			<Main />
		</Provider>
	);
}
