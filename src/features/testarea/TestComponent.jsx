import React, { Component } from "react";
import { connect } from "react-redux";
import {
	incrementCounter,
	decrementCounter
} from "./testActions";
import {
	geocodeByAddress,
	getLatLng
} from "react-places-autocomplete";
import { Button } from "semantic-ui-react";
import TestPlaceInput from "./TestPlaceInput";
import SimpleMap from "./SimpleMap";

const mapState = state => ({
	data: state.test.data
});

const actions = {
	incrementCounter,
	decrementCounter
};

class TestComponent extends Component {
	state = {
		latlng: {
			lat: 59.95,
			lng: 30.33
		}
	};

	handleSelect = address => {
		geocodeByAddress(address)
			.then(results => getLatLng(results[0]))
			.then(latLng => {
				this.setState({
					latlng: latLng
				});
			})
			.catch(error => console.error("Error", error));
	};

	render() {
		const {
			data,
			incrementCounter,
			decrementCounter
		} = this.props;
		return (
			<div>
				<h1>Test Component</h1>
				<h3>The answer is: {data}</h3>
				<Button
					onClick={incrementCounter}
					positive
					content="Increment"
				/>
				<Button
					onClick={decrementCounter}
					negative
					content="Decrement"
				/>
				<br />
				<br />
				<TestPlaceInput selectAddress={this.handleSelect} />
				<SimpleMap
					latlng={this.state.latlng}
					key={this.state.latlng.lng}
				/>
			</div>
		);
	}
}

export default connect(
	mapState,
	actions
)(TestComponent);
