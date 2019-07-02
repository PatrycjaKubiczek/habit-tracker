import React, { Component } from 'react';
import firebase from '../../../firebase.js';
import { Col, Button } from 'react-bootstrap';
import moment from 'moment';
import 'moment/locale/pl';

// COMPONENTS
import HabitList from './HabitList/HabitList.js';
import InputHabitTitle from './InputHabitTitle.js';
import ToastHabit from './ToastHabit.js';

// STYLES
import { ContainerApp, RowSubtitle } from './../MainPageStyle.js'
import { ContainerHabits, ErrorInfo } from './HabitsPageStyle'

class HabitsPage extends Component {
	constructor(props) {
		super(props)
		console.log(this.props)
		this.state = {
			inputNewHabit: '',
			error: false,
			currentMonthTitle: '',
			disableBtn: false,
			showToast: false,
			currentDate: ''
		}
		this.timeout = null;
	}
	componentDidMount() {
		this.setCurrentMonth()
	}
	componentDidUpdate() {
		// this.setCurrentMonth()
	}

	setCurrentMonth(currentMonth) {
		// console.log(currentMonth)
		if (currentMonth) {
			let currentMonthMomentTitle = moment(currentMonth).format("MMMM");
			console.log()
			this.setState({
				currentMonthTitle: currentMonthMomentTitle,
			})
			
		} else {
			let currentMonthMomentTitle = moment().format("MMMM");
			this.setState({
				currentMonthTitle: currentMonthMomentTitle,
			})
		}


	}

	handleChangeOnInput = e => {
		let inputText = e.target.value;
		// if (this.timeout)
		// 	clearTimeout(this.timeout);
		// this.timeout = setTimeout(() => {
		this.setState({
			inputNewHabit: inputText,
			error: false
		})

		// }, 300);
	}

	// get value from input for creating new habit in database
	addNewHabit = (e) => {
		if (this.state.inputNewHabit.length === 0) {
			this.setState({
				error: true
			})
			return
		}
		firebase.database().ref('habits').push({
			habitTitle: this.state.inputNewHabit,
			habitPoints: 0,
			dates: {},
		}).then(
			this.setState({
				showToast: true
			})
		);
		this.setState({
			error: false,
			inputNewHabit: ''
		})
	}
	handleCloseToast = () => {
		this.setState({
			showToast: false
		})
	}
	previousMonth() {
		// let newDate = moment(currentMonth)
		// // console.log(newDate)
		let prevMonth = moment(this.props.currentMonthDate).subtract(1, 'months')
		this.setCurrentMonth(prevMonth)

		console.log(prevMonth)
		// let propsMonth = this.props.currentMonthDate
		// console.log(propsMonth)
	}
	nextMonth() {
		// let currentDate = moment()
		let nextMonth = moment().add(1, 'months')
		console.log(nextMonth)
		this.setCurrentMonth(nextMonth)
	}


	render() {
		const {
			error,
			currentMonthTitle,
			disableBtn,
			inputNewHabit,
			showToast,
		} = this.state;

		return (
			<>
				<ToastHabit showToast={showToast} handleCloseToast={this.handleCloseToast} />
				<ContainerApp>
					<RowSubtitle>
						{/* <Button onClick={() => this.previousMonth()}>prev</Button> */}
						<h2> {currentMonthTitle} </h2>
						{/* <Button onClick={() => this.nextMonth()}>next</Button> */}
						<Col md={6} style={{ padding: '0 0 0 10px' }}>
							<InputHabitTitle
								error={error}
								handleChange={this.handleChangeOnInput}
								handleClick={this.addNewHabit}
								className={disableBtn ? 'disabled' : null}
								inputHabit={inputNewHabit}
							/>
							{error && <ErrorInfo>* pole jest wymagane </ErrorInfo>}
						</Col>
					</RowSubtitle>
				</ContainerApp>

				<ContainerHabits>
					{
						this.props.habits.map((habit) => <HabitList habit={habit} key={habit.idkey} />)
					}

				</ContainerHabits>
			</>

		);
	}
}

export default HabitsPage;