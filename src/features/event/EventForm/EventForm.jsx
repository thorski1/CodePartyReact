import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";

class EventForm extends Component {
	state = {
		title: "",
		date: "",
		city: "",
		venue: "",
		hostedBy: ""
	};
	componentDidMount() {
		if (this.props.selectedEvent !== null) {
			this.setState({
				...this.props.selectedEvent
			});
		}
	}
	handleFormSubmit = evt => {
		evt.preventDefault();
		if (this.state.id) {
			this.props.updateEvent(this.state);
		} else {
			this.props.createEvent(this.state);
		}
	};
	handleInputChange = ({ target: { name, value } }) => {
		this.setState({
			[name]: value
		});
	};
	render() {
		const { cancelFormOpen } = this.props;
		const {
			title,
			date,
			city,
			venue,
			hostedBy
		} = this.state;
		return (
			<Segment>
				<Form
					onSubmit={this.handleFormSubmit}
					autoComplete="off"
				>
					<Form.Field>
						<label>Event Title</label>
						<input
							onChange={this.handleInputChange}
							name="title"
							value={title}
							placeholder="Event Title"
						/>
					</Form.Field>
					<Form.Field>
						<label>Event Date</label>
						<input
							onChange={this.handleInputChange}
							name="date"
							value={date}
							type="date"
							placeholder="Event Date"
						/>
					</Form.Field>
					<Form.Field>
						<label>City</label>
						<input
							onChange={this.handleInputChange}
							name="city"
							value={city}
							placeholder="City event is taking place"
						/>
					</Form.Field>
					<Form.Field>
						<label>Venue</label>
						<input
							onChange={this.handleInputChange}
							name="venue"
							value={venue}
							placeholder="Enter the Venue of the event"
						/>
					</Form.Field>
					<Form.Field>
						<label>Hosted By</label>
						<input
							onChange={this.handleInputChange}
							name="hostedBy"
							value={hostedBy}
							placeholder="Enter the name of person hosting"
						/>
					</Form.Field>
					<Button positive type="submit">
						Submit
					</Button>
					<Button onClick={cancelFormOpen} type="button">
						Cancel
					</Button>
				</Form>
			</Segment>
		);
	}
}

export default EventForm;
