import React, { Component } from 'react';
import firebase from '../firebase.js'
import styled from 'styled-components';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Navbar, Nav, Container } from 'react-bootstrap';

import Loader from './Loader.js';
import HabitsPage from './HabitsPage.js';
import StatsPage from './StatsPage.js';
import SignIn from './SignIn.js';
const StyledCol = styled.div`
	.col {
		margin: 2px;
		cursor: pointer;
		user-select: none;
	}

	.calendar {
		cursor: default
	}
	.error {
		border-color: red
	}
	.row__subtitle {
		width: 100%;
		padding: 20px 0;
		margin: 20px 0 0 0;
		justify-content: space-between;
		@media screen and (max-width: 769px){
			justify-content: center
			.col-md-6 {
				padding: 0 !important;
			}
		}
		h2 {
			text-transform: capitalize;
		}
	}
	.container__loading {
		display: flex;
		justify-content: center; 
		align-items: center; 
		flex-direction: column;
		height: 90vh;
	}
	.container__app {
		max-width: 900px;
		display: flex;
		justify-content: space-between;
		padding: 5px;
	}
	.container__habits {
		max-width: 900px;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.container__stats{
		display: flex;
		justify-content: center;
		flex-direction: column;
		padding: 20px;
		max-width: 900px;
		border: 1px solid #ddd;
		background: #fff;
		border-radius: 5px;
		user-select: none;
		box-shadow: 0px 2px 3px rgba(0,0,0,.03), 1px 2px 2px rgba(0,0,0,.03), -1px -2px 2px rgba(0,0,0,.03);
	}
	.input__error {
		display: block;
		text-align: left;
		color: red;
		position: absolute;
		bottom: 0
	}
`


class Mycontainer extends Component {
	constructor(props) {
		super(props)
		this.state = {
			habits: null,
			loading: true,
		}
		this.timeout = null;
	}

	componentDidMount() {
		this.setHabits();
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
		} = this.state;

		// if(!habits)
		// 	return null;

		return (
			<StyledCol>

				{loading && <Loader />}
				{!loading &&
					<Router>
						<Navbar style={{ backgroundColor: '#373f51' }} variant="dark">
							<Container className="container__app ">
								<Navbar.Brand href={process.env.PUBLIC_URL + '/'}>Habit tracker</Navbar.Brand>
								<Nav className="ml-auto">
									<Link className="nav-link" to={process.env.PUBLIC_URL + '/'}>Nawyki</Link>
									<Link className="nav-link" to={process.env.PUBLIC_URL + '/stats'}>Statystyki</Link>
									<a onClick={() => firebase.auth().signOut()}>Wyloguj</a>
								</Nav>
							</Container>
						</Navbar>

						<Route path={'/signedin'} exact render={() => <SignIn />} />
						<Route path={'/'} exact render={() => <HabitsPage habits={habits} />} />
						<Route path={'/stats'} render={() => <StatsPage habits={habits} />} />

					</Router>
				}
			</StyledCol>
		);
	}
}

export default Mycontainer;