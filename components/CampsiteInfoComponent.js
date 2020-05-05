import React, { Component } from "react";
import {
	Text,
	View,
	ScrollView,
	FlatList,
	StyleSheet,
	Modal,
} from "react-native";
import { Card, Icon, Button, Input, Rating } from "react-native-elements";
import { connect } from "react-redux";
import { baseUrl } from "../shared/baseUrl";
import { postFavorite, postComment } from "../redux/ActionCreators";
import { CAMPSITES } from "../shared/campsites";
import { COMMENTS } from "../shared/comments";

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	buttonsContainer: {
		alignItems: "center",
		justifyContent: "center",
		flex: 1,
		flexDirection: "row",
	},
	modal: {
		justifyContent: "center",
		margin: 20,
	},
	inputsIcon: {
		marginRight: 8,
	},
	submitBtn: {
		backgroundColor: "#5637DD",
		marginTop: 30,
		marginBottom: 10,
	},
	ratingItem: { alignItems: "flex-start", paddingVertical: "5%" },
});

const mapStateToProps = (state) => {
	return {
		campsites: state.campsites,
		comments: state.comments,
		favorites: state.favorites,
	};
};

const mapDispatchToProps = {
	postFavorite: (campsiteId) => postFavorite(campsiteId),
	postComment: (campsiteId, rating, author, text) =>
		postComment(campsiteId, rating, author, text),
};

function RenderCampsite(props) {
	const { campsite } = props;
	if (campsite) {
		return (
			<Card
				featuredTitle={campsite.name}
				image={{ uri: baseUrl + campsite.image }}
			>
				<Text style={{ margin: 10 }}>{campsite.description}</Text>
				<View style={styles.buttonsContainer}>
					<Icon
						name={props.favorite ? "heart" : "heart-o"}
						type="font-awesome"
						color="#f50"
						raised
						reverse
						onPress={() =>
							props.favorite
								? console.log("Already set as a favorite")
								: props.markFavorite()
						}
					/>
					<Icon
						name="pencil"
						type="font-awesome"
						color="#5637DD"
						raised
						reverse
						onPress={() => props.onShowModal()}
					/>
				</View>
			</Card>
		);
	}
	return <View />;
}

function RenderComments({ comments }) {
	const renderCommentItem = ({ item }) => {
		return (
			<View style={{ margin: 10 }}>
				<Text style={{ fontSize: 14 }}>{item.text}</Text>
				<Rating
					imageSize={10}
					readonly
					startingValue={item.rating}
					style={styles.ratingItem}
				/>
				<Text
					style={{ fontSize: 12 }}
				>{`-- ${item.author}, ${item.date}`}</Text>
			</View>
		);
	};

	return (
		<Card title="Comments">
			<FlatList
				data={comments}
				renderItem={renderCommentItem}
				keyExtractor={(item) => item.id.toString()}
			/>
		</Card>
	);
}

class CampsiteInfo extends Component {
	constructor(props) {
		super(props);
		this.state = {
			campsites: CAMPSITES,
			comments: COMMENTS,
			favorite: false,
			showModal: false,
			rating: 5,
			author: "",
			text: "",
		};
	}

	static navigationOptions = {
		title: "Campsite Information",
	};

	markFavorite(campsiteId) {
		this.props.postFavorite(campsiteId);
	}

	toggleModal() {
		this.setState({ showModal: !this.state.showModal });
		this.resetForm();
	}

	handleComment(campsiteId) {
		this.toggleModal();
		this.props.postComment(
			campsiteId,
			this.state.rating,
			this.state.author,
			this.state.text
		);
	}

	resetForm() {
		this.setState({ rating: 5, author: "", text: "" });
	}

	render() {
		const campsiteId = this.props.navigation.getParam("campsiteId");
		const campsite = this.props.campsites.campsites.filter(
			(campsite) => campsite.id === campsiteId
		)[0];
		const comments = this.props.comments.comments.filter(
			(comment) => comment.campsiteId === campsiteId
		);
		return (
			<ScrollView>
				<RenderCampsite
					campsite={campsite}
					favorite={this.props.favorites.includes(campsiteId)}
					markFavorite={() => this.markFavorite(campsiteId)}
					onShowModal={() => this.toggleModal()}
				/>
				<RenderComments comments={comments} />
				<Modal
					animationType={"slide"}
					transparent={false}
					visible={this.state.showModal}
					onRequestClose={() => this.toggleModal()}
				>
					<View style={styles.modal}>
						<Rating
							showRating
							imageSize={40}
							startingValue={this.state.rating}
							style={{ paddingVertical: 10 }}
							onFinishRating={(rating) =>
								this.setState({ rating: rating })
							}
						/>

						<Input
							placeholder="Author"
							leftIcon={{ type: "font-awesome", name: "user-o" }}
							leftIconContainerStyle={styles.inputsIcon}
							onChangeText={(value) =>
								this.setState({ author: value })
							}
							value={this.state.author}
						/>
						<Input
							placeholder="Comment"
							leftIcon={{
								type: "font-awesome",
								name: "comment-o",
							}}
							leftIconContainerStyle={styles.inputsIcon}
							onChangeText={(value) =>
								this.setState({ text: value })
							}
							value={this.state.text}
						/>
						<Button
							title="SUBMIT"
							buttonStyle={styles.submitBtn}
							onPress={() => this.handleComment(campsiteId)}
						/>
						<Button
							title="CANCEL"
							onPress={() => this.toggleModal()}
						/>
					</View>
				</Modal>
			</ScrollView>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(CampsiteInfo);
