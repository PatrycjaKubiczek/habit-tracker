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
			currentMonth: '',
			disableBtn: false,
			showToast: false
		}
		this.timeout = null;
	}
	componentDidMount() {
		this.setCurrentMonth()
	}

	setCurrentMonth() {
		let currentMonthMoment = moment().format("MMMM");
		this.setState({
			currentMonth: currentMonthMoment
		})
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


	render() {
		const {
			error,
			currentMonth,
			disableBtn,
			inputNewHabit,
			showToast
		} = this.state;

		return (
			<>
				<ToastHabit showToast={showToast} handleCloseToast={this.handleCloseToast} />
				<ContainerApp>
					<RowSubtitle>
						<h2> {currentMonth} </h2>
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