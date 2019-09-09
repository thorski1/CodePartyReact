import React from "react";
import { Form, Segment, Button } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login } from "../authActions";
import TextInput from "../../../app/common/form/TextInput";

const actions = {
	login
};

const LoginForm = ({ login, handleSubmit }) => {
	return (
		<Form
			error
			size="large"
			onSubmit={handleSubmit(login)}
			autocomplete="off"
		>
			<Segment>
				<Field
					name="email"
					component={TextInput}
					type="text"
					placeholder="Email Address"
				/>
				<Field
					name="password"
					component={TextInput}
					type="password"
					placeholder="password"
				/>
				<Button fluid size="large" color="teal">
					Login
				</Button>
			</Segment>
		</Form>
	);
};

export default connect(
	null,
	actions
)(reduxForm({ form: "loginForm" })(LoginForm));
