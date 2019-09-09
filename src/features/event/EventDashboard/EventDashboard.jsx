import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import {
	createEvent,
	deleteEvent,
	updateEvent
} from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const actions = {
	createEvent,
	deleteEvent,
	updateEvent
};

const mapState = state => ({
	events: state.events,
	loading: state.async.loading
});

class EventDashboard extends Component {
	handleDeleteEvent = id => {
		this.props.deleteEvent(id);
	};
	render() {
		const { events, loading } = this.props;
		if (loading) return <LoadingComponent />;
		return (
			<div>
				<Grid>
					<Grid.Column width={10}>
						<EventList
							events={events}
							deleteEvent={this.handleDeleteEvent}
						/>
					</Grid.Column>
					<Grid.Column width={6}>
						<h2>Activity Feed</h2>
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default connect(
	mapState,
	actions
)(EventDashboard);
