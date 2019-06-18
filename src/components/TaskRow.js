import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import firebase from '../firebase.js'
import moment from 'moment';
import ProgressPercentageChart from './ProgressPercentageChart.js';
import ConfirmationModal from './ConfirmationModal.js';
// import TaskCol from './TaskCol.js'

const StyledCol = styled.div`
padding: 20px;
border: 1px solid #ddd;
margin: 10px -10px; 
background: #fff;
border-radius: 5px;
@media screen and (max-width: 769px){
	margin: 10px
}
.col {
	margin: 2px;
	cursor: pointer;
	user-select: none;
}
.fa {
	display: none
}
.task {
	border: 1px solid #28a745;
	width: 25px;
	height: 25px;
	flex: 0 0 25px;
	padding: 0;
	transition: background ease-in-out .09s
	&:hover {
		background: rgb(40, 167, 69, .5);
		color: #000;
	}
}
.taskDone.col{
	color: white;
	background: #28a745;
	display: flex;
	justify-content: center;
	align-items: center;
	&:hover {
		background: rgb(40, 167, 69, .5);
	}
}
@media (hover: none) {
	.taskDone.col:hover {
		background: #28a745;
	}
}
.habit-title {
	display: inline-block;
	max-width: 80%;
	border: 2px solid transparent;
}
.habit-btns {
	float: right;
	color: #ddd;
}
.input-title {
	margin-left: -7px;
	padding-left: 8px;
	outline: none;
	border: 1px solid #007bff;
	width: 75%;
	font-weight: bold;
	@media screen and (max-width: 769px){
		width: 60%

	}
}
.col__progress {
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	@media screen and (max-width: 769px){
		margin-top: 20px

	}
} //todo export it to another folder
.habit__wrap {
	min-width: 205px;
	flex-wrap: wrap;
	alignItems: center;
	display: flex; 
}
`

export default class TaskRow extends Component {
	constructor(props) {
		super(props)
		this.state = {
			daysInMonth: [],
			// currentMonth: '', // TODO set it to current month name
			inputHabitTitle: this.props.title,
			editingTask: false,
			confirmed: false,
			showModal: false,
			errorInput: false,
			percentage: 0,
			active: null
		}
		this.datesFirebaseRef = firebase.database().ref('habits/' + this.props.newid).child('dates');
		this.idHabitFirebaseRef = firebase.database().ref('habits/' + this.props.newid);
}


	componentWillMount() {
		let daysInCurrentMonthArr = this.getFormatedDaysArray();
		this.setState({
			daysInMonth: daysInCurrentMonthArr,
		})
		this.setPercentage()
	}

	//DATES FORMAT: DD-MM-YYYY
	getFormatedDaysArray = () => {
		let daysInMonthMoment = moment().daysInMonth(); // 30
		let arrFormatDates = [];

		while (daysInMonthMoment) {
			let date = moment().date(daysInMonthMoment);
			let formatDate = date.toISOString().split('T')[0];
			arrFormatDates.push(formatDate);
			daysInMonthMoment--;
		}
		return arrFormatDates.reverse(); //["2019-06-01", ...]
	}


	//ISO DATES
	getIsoDates = () => {
		let daysInMonthMoment = moment().daysInMonth();
		let arrIsoDates = [];

		while (daysInMonthMoment) {
			let date = moment().date(daysInMonthMoment);
			let formatDate = date.toISOString();
			arrIsoDates.push(formatDate);
			daysInMonthMoment--;
		}
		return arrIsoDates.reverse();
	}


	handleClickOnTask = (number, active) => { // add/remove date for each task
		// this.checkIfActive(number)
		if (active) {
			this.removeDate(number)
			return;
		}
		this.addDate(number)

	}

	// checkIfActive = (number) => {
	// 	this.datesFirebaseRef.orderByChild("pushDate").equalTo(number).once('value', snapshot => {
	// 		if (snapshot.exists()) {
	// 			console.log('exists')
	// 			this.setState({active: true})
	// 		}
	// 		return this.setState({active: false})
	// 	})
	// }

	// DATES
	addDate = number => {
		let pushDate = number;
		let newPushedRef = this.datesFirebaseRef.push();
		newPushedRef.set({ pushDate }).then(() =>
			this.addPoint()
		);
	}
	updateCurrentDate = (number) => {
		console.log(this.props.currentDates)
		var index = this.props.currentDates.indexOf(number);
		if (index !== -1) 
			this.props.currentDates.splice(index, 1);
		console.log(this.props.currentDates)
	}


	removeDate = number => {
		let removeRefs = this.datesFirebaseRef.child(number)
		removeRefs.remove().then(() => {
			this.subtractPoint()
		});
		this.updateCurrentDate(number)
	}

	// POINTS
	addPoint = () => {
		if (this.props.points >= 0 && (this.props.points <= (this.state.daysInMonth.length - 1))) {
			this.idHabitFirebaseRef.update({ habitPoints: this.props.points + 1 }).then(() => {
				this.setPercentage()
			});
		}
	}

	subtractPoint = () => {
		if (this.props.points === 0)
			return;
		this.idHabitFirebaseRef.update({ habitPoints: this.props.points - 1 }).then(() => {
			this.setPercentage()
		});
	}

	// PERCENTAGES
	changeIntoPercentage = (part, total) => {
		console.log({ part, total });
		return Math.ceil(100 * part / total);
	}
	setPercentage = () => {
		let percentage = this.changeIntoPercentage(this.props.points, moment().daysInMonth());
		this.setState({
			percentage
		})
	}

	// HABIT TITLES
	handleChange = e => {
		this.setState({ inputHabitTitle: e.target.value });
	}

	editHabitTitle = e => {
		if (this.state.editingTask) {
			this.setState({ editingTask: false })
		} else {
			this.setState({ editingTask: true })
		}
	}

	saveHabitTitle = e => {
		if (this.state.inputHabitTitle.length === 0) {
			this.setState({ errorInput: true })
			return;
		}
		this.idHabitFirebaseRef.update({ habitTitle: this.state.inputHabitTitle });
		this.setState({ editingTask: false, errorInput: false })
	}

	//REMOVING HABITS
	deleteHabit = () => {
		this.idHabitFirebaseRef.remove();
	}

	askToConfirmRemoval = () => {
		this.setState({ showModal: true })
	}

	confirm = () => {
		this.setState({ confirmed: true, showModal: false })
		this.deleteHabit()
	}

	handleCloseModal = () => {
		this.setState({ showModal: false })
	}

	render() {
		const { daysInMonth, editingTask, inputHabitTitle, errorInput, showModal, percentage } = this.state;

		return (
			<StyledCol className="col-md-6 col-sm-12">

				<div style={{ textAlign: 'left', minHeight: '40px', marginBottom: '5px' }}>
					<p style={{ fontWeight: 'bold', marginBottom: '5px' }}>

						{!editingTask && <span className="habit-title">{this.props.title}</span>}
						{editingTask &&
							<input type="text"
								className={errorInput ? 'input-title error' : 'input-title'}
								ref={input => input && input.focus()}
								value={inputHabitTitle}
								onChange={this.handleChange}
								onKeyPress={e => { if (e.key === 'Enter') { this.saveHabitTitle() } }}
							/>}
						<span className="habit-btns">
							{!editingTask
								?
								<Button variant="light mr-2" size="sm" onClick={this.editHabitTitle} title="edytuj tytuł"><i className="fas fa-edit" ></i></Button>
								:
								<Button variant="light mr-2" size="sm" onClick={this.saveHabitTitle} title="zapisz"><i className="fas fa-check"></i></Button>
							}
							<Button variant="light" size="sm" onClick={this.askToConfirmRemoval} title="usuń"><i className="far fa-trash-alt" ></i></Button>
						</span>
					</p>

					<ConfirmationModal
						showmodal={showModal}
						handleConfirm={this.confirm}
						handleHide={this.handleHide}
						handleCloseModal={this.handleCloseModal}
					/>

				</div>
				<Row>
					<Col md={6} sm={12}>

						<div className="habit__wrap">
							{daysInMonth.map(
								(number, index) => {

									// const active = this.props.currentDates.includes(number)
									
									
									// const active = true
									// const rowClass = active ? 'task taskDone' : 'task'
									
									return <Col className={this.state.active ? 'task taskDone' : 'task'} data-date={number} newid={"task_" + this.props.newid + "_" + number} key={number} onClick={() => this.handleClickOnTask(number)}>{index + 1}</Col>

								}
							)}
						</div>
					</Col>

					<Col className="col__progress" md={6} sm={12}>
						<p>Postęp:</p>
						<ProgressPercentageChart percentage={percentage} />
						<p>{this.props.points}/30</p>
					</Col>
				</Row>

			</StyledCol>
		);
	}
}
