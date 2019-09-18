import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import { reducer as ToastrReducer } from "react-redux-toastr";
import eventReducer from "../../features/event/eventReducer";
import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../../features/async/asyncReducer";
import { firebaseReducer } from "react-redux-firebase";
import { firestoreReducer } from "redux-firestore";

const rootReducer = combineReducers({
	firebase: firebaseReducer,
	firestore: firestoreReducer,
	form: FormReducer,
	events: eventReducer,
	modals: modalReducer,
	auth: authReducer,
	async: asyncReducer,
	toastr: ToastrReducer
});

export default rootReducer;
