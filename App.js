import React from "react";
import { YellowBox } from "react-native";
import Main from "./components/MainComponent";
YellowBox.ignoreWarnings(["Warning: ..."]);
console.disableYellowBox = true;

export default function App() {
	return <Main />;
}
