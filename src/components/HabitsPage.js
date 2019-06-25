import React, { Component } from 'react';
import firebase from '../firebase.js'
import { Container, Row, Col } from 'react-bootstrap';
import styled from 'styled-components';
import moment from 'moment'
import localization from 'moment/locale/pl'

import TaskRow from './TaskRow2.js';
import InputHabitTitle from './InputHabitTitle.js';
import ToastHabit from './ToastHabit.js';

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
		// this.setState({disableBtn : true});
		if (this.state.inputNewHabit.length === 0) {
			this.setState({
				error: true
			})
			return
		}
		// const habitRef = firebase.database().ref('habits');
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
            <Container className="container__app">
                <Row className="row__subtitle">
                    <h2> {currentMonth} </h2>
                    <Col md={6} style={{ padding: '0 0 0 10px' }}>
                        <InputHabitTitle
                            error={error}
                            handleChange={this.handleChangeOnInput}
                            handleClick={this.addNewHabit}
                            className={disableBtn ? 'disabled' : null}
                            inputHabit={inputNewHabit}
                        // handleKeypress={ this.addNewHabit}
                        />
                        {error && <small className="input__error">* pole jest wymagane </small>}
                    </Col>
                </Row>
            </Container>

            <Container className="container__habits">
                {
                    this.props.habits.map((habit) => <TaskRow habit={habit} key={habit.idkey} />)
                }

            </Container>
            </>

        );
    }
}

export default HabitsPage;