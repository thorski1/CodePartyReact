import React, { Fragment } from "react";
import { Segment, Item, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";

const EventDetailedSidebar = ({ attendees }) => {
	return (
		<Fragment>
			<Segment
				textAlign="center"
				style={{ border: "none" }}
				attached="top"
				secondary
				inverted
				color="teal"
			>
				{attendees && attendees.length}{" "}
				{attendees && attendees.length === 1
					? "Person"
					: "People"}{" "}
				Going
			</Segment>
			<Segment attached>
				<Item.Group relaxed divided>
					{attendees &&
						attendees.map(attendee => (
							<Item.Content
								key={attendee.id}
								style={{ position: "relative" }}
							>
								{attendee.host && (
									<Label
										style={{ position: "absolute" }}
										color="orange"
										ribbon="right"
									>
										Host
									</Label>
								)}
								<Item.Image
									size="tiny"
									src={attendee.photoURL}
								/>
								<Item.Content verticalAlign="middle">
									<Item.Header as="h3">
										<Link to={`/profile/${attendee.id}`}>
											{attendee.displayName}
										</Link>
									</Item.Header>
								</Item.Content>
							</Item.Content>
						))}
				</Item.Group>
			</Segment>
		</Fragment>
	);
};

export default EventDetailedSidebar;
