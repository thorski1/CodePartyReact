import React from "react";
import {
	Form,
	Segment,
	Button,
	Label,
	Divider
} from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { login, socialLogin } from "../authActions";
import TextInput from "../../../app/common/form/TextInput";
import SocialLogin from "../SocialLogin/SocialLogin";

const actions = {
	login,
	socialLogin
};

const LoginForm = ({
	login,
	handleSubmit,
	error,
	socialLogin,
	submitting
}) => {
	return (
		<Form
			size="large"
			onSubmit={handleSubmit(login)}
			autoComplete="off"
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
				{error && (
					<Label basic color="red">
						{error}
					</Label>
				)}
				<Button
					fluid
					size="large"
					color="teal"
					loading={submitting}
				>
					Login
				</Button>
				<Divider horizantal>Or</Divider>
				<SocialLogin socialLogin={socialLogin} />
			</Segment>
		</Form>
	);
};

export default connect(
	null,
	actions
)(reduxForm({ form: "loginForm" })(LoginForm));
