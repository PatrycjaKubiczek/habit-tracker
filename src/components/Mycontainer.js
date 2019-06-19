import React, { Component } from 'react';
import firebase from '../firebase.js'
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';

import TaskRow from './TaskRow2.js';
import Loader from './Loader.js';
import InputHabitTitle from './InputHabitTitle.js';

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
			inputNewHabit: '',
			error: false
		}
		this.timeout = null;
	}

	componentWillMount(){
		// console.log('component will mount')
	}
	componentDidMount() {
		// console.log('component did mount')
		this.setHabits();
	}
	componentDidUpdate() {
		// console.log('component did update')
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



	handleChangeOnInput = e => {
		let inputText = e.target.value;
		if (this.timeout)
			clearTimeout(this.timeout);
		this.timeout = setTimeout(() => {
			this.setState({
				inputNewHabit: inputText
			})
		}, 300);

	}

	// get value from input for creating new habit in database
	addNewHabit = () => {
		if (this.state.inputNewHabit.length === 0) {
			this.setState({
				error: true
			})
			return
		}
		const habitRef = firebase.database().ref('habits');
		habitRef.push({
			habitTitle: this.state.inputNewHabit,
			habitPoints: 0,
			dates: {},
			percentage: 0
		});
		this.setState({
			error: false
		})
	}

	// renderHabitList = (habit, index, newhabits) => {
	// 	let datesArr = [];
	// 	for (let date in habit.dates) {
	// 		datesArr.push(habit.dates[date].pushDate)
	// 	}
	// 	return (<TaskRow
	// 		habits={newhabits}
	// 		title={habit.habit}
	// 		currentDates={datesArr}
	// 		habitDates={habit.dates}
	// 		points={habit.points}
	// 		newid={habit.idkey}
	// 		key={habit.idkey}
	// 	/>)
	// };


	render() {
		const {
			loading,
			error,
			habits
		} = this.state;
		
		// {!loading && <Loader />}

		// if(!habits)
		// 	return null;
		
		return (
		<StyledCol >
			{loading && <Loader />}
			{!loading &&
				<>
					<Container className="container__app">
						<Row className="row__subtitle">
							<h2> Czerwiec </h2>
							<Col md={6} style={{ padding: '0 0 0 10px'}}>
								<InputHabitTitle error={error}
									handleChange={this.handleChangeOnInput}
									handleClick={this.addNewHabit}
								/>
								{error && <small className="input__error"> pole jest wymagane * </small>}
							</Col>
						</Row>
					</Container>

					<Container className="container__habits">
						{
							habits.map((habit) => <TaskRow habit={habit} key={habit.idkey}/> )
						}
					</Container>
				</>
			}
		</StyledCol>
		);
	}
}

export default Mycontainer;