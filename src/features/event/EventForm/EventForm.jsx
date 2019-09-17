/*global google*/

import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import {
	geocodeByAddress,
	getLatLng
} from "react-places-autocomplete";
import {
	composeValidators,
	combineValidators,
	isRequired,
	hasLengthGreaterThan
} from "revalidate";
import {
	Segment,
	Form,
	Button,
	Grid,
	Header
} from "semantic-ui-react";
import {
	createEvent,
	updateEvent,
	cancelToggle
} from "../eventActions";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import { withFirestore } from "react-redux-firebase";

const mapState = (state, ownProps) => {
	const eventId = ownProps.match.params.id;

	let event = {};
	if (
		state.firestore.ordered.events &&
		state.firestore.ordered.events.length > 0
	) {
		event =
			state.firestore.ordered.events.filter(
				event => event.id === eventId
			)[0] || {};
	}
	return {
		initialValues: event,
		event,
		loading: state.async.loading
	};
};

const actions = {
	createEvent,
	updateEvent,
	cancelToggle
};

const validate = combineValidators({
	title: isRequired({
		message: "The event title is required!"
	}),
	category: isRequired({
		message: "The category is required!"
	}),
	description: composeValidators(
		isRequired({ message: "Please enter a description" }),
		hasLengthGreaterThan(4)({
			message:
				"Description needs to be at least 5 characters"
		})
	)(),
	city: isRequired("city"),
	venue: isRequired("venue"),
	date: isRequired("date")
});

const category = [
	{ key: "drinks", text: "Drinks", value: "drinks" },
	{ key: "culture", text: "Culture", value: "culture" },
	{ key: "film", text: "Film", value: "film" },
	{ key: "food", text: "Food", value: "food" },
	{ key: "music", text: "Music", value: "music" },
	{ key: "travel", text: "Travel", value: "travel" }
];

class EventForm extends Component {
	state = {
		cityLatLng: {},
		venueLatLng: {}
	};
	async componentDidMount() {
		const { firestore, match } = this.props;
		await firestore.setListener(
			`events/${match.params.id}`
		);
	}

	async componentWillUnmount() {
		const { firestore, match } = this.props;
		await firestore.unsetListener(
			`events/${match.params.id}`
		);
	}

	onFormSubmit = async values => {
		values.venueLatLng = this.state.venueLatLng;
		try {
			if (Object.keys(values.venueLatLng).length === 0) {
				values.venueLatLng = this.props.event.venueLatLng;
			}
			if (this.props.initialValues.id) {
				await this.props.updateEvent(values);
				this.props.history.push(
					`/events/${this.props.initialValues.id}`
				);
			} else {
				let createdEvent = await this.props.createEvent(
					values
				);
				this.props.history.push(
					`/events/${createdEvent.id}`
				);
			}
		} catch (error) {}
	};

	handleCitySelect = selectedCity => {
		geocodeByAddress(selectedCity)
			.then(results => getLatLng(results[0]))
			.then(latlng => {
				this.setState({
					cityLatLng: latlng
				});
			})
			.then(() => {
				this.props.change("city", selectedCity);
			});
	};

	handleVenueSelect = selectedVenue => {
		geocodeByAddress(selectedVenue)
			.then(results => getLatLng(results[0]))
			.then(latlng => {
				this.setState({
					venueLatLng: latlng
				});
			})
			.then(() => {
				this.props.change("venue", selectedVenue);
			});
	};

	render() {
		const {
			history,
			initialValues,
			invalid,
			submitting,
			pristine,
			event,
			cancelToggle,
			loading
		} = this.props;
		return (
			<Grid>
				<Grid.Column width={10}>
					<Segment>
						<Header
							sub
							color="teal"
							content="Event Details"
						/>
						<Form
							onSubmit={this.props.handleSubmit(
								this.onFormSubmit
							)}
							autoComplete="off"
						>
							<Field
								name="title"
								type="text"
								component={TextInput}
								placeholder="Give your Code Party a name"
							/>
							<Field
								name="category"
								type="text"
								component={SelectInput}
								options={category}
								placeholder="What is your party about?"
							/>
							<Field
								name="description"
								type="text"
								component={TextArea}
								rows={3}
								placeholder="Tell us about your party"
							/>
							<Header
								sub
								color="teal"
								content="Event Location Details"
							/>
							<Field
								name="city"
								type="text"
								component={PlaceInput}
								options={{ types: ["(cities)"] }}
								onSelect={this.handleCitySelect}
								placeholder="Event City"
							/>
							<Field
								name="venue"
								type="text"
								component={PlaceInput}
								options={{
									location: new google.maps.LatLng(
										this.state.cityLatLng
									),
									radius: 1000,
									types: ["address"]
								}}
								onSelect={this.handleVenueSelect}
								placeholder="Where's the party at?"
							/>
							<Field
								name="date"
								dateFormat="iiii LLL dd yyyy h:mm a"
								showTimeSelect
								timeFormat="HH:mm"
								component={DateInput}
								placeholder="Event date"
							/>
							<Button
								positive
								type="submit"
								disabled={invalid || submitting || pristine}
								loading={loading}
							>
								Submit
							</Button>
							<Button
								onClick={
									initialValues.id
										? () =>
												history.push(
													`/events/${initialValues.id}`
												)
										: () => history.push("/events")
								}
								type="button"
								disabled={loading}
							>
								Cancel
							</Button>
							<Button
								type="button"
								color={event.cancelled ? "green" : "red"}
								floated="right"
								content={
									event.cancelled
										? "Reactivate event"
										: "Cancel event"
								}
								onClick={() =>
									cancelToggle(!event.cancelled, event.id)
								}
							></Button>
						</Form>
					</Segment>
				</Grid.Column>
			</Grid>
		);
	}
}

export default withFirestore(
	connect(
		mapState,
		actions
	)(
		reduxForm({
			form: "eventForm",
			validate,
			enableReinitialize: true
		})(EventForm)
	)
);
