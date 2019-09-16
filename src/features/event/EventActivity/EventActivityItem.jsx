import React, { Component } from "react";
import { Feed } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

class EventActivityItem extends Component {
	renderSummary = activity => {
		switch (activity.type) {
			case "newEvent":
				return (
					<div>
						New Party!{" "}
						<Feed.User
							as={Link}
							to={{
								pathname: "/profile/" + activity.hostUid
							}}
						>
							{activity.hostedBy}
						</Feed.User>{" "}
						is hosting{" "}
						<Link
							to={{
								pathname: "/events/" + activity.eventId
							}}
						>
							{activity.title}
						</Link>
					</div>
				);
			case "cancelledEvent":
				return (
					<div>
						Party Cancelled!{" "}
						<Feed.User
							as={Link}
							to={{
								pathname: "/profile/" + activity.hostUid
							}}
						>
							{activity.hostedBy}
						</Feed.User>{" "}
						has cancelled{" "}
						<Link
							to={{
								pathname: "/events/" + activity.eventId
							}}
						>
							{activity.title}
						</Link>
					</div>
				);
			default:
				return;
		}
	};

	render() {
		const { activity } = this.props;

		return (
			<Feed.Event>
				<Feed.Label>
					<img
						src={activity.photoURL || "/assets/user.png"}
						alt=""
					/>
				</Feed.Label>
				<Feed.Content>
					<Feed.Summary>
						{this.renderSummary(activity)}
					</Feed.Summary>
					<Feed.Meta>
						<Feed.Date>
							{formatDistance(
								activity.timestamp &&
									activity.timestamp.toDate(),
								Date.now()
							)}{" "}
							ago
						</Feed.Date>
					</Feed.Meta>
				</Feed.Content>
			</Feed.Event>
		);
	}
}

export default EventActivityItem;
