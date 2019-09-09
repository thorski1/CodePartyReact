import { combineReducers } from "redux";
import { reducer as FormReducer } from "redux-form";
import testReducer from "../../features/testarea/testReducer";
import eventReducer from "../../features/event/eventReducer";
import modalReducer from "../../features/modals/modalReducer";
import authReducer from "../../features/auth/authReducer";
import asyncReducer from "../../features/async/asyncReducer";

const rootReducer = combineReducers({
	form: FormReducer,
	test: testReducer,
	events: eventReducer,
	modals: modalReducer,
	auth: authReducer,
	async: asyncReducer
});

export default rootReducer;
