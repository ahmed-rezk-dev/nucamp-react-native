import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Card, Text } from "react-native-elements";
import * as Animatable from "react-native-animatable";

class Contact extends Component {
	constructor(props) {
		super(props);
	}

	static navigationOptions = {
		title: "Contact",
	};

	render() {
		return (
			<ScrollView>
				<Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
					<Card title="Contact Information" wrapperStyle={{ margin: 20 }}>
						<Text>1 Nucamp Way</Text>
						<Text>Seattle, WA 98001y</Text>
						<Text style={{ marginBottom: 10 }}> U.S.A.</Text>

						<Text>Phone: 1-206-555-1234</Text>
						<Text>Email: campsites@nucamp.co</Text>
					</Card>
				</Animatable.View>
			</ScrollView>
		);
	}
}

export default Contact;
