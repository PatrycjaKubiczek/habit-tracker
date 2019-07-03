import React, { Component } from 'react';
import firebase from '../../../firebase.js';
import { Col } from 'react-bootstrap';
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
		this.state = {
			inputNewHabit: '',
			error: false,
			currentMonthTitle: '',
			disableBtn: false,
			showToast: false,
			currentDate: '',
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
		if (currentMonth) {
			let currentMonthMomentTitle = moment(currentMonth).format("MMMM");
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
		let uid = firebase.auth().currentUser.uid;

		// firebase.database().ref('/users/' + uid + '/habits')


		if (this.state.inputNewHabit.length === 0) {
			this.setState({
				error: true
			})
			return
		}
		firebase.database().ref('/users/' + uid + '/habits').push({
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
	// previousMonth() {
	// 	// let newDate = moment(currentMonth)
	// 	let prevMonth = moment(this.props.currentMonthDate).subtract(1, 'months')
	// 	this.setCurrentMonth(prevMonth)
	// 	// let propsMonth = this.props.currentMonthDate
	// }
	// nextMonth() {
	// 	// let currentDate = moment()
	// 	let nextMonth = moment().add(1, 'months')
	// 	this.setCurrentMonth(nextMonth)
	// }


	render() {
		const {
			error,
			currentMonthTitle,
			disableBtn,
			inputNewHabit,
			showToast,
			habits
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
					{(this.props.habits !== null) && (this.props.habits.length !== 0) ?
						this.props.habits.map((habit) => <HabitList habit={habit} key={habit.idkey} />)
						: 
						<h5>Nie utworzono jeszcze żadnych nawyków</h5>
					}

				</ContainerHabits>
			</>

		);
	}
}

export default HabitsPage;