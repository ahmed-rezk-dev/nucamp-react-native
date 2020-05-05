import * as ActionTypes from "./ActionTypes";

export const comments = (state = { errMess: null, comments: [] }, action) => {
	switch (action.type) {
		case ActionTypes.ADD_COMMENTS:
			return { ...state, errMess: null, comments: action.payload };

		case ActionTypes.COMMENTS_FAILED:
			return { ...state, errMess: action.payload };

		case ActionTypes.ADD_COMMENT:
			const newId = state.comments.length + 1;
			const comment = { ...action.payload, id: newId };
			return { ...state, comments: state.comments.concat(comment) };

		default:
			return state;
	}
};
