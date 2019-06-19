import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import styled from 'styled-components';
import firebase from '../firebase.js'
import moment from 'moment';
import ProgressPercentageChart from './ProgressPercentageChart.js';
import ConfirmationModal from './ConfirmationModal.js';
import find from 'lodash/find';

import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

// import TaskCol from './TaskCol.js'

const StyledCol = styled.div`
padding: 20px;
border: 1px solid #ddd;
margin: 10px -10px; 
background: #fff;
border-radius: 5px;
user-select: none;
box-shadow: 0px 2px 3px rgba(0,0,0,.03), 1px 2px 2px rgba(0,0,0,.03), -1px -2px 2px rgba(0,0,0,.05);

@media screen and (max-width: 769px){
	margin: 10px
}
.col {
	margin: 2px;
	cursor: pointer;
    user-select: none;
    line-height: 30px;
}
.fa {
	display: none
}
.task {
    border-radius: 5px;
    background: #eee;
	// border: 1px solid #28a745;
	width: 30px;
	height: 30px;
	flex: 0 0 30px;
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
	min-width: 245px;
	flex-wrap: wrap;
	alignItems: center;
	display: flex; 
}
.title__wrap {
	text-align: left;
    min-height: 40px;
    border-bottom: 1px solid #ddd;
	margin-bottom: 15px;
}
`

export default class TaskRow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            daysInMonth: [],
            inputHabitTitle: this.props.habit.title,
            editingTask: false,
            confirmed: false,
            showModal: false,
            errorInput: false,
            percentage: 0,
            // active: null
        }
        const { idkey } = this.props.habit;
        this.datesFirebaseRef = firebase.database().ref('habits/' + idkey).child('dates');
        this.idHabitFirebaseRef = firebase.database().ref('habits/' + idkey);
        // const { habit } = this.props
    }


    componentDidMount() {
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



    handleClickOnTask(number, active){ // add/remove date for each task
        if (active) {
            this.removeDate(number)
            return;
        }
        this.addDate(number)
    }

    checkIfActive = (date) => {
        if(!this.props.habit.dates)
            return false;

        return typeof find(this.props.habit.dates, {'pushDate': date} ) !== 'undefined'
    }

    // DATES
    addDate = date => {
        let pushDate = date;
        let newPushedRef = this.datesFirebaseRef.push();
        newPushedRef.set({ pushDate }).then(() =>
            this.addPoint()
        );
    }


    removeDate = date => {
        let removeRefs = this.datesFirebaseRef.orderByChild('pushDate').equalTo(date);
        removeRefs.once('value', snapshot => {
            let data = snapshot.val()
            let dataId;
            if(data) {
                dataId = Object.keys(data)[0]
            }
            this.datesFirebaseRef.child(dataId).remove() 
        }).then(() => {
            this.subtractPoint()
        })
    }

    // POINTS
    addPoint = () => {
        if (this.props.habit.points >= 0 && (this.props.habit.points <= (this.state.daysInMonth.length - 1))) {
            this.idHabitFirebaseRef.update({ habitPoints: this.props.habit.points + 1 }).then(() => {
                this.setPercentage()
            });
        }
    }

    subtractPoint = () => {
        if (this.props.habit.points === 0)
            return;
        this.idHabitFirebaseRef.update({ habitPoints: this.props.habit.points - 1 }).then(() => {
            this.setPercentage()
        });
    }

    // PERCENTAGES
    changeIntoPercentage = (part, total) => {
        return Math.ceil(100 * part / total);
    }
    setPercentage = () => {
        let percentage = this.changeIntoPercentage(this.props.habit.points, moment().daysInMonth());
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
        const { habit } = this.props;

        const { daysInMonth, editingTask, inputHabitTitle, errorInput, showModal, percentage } = this.state;



        return (
            <StyledCol className="col-md-6 col-sm-12">

                <div className="title__wrap">
                    <p style={{ fontWeight: 'bold', marginBottom: '5px' }}>

                        {!editingTask && <span className="habit-title">{habit.title}</span>}
                        {editingTask &&
                            <input type="text"
                                className={errorInput ? 'input-title error' : 'input-title'}
                                ref={input => input && input.focus()}
                                value={inputHabitTitle}
                                onChange={this.handleChange}
                                onKeyPress={e => { if (e.key === 'Enter') { this.saveHabitTitle() } }}
                            />
                        }
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
                    <Col md={7} sm={12}>

                        <div className="habit__wrap">
                            {daysInMonth.map(
                                (date, index) => {
                                   
                                    const active = this.checkIfActive(date)
                                    const rowClass = active ? 'task taskDone' : 'task'
                                    
                                    return <Col key={date} className={rowClass} data-date={date} onClick={() => this.handleClickOnTask(date, active)}>{index + 1}</Col>

                                }
                            )}
                        </div>
                    </Col>

                    <Col className="col__progress" md={5} sm={12}>
                        <p className="mb-0">Postęp:</p>
                        <ProgressPercentageChart percentage={percentage} />
                        <p>{habit.points}/30</p>
                    </Col>
                </Row>

            </StyledCol>
        );
    }
}
