import { toastr } from "react-redux-toastr";
import { createNewEvent } from "../../app/common/util/helpers";

export const createEvent = event => {
	return async (
		dispatch,
		getState,
		{ getFirestore, getFirebase }
	) => {
		const firestore = getFirestore();
		const firebase = getFirebase();
		const user = firebase.auth().currentUser;
		const photoURL = getState().firebase.profile.photoURL;
		const newEvent = createNewEvent(user, photoURL, event);
		try {
			let createdEvent = await firestore.add(
				"events",
				newEvent
			);
			await firestore.set(
				`event_attendee/${createdEvent.id}_${user.uid}`,
				{
					eventId: createdEvent.id,
					userUid: user.uid,
					eventDate: event.date,
					host: true
				}
			);
			toastr.success("Success!", "Event has been created");
			return createdEvent;
		} catch (error) {
			toastr.error("Oops", "Something went wrong");
		}
	};
};

export const updateEvent = event => {
	return async (dispatch, getState, { getFirestore }) => {
		const firestore = getFirestore();
		try {
			await firestore.update(`events/${event.id}`, event);
			toastr.success("Success!", "Party has been updated");
		} catch (error) {
			toastr.error("Oops", "Something went wrong");
		}
	};
};

export const cancelToggle = (cancelled, eventId) => async (
	dispatch,
	getState,
	{ getFirestore }
) => {
	const firestore = getFirestore();
	const message = cancelled
		? "Are you sure you want to cancel the party?"
		: "This will reactivate the event, are you sure?";
	try {
		toastr.confirm(message, {
			onOk: async () =>
				await firestore.update(`events/${eventId}`, {
					cancelled: cancelled
				})
		});
	} catch (error) {
		console.log(error);
	}
};
