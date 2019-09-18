import React, { Component, Fragment } from "react";
import HomePage from "../../features/home/HomePage";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import PeopleDashboard from "../../features/user/PeopleDashboard/PeopleDashboard";
import UserDetailedPage from "../../features/user/UserDetailed/UserDetailedPage";
import SettingsDashboard from "../../features/user/Settings/SettingsDashboard";
import EventForm from "../../features/event/EventForm/EventForm";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import NavBar from "../../features/nav/NavBar/NavBar";
import { Container } from "semantic-ui-react";
import {
	Route,
	Switch,
	withRouter
} from "react-router-dom";
import ModalManager from "../../features/modals/ModalManager";
import { UserIsAuthenticated } from "../../features/auth/authWrapper";
import NotFound from "./NotFound";

class App extends Component {
	render() {
		return (
			<Fragment>
				<Route exact path="/" component={HomePage} />
				<Route
					path="/(.+)"
					render={() => (
						<Fragment>
							<ModalManager />
							<NavBar />
							<Container className="main">
								<Switch key={this.props.location.key}>
									<Route
										exact
										path="/events"
										component={EventDashboard}
									/>
									<Route
										path="/events/:id"
										component={EventDetailedPage}
									/>
									<Route
										path="/people"
										component={UserIsAuthenticated(
											PeopleDashboard
										)}
									/>
									<Route
										path="/profile/:id"
										component={UserIsAuthenticated(
											UserDetailedPage
										)}
									/>
									<Route
										path="/settings"
										component={UserIsAuthenticated(
											SettingsDashboard
										)}
									/>
									<Route
										path={["/createEvent", "/manage/:id"]}
										component={UserIsAuthenticated(
											EventForm
										)}
									/>
									
									<Route component={NotFound} />
								</Switch>
							</Container>
						</Fragment>
					)}
				/>
			</Fragment>
		);
	}
}

export default withRouter(App);
