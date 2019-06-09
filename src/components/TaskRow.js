import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import firebase from '../firebase.js'
import moment from 'moment';


const StyledCol = styled.div`
.col {
	margin: 2px;
	cursor: pointer;
	user-select: none;
}
.row {
	flex-wrap: nowrap;
}
.fa {
	display: none
}
.task {
	border: 1px solid #E0DCE2;
	width: 25px;
	height: 25px;
	// max-width: 25px;
	flex: 0 0 25px;
	// border: 1px solid red;
	padding: 0;
}
.taskDone.col{
	background: green;
	display: flex;
	justify-content: center;
	align-items: center;
	&:after {
		color: white;
		font-family: "Font Awesome 5 Free";
		content: "\f00c";
		font-weight: 900;
		// position: absolute;
		// top: 0;
		// left: 0;
		// right: 0;
		font-size: 10px;
	}
}
`

export default class TaskRow extends Component {
	constructor(props){
		super(props)
		this.state = {
			daysInMonth: [],
			currentMonth: '',
			arrDates: []
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


	componentWillMount(){
		let daysInCurrentMonthArr = this.getDaysArrayByMonth();
		let datesFromArr = this.getDates();
		this.setState({
    		// daysInMonth: daysMonth(30)
    		daysInMonth: daysInCurrentMonthArr,
    		dates: datesFromArr
    	})
	}


	handleClick = (e) => {
		e.preventDefault();
		if(e.target.className === 'task taskDone col') {
			this.subtractPoint()
			this.removeDate(e)
			e.target.className = 'task col';
		} else {
			this.addPoint()
			this.addDate(e)
			e.target.className = 'task taskDone col'
		}
	}

	addDate = (e) => {
		let datesRef = firebase.database().ref('habits/' + this.props.id).child('dates');
		let pushDate = e.target.dataset.date;
		let newValueindex;

		var newPushedRef = datesRef.push();
		newPushedRef.set({pushDate});
	}

	removeDate = e => {
		let datesRef = firebase.database().ref('habits/' + this.props.id).child('dates'); // TODO 
		datesRef.on('value', snapshot => {
			let dates = snapshot.val()
			for(let key in dates){
				console.log(key)
			}

		})
		// console.log(e)
	}


	addPoint = (e) => {
		let pointRef = firebase.database().ref('habits/' + this.props.id);
		if(this.props.points >= 0 && (this.props.points <= this.state.daysInMonth.length - 1))
			pointRef.update({habitPoints: this.props.points + 1});
	}

	subtractPoint = (e) => {
		let pointRef = firebase.database().ref('habits/' + this.props.id);
		if(this.props.points === 0)
			return;
		pointRef.update({habitPoints: this.props.points - 1});
	}

	getDates = () => {
		let datesRef = firebase.database().ref('habits/' + this.props.id + '/dates');
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

	render() {

		return (
			<StyledCol>

			<Row style={{marginTop: '20px'}}>
			<p style={{marginBottom: '5px'}}>{this.props.title} - {this.props.points}/30</p>
			</Row>
			
			<Row>
			{this.state.daysInMonth.map(number => {
				
				if(this.props.dates.includes(number)){
					return <Col className="task taskDone" keyid={this.props.oldDates} data-date={number} id={"task_" + this.props.id + "_" + number} key={number} onClick={this.handleClick} style={{border: '1px solid green'}}></Col>}
				else {
					return <Col className="task" data-date={number} id={"task_" + this.props.id + "_" + number} key={number} onClick={this.handleClick} style={{border: '1px solid green'}}></Col>}
				})}
			</Row>

			</StyledCol>
			);
	}
}
