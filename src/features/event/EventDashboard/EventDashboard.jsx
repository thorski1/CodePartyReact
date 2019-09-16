import React, { Component } from "react";
import { connect } from "react-redux";

import { Grid, Button, Loader } from "semantic-ui-react";
import EventList from "../EventList/EventList";
import { getEventsForDashboard } from "../eventActions";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../EventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";

const actions = {
	getEventsForDashboard
};

const mapState = state => ({
	events: state.events,
	loading: state.async.loading
});

class EventDashboard extends Component {
	state = {
		moreEvents: false,
		loadingInitial: true,
		loadedEvents: []
	};
	async componentDidMount() {
		let next = await this.props.getEventsForDashboard();
		console.log(next);
		if (next && next.docs && next.docs.length > 1) {
			this.setState({
				moreEvents: true,
				loadingInitial: false
			});
		}
	}
	componentDidUpdate(prevProps) {
		if (this.props.events !== prevProps.events) {
			this.setState({
				loadedEvents: [
					...this.state.loadedEvents,
					...this.props.events
				]
			});
		}
	}
	getNextEvents = async () => {
		const { events } = this.props;
		let lastEvent = events && events[events.length - 1];
		console.log(lastEvent);
		let next = await this.props.getEventsForDashboard(
			lastEvent
		);
		console.log(next);
		if (next && next.docs && next.docs.length <= 1) {
			this.setState({
				moreEvents: false
			});
		}
	};
	render() {
		const { loading } = this.props;
		const { moreEvents, loadedEvents } = this.state;
		if (this.state.loadingInitial)
			return <LoadingComponent />;
		return (
			<div>
				<Grid>
					<Grid.Column width={10}>
						<EventList
							loading={loading}
							moreEvents={moreEvents}
							getNextEvents={this.getNextEvents}
							events={loadedEvents}
						/>
					</Grid.Column>
					<Grid.Column width={6}>
						<EventActivity />
					</Grid.Column>
					<Grid.Column width={10}>
						<Loader active={loading} />
					</Grid.Column>
				</Grid>
			</div>
		);
	}
}

export default connect(
	mapState,
	actions
)(
	firestoreConnect([{ collection: "events" }])(
		EventDashboard
	)
);
