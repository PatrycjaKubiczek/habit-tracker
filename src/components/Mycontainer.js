import React, { Component } from 'react';
import firebase from '../firebase.js'

import { Container, Row, Col, Button, Spinner, InputGroup, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import TaskRow from './TaskRow'


const StyledCol = styled.div`
.col {
	margin: 2px;
	cursor: pointer;
	user-select: none;
}

.task {
	border: 1px solid #E0DCE2;
	width: 25px;
	height: 25px;
	flex: 0 0 25px;
	padding: 0;
}

.calendar {
	cursor: default
}
.error {
	border-color: red
}
`

class Mycontainer extends Component {
	constructor(props){
		super(props)
		this.state = {
			daysInMonth: [],
			habits: [],
			loading: true,
			input: '',
			error: false
		}
	}

componentWillMount(){
	const daysMonth = (N) => Array.from({length: N}, (v, k) => k+1); //TODO 
	this.setState({
		daysInMonth: daysMonth(30)
	})
	
}

componentDidMount(){
	this.setHabits()

}

setHabits = () => {
	const habitRef = firebase.database().ref('habits');
	habitRef.on('value', snapshot => {
		this.setState({loading: false})
		let habits = snapshot.val();

		let newState = [];
		for (let habit in habits) {
			newState.push({
				idkey: habit,
				id: habits[habit].habitId,
				habit: habits[habit].habitTitle,
				points: habits[habit].habitPoints,
				dates: habits[habit].dates,
				percentage: habits[habit].percentage
			});
		}
		this.setState({
			habits: newState
		})

	});
}

handleChange = e => {
	this.setState({ input: e.target.value });
}

addNewHabit = e => {
	if(this.state.input.length == 0){
		this.setState({error: true})
		return
	}
	const habitRef = firebase.database().ref('habits');
	habitRef.push({
		habitTitle: this.state.input,
		habitPoints: 0,
		dates: {},
		percentage: 0
	});
	this.setState({error: false})
}

renderHabitList = (habit, index, newhabits) => {
	let newDatesArr = [];
	for (let date in habit.dates){
		newDatesArr.push(habit.dates[date].pushDate)
	}
	return (<TaskRow habits={newhabits} percentage={habit.percentage} title={habit.habit} dates={newDatesArr} oldDates={habit.dates} points={habit.points} newid={habit.idkey} />)
};


render(){
	const { loading, error } = this.state;

	return (
		<StyledCol>
		<link href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" rel="stylesheet" />

		{loading && 
			<Container style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', height: '90vh'}}>
			<p>Wczytywanie...</p>
			<Spinner animation="border" role="status">
			<span className="sr-only">Wczytywanie...</span>
			</Spinner>
			</Container>
		}
		{!loading &&
			<>
			<Container style={{maxWidth: '900px', display: 'flex', justifyContent: 'space-between', padding: '5px'}}>
			<Row style={{width: '100%', padding: '20px 0', margin: '20px 0  0 0', justifyContent: 'space-between'}}>
			<h2>Czerwiec</h2>
			<Col md={6} style={{padding: '0 0 0 10px'}}>
			{error && <small style={{display: 'block', textAlign:'left', color: 'red'}}>pole jest wymagane *</small>}
			<InputGroup className="mb-3">
			<FormControl ref="taskInput"
			placeholder="wpisz nazwę..."
			aria-label="wpisz nazwę..."
			aria-describedby="basic-addon2"
			onChange={this.handleChange}
			style={{boxShadow: 'none'}}
			className={error ? 'error' : ''}
			/>
			
			<InputGroup.Append>
			<Button onClick={this.addNewHabit} style={{borderColor: '#58a4b0', backgroundColor: '#58a4b0', boxShadow: 'none'}}>dodaj nowy nawyk</Button>
			</InputGroup.Append>
			</InputGroup>
			</Col>
			</Row>
			</Container>

			<Container style={{maxWidth: '900px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between'}}>
			{this.state.habits.map(this.renderHabitList)}
			</Container>
			<Container style={{maxWidth: '900px'}}>
			
			</Container>
			</>
		}

		</StyledCol>
		);
}
}

export default Mycontainer;