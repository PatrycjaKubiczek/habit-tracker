import React, { Component } from 'react';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import firebase from '../../firebase.js'
import { Navbar, Nav } from 'react-bootstrap';
import moment from 'moment';

// COMPONENTS
import Loader from './Loader/Loader.js';
import HabitsPage from './HabitsPage/HabitsPage.js';

// STYLES
import StatsPage from './StatsPage/StatsPage.js'
import { ContainerApp } from './MainPageStyle.js'

class MainPage extends Component {
	constructor(props) {
		super(props)
		this.state = {
			habits: null,
			loading: true,
			currentMonthDate: ''
		}
		this.timeout = null;
	}
	componentWillMount(){
		this.setCurrentMonthDateFromMoment();
	}
	componentDidMount() {
		this.setHabits();
	}
	async setCurrentMonthDateFromMoment() {
		let momentMonthDate = moment().format("YYYY-MM");
        await this.setState({
            currentMonthDate: momentMonthDate
		})
    }

	setHabits = () => {

		const habitRef = firebase.database().ref('habits');
		habitRef.on('value', snapshot => {
			let habits = snapshot.val(); // mt

			let newState = [];
			for (let habit in habits) {
				newState.push({
					idkey: habit,
					title: habits[habit].habitTitle,
					points: habits[habit].habitPoints,
					dates: habits[habit].dates,
				});
			}
			this.setState({
				habits: newState,
				loading: false
			})
		});
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
						<Navbar style={{ backgroundColor: '#373f51' }} variant="dark">
							<ContainerApp>
								<Navbar.Brand href={process.env.PUBLIC_URL + '/'}>Habit tracker</Navbar.Brand>
								<Nav className="ml-auto">
									<Link className="nav-link" to={'/'}>Nawyki</Link>
									<Link className="nav-link" to={'/stats'}>Statystyki</Link>
								</Nav>
							</ContainerApp>
						</Navbar>

						<Route path={'/'} exact render={() => <HabitsPage habits={habits} currentMonthDate={currentMonthDate} />} />
						<Route path={'/stats'} render={() => <StatsPage habits={habits} currentMonthDate={currentMonthDate}/>} />

					</Router>
				}
			</>
		);
	}
}

export default MainPage;