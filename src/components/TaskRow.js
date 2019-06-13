import React, { Component } from 'react';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import styled from 'styled-components';
import firebase from '../firebase.js'
import moment from 'moment';
import ReactMinimalPieChart from 'react-minimal-pie-chart';
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
	border: 1px solid #E0DCE2;
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
}
`

export default class TaskRow extends Component {
	constructor(props){
		super(props)
		this.state = {
			daysInMonth: [],
			currentMonth: '',
			arrDates: [],
			oldDates: {},
			dates: this.props.dates,
			editingTask: false,
			input: this.props.title,
			currentHabits: this.props.habits,
			confirmed: false,
			show: false,
			error: false
		}
	}

	getDaysArrayByMonth = () => {
		var daysInMonthMoment = moment().daysInMonth();
		var arrDays = [];

		while(daysInMonthMoment) {
			var current = moment().date(daysInMonthMoment);
			arrDays.push(current.format("DD-MM-YYYY"));
			daysInMonthMoment--;
		}
		return arrDays.reverse();
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		console.log(this.state.editingTask)
	}

	componentWillMount(){
		
		let daysInCurrentMonthArr = this.getDaysArrayByMonth();
		let datesFromArr = this.getDates();
		this.setState({
			daysInMonth: daysInCurrentMonthArr,
			arrDates: datesFromArr
		})
	}


	handleClick = (e) => {
		e.preventDefault();
		if(e.target.className === 'task taskDone col') {
			this.subtractPoint()
			this.removeDate(e)
			e.target.className = 'task col';
		} else if(e.target.className === 'task col') {
			this.addPoint()
			this.addDate(e)
			e.target.className = 'task taskDone col'
		}
	}

	addDate = (e) => {
		let datesRef = firebase.database().ref('habits/' + this.props.newid).child('dates');
		let pushDate = e.target.dataset.date;
		var newPushedRef = datesRef.push();
		newPushedRef.set({pushDate});
	}

	removeDate = e => {
		let datesRef = firebase.database().ref('habits/' + this.props.newid).child('dates'); // TODO 
		let removeDate = e.target.dataset.key;
		let removeRefs = datesRef.child(removeDate)
		removeRefs.remove();
		this.updatePercentage();
	}

	addPoint = () => {
		let pointRef = firebase.database().ref('habits/' + this.props.newid);
		if(this.props.points >= 0 && (this.props.points <= (this.state.daysInMonth.length - 1))){
			pointRef.update({habitPoints: this.props.points + 1});
		}
		this.updatePercentage()
	}
	updatePercentage = (e) => {
		let pointsRef = firebase.database().ref('habits/' + this.props.newid);
		pointsRef.once('value', snapshot => {
			let habitPoints = snapshot.child('habitPoints').val()
			let perc = this.changeIntoPercentage(habitPoints, 30)
			pointsRef.update({percentage: perc});
		})
	}

	subtractPoint = (e) => {
		let pointRef = firebase.database().ref('habits/' + this.props.newid +'/');
		if(this.props.points === 0)
			return;
		pointRef.update({habitPoints: this.props.points - 1});
	}

	getDates = () => {
		let datesRef = firebase.database().ref('habits/' + this.props.newid + '/dates');
		datesRef.once('value', snapshot => {
			let newDates = []
			snapshot.forEach((child) => {
				if(child.val().pushDate !== undefined){
					newDates.push(child.val().pushDate)
				}
			});

			this.setState({
				arrDates: newDates
			})
		})


		if(this.state.dates !== undefined){
			let datesMoment = this.state.dates.map((date) => {
				return moment(date).format("DD-MM-YYYY");
			});
		}
	}
	changeIntoPercentage = (part, total) =>{
		return Math.ceil((100 * part) / total); 
	}
	editTitle = (e) => {
		if(this.state.editingTask){
			this.setState({editingTask: false})
		} else {
			this.setState({editingTask: true})
		}

	}

	saveTitle = (e) => {
		if(this.state.input.length == 0){
			this.setState({error: true})
			return;
		}
		let titleRef = firebase.database().ref('habits/' + this.props.newid +'/');
		titleRef.update({habitTitle: this.state.input});
		this.setState({editingTask: false})
		this.setState({error: false})
	}
	deleteHabit = (habits) => {
		
		let habitRefs = firebase.database().ref('habits/');
		let datesRef = firebase.database().ref('habits/' + this.props.newid).remove();
		
	}
	askToConfirm = () => {
		this.setState({show: true})
	}
	confirm = () => {
		this.setState({confirmed: true})
		this.setState({show: false})
		this.deleteHabit()
	}
	handleClose = () => {
		this.setState({show: false})
	}
	handleChange = e => {
		this.setState({ input: e.target.value });
	}

	render() {
		const { editingTask, error } = this.state;

		return (
			<StyledCol className="col-md-6 col-sm-12" style={{}}>

			<div style={{textAlign: 'left', minHeight: '30px'}}>
			<p style={{fontWeight: 'bold', marginBottom: '5px'}}>

			{!editingTask && <span className="habit-title">{this.props.title}</span> }
			{editingTask && 
				<input type="text" 
				className={error ? 'input-title error' : 'input-title'}
				ref={input => input && input.focus()} 
				value={this.state.input} 
				onChange={this.handleChange} 
				onKeyPress={e => {if(e.key === 'Enter'){ this.saveTitle()}}} 
				/> }
				<span className="habit-btns"> 
				{!editingTask ? 
					<Button variant="light mr-2" size="sm" onClick={this.editTitle} title="edytuj tytuł">
					<i className="fas fa-edit" ></i>
					</Button> :
					<Button variant="light mr-2" size="sm" onClick={this.saveTitle} title="zapisz">
					<i class="fas fa-check"></i>
					</Button> 
				}
				<Button variant="light" size="sm" onClick={this.askToConfirm} title="usuń"><i className="far fa-trash-alt" ></i></Button>
				</span>
				</p>

				<Modal show={this.state.show} onHide={this.handleClose}>
				<Modal.Header closeButton>
				<Modal.Title>Potwierdź usunięcie</Modal.Title>
				</Modal.Header>
				<Modal.Body>Czy na pewno chcesz usunąć ten nawyk?</Modal.Body>
				<Modal.Footer>
				<Button variant="secondary" onClick={this.handleClose}>
				Anuluj
				</Button>
				<Button variant="danger" onClick={this.confirm}>
				Tak
				</Button>
				</Modal.Footer>
				</Modal>

				</div>
				<Row>
				<Col md={6} sm={12}>

				<div style={{minWidth: '205px', flexWrap: 'wrap', alignItems: 'center', display: 'flex'}}>
				{this.state.daysInMonth.map((number, index) => {
					if(this.props.dates.includes(number)){
						for(let date in this.props.oldDates){
							if(this.props.oldDates[date].pushDate === number)
								return <Col className="task taskDone" data-key={date} data-date={number} newid={"task_" + this.props.newid + "_" + number} key={number} onClick={this.handleClick} style={{border: '1px solid #28a745 '}}>{index+1}</Col>
						}

					} else {
						return <Col className="task" data-date={number} id={"task_" + this.props.id + "_" + number} key={number} onClick={this.handleClick} style={{border: '1px solid #28a745'}}>{index+1}</Col>
					}
				})
			}
			</div>
			</Col>
			<Col md={6} sm={12} style={{display: 'flex', justifyContent:'center', alignItems: 'center', flexDirection: 'column'}}>
			<p>Postęp:</p>
			<ReactMinimalPieChart
			data={[{
				value: this.props.percentage,
				color: '#28a745',
				startOffset: 0,
			}]}
			cy={50}
			cx={50}
			totalValue={100}
			lineWidth={20}
			startAngle={270}
			rounded
			// animate
			label={({ data, dataIndex }) =>
			Math.round(data[dataIndex].percentage) + '%'
		}
		labelStyle={{
			fontSize: '25px',
			fontFamily: 'sans-serif'
		}}
		labelPosition={0}
		style={{width: "100px", height: "100px", margin: '10px'}}
		/>
		<p>{this.props.points}/30</p>
		</Col>
		</Row>

		</StyledCol>
		);
	}
}
