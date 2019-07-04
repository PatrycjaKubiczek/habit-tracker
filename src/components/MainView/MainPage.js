import React, { Component } from 'react';
import { HashRouter as Router, Route } from "react-router-dom";
import firebase from '../../firebase.js'

import moment from 'moment';

// COMPONENTS
import Loader from './Loader/Loader.js';
import HabitsPage from './HabitsPage/HabitsPage.js';
import Navigation from './Navigation/Navigation.js';

// STYLES
import StatsPage from './StatsPage/StatsPage.js'


class MainPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: true,
			currentMonthDate: '',
		}
		this.timeout = null;
	}
	componentWillMount() {
		this.setCurrentMonthDateFromMoment();
		
	}
	componentDidMount() {
		this.setHabits();
	}
	componentDidUpdate(prevProps, prevState) {
		
	}
	async setCurrentMonthDateFromMoment() {
		let momentMonthDate = moment().format("YYYY-MM");
		await this.setState({
			currentMonthDate: momentMonthDate
		})
	}

	setHabits() {
		let uid = firebase.auth().currentUser.uid;
		
		
		if (uid) {
			const habitRef = firebase.database().ref('/users/' + uid + '/habits')
			habitRef.on('value', snapshot => {
				let newState = [];
				let habits = snapshot.val(); // mt

				for (let habit in habits) {
					newState.push({
						idkey: habit,
						title: habits[habit].habitTitle,
						dates: habits[habit].dates,
					});
				}
				this.setState({
					habits: newState,
					loading: false
				})
			});
		}
	}

	render() {
		const {
			loading,
			habits,
			currentMonthDate
		} = this.state;

		return (
			<>

				{loading && <Loader />}
				{!loading &&
					<Router>
						<Navigation user={this.props.user} />

						<Route path={'/'} exact render={() => <HabitsPage habits={habits} currentMonthDate={currentMonthDate} />} />
						<Route path={'/stats'} render={() => <StatsPage habits={habits} currentMonthDate={currentMonthDate} />} />

					</Router>
				}
			</>
		);
	}
}

export default MainPage;