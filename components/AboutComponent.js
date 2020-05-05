import React, { Component } from "react";
import { ScrollView, FlatList } from "react-native";
import { Card, Text, ListItem } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { PARTNERS } from "../shared/partners";

const mapStateToProps = (state) => {
	return {
		partners: state.partners,
	};
};

class About extends Component {
	constructor(props) {
		super(props);
		this.state = {
			partners: PARTNERS,
		};
	}

	static navigationOptions = {
		title: "About",
	};

	render() {
		const renderPartner = ({ item }) => {
			return (
				<ListItem
					title={item.name}
					subtitle={item.description}
					leftAvatar={{ source: { uri: baseUrl + item.image } }}
				/>
			);
		};
		return (
			<ScrollView>
				<Card title="Our Mission">
					<Text>
						We present a curated database of the best campsites in
						the vast woods and backcountry of the World Wide Web
						Wilderness. We increase access to adventure for the
						public while promoting safe and respectful use of
						resources. The expert wilderness trekkers on our staff
						personally verify each campsite to make sure that they
						are up to our standards. We also present a platform for
						campers to share reviews on campsites they have visited
						with each other.
					</Text>
				</Card>

				<Card title="Community Partners">
					<FlatList
						data={this.props.partners.partners}
						renderItem={renderPartner}
						keyExtractor={(item) => item.id.toString()}
					/>
				</Card>
			</ScrollView>
		);
	}
}

export default connect(mapStateToProps)(About);
