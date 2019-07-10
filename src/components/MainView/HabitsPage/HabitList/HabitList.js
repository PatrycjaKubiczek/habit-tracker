import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import firebase from '../../../../firebase.js'
import moment from 'moment';
import ProgressPercentageChart from '../ProgressPercentageChart.js';
import find from 'lodash/find';

// COMPONENTS
import ConfirmationModal from '../ConfirmationModal.js';
import Calendar from './../Calendar.js';

// STYLES
import { StyledCol, ColProgress, BtnsHabit, WrapHabit, WrapTitleHabit, TitleHabit, HabitDate } from './HabitListStyle.js';


export default class HabitList extends Component {
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
            pointsFB: 0,
            currMonthDate: '',
        }
        const { idkey } = this.props.habit;
        
        let uid = firebase.auth().currentUser.uid;
		
        this.datesFirebaseRef = firebase.database().ref('/users/' + uid + '/habits/' + idkey).child('dates');
        this.idHabitFirebaseRef = firebase.database().ref('/users/' + uid + '/habits/' + idkey);
    }
    componentWillMount() {
        this.setCurrentMonthDate();
    }


    componentDidMount() {
        // this.setCurrentMonthDate();

        let daysInCurrentMonthArr = this.getFormatedDaysArray();
        this.setState({
            daysInMonth: daysInCurrentMonthArr
        })
        this.setPercentage()
    }

    setCurrentMonthDate() {
        let currMonthDate = moment().format("YYYY-MM");

        this.setState({
            currMonthDate: currMonthDate
        })
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



    handleClickOnTask(number, active) { // add/remove date for each task
        if (active) {
            this.removeDate(number)
            return;
        }
        this.addDate(number)
    }

    checkIfActive = (date) => {
        if (!this.props.habit.dates)
            return false;

        return typeof find(this.props.habit.dates, { 'pushDate': date }) !== 'undefined'
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
            if (data) {
                dataId = Object.keys(data)[0]
            }
            this.datesFirebaseRef.child(dataId).remove()
        }).then(() => {
            this.subtractPoint()
        })
    }

    // POINTS
    addPoint = () => {
        // if (this.props.habit.points >= 0 && (this.props.habit.points <= (this.state.daysInMonth.length - 1))) {
        //     this.idHabitFirebaseRef.update({ habitPoints: this.props.habit.points + 1 }).then(() => {
                this.setPercentage()
        //     });
        // }
    }

    subtractPoint = () => {
        // if (this.props.habit.points === 0)
        //     return;
        // this.idHabitFirebaseRef.update({ habitPoints: this.props.habit.points - 1 }).then(() => {
            this.setPercentage()
        // });
    }

    // PERCENTAGES
    changeIntoPercentage = (part, total) => {
        return Math.ceil(100 * part / total);
    }
    setPercentage = () => {
        let pushDate = this.datesFirebaseRef.orderByChild('pushDate').startAt(this.state.currMonthDate);

        pushDate.once('value', snapshot => {
            let dates = snapshot.val()

            let currentDates = [];
            for (let date in dates) {
                currentDates.push(date);
            }
            let points = currentDates.length
            this.setState({
                pointsFB: points
            })

        }).then(() => {
            let percentage = this.changeIntoPercentage(this.state.pointsFB, moment().daysInMonth());
            this.setState({
                percentage
            })
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

        const { daysInMonth, editingTask, inputHabitTitle, errorInput, showModal, percentage, pointsFB } = this.state;



        return (
            <StyledCol className="col-md-6 col-sm-12">

                <WrapTitleHabit>

                    {!editingTask && <TitleHabit>{habit.title}</TitleHabit>}
                    {editingTask &&
                        <input type="text"
                            className={errorInput ? 'input-title error' : 'input-title'}
                            ref={input => input && input.focus()}
                            value={inputHabitTitle}
                            onChange={this.handleChange}
                            onKeyPress={e => { if (e.key === 'Enter') { this.saveHabitTitle() } }}
                        />
                    }
                    <BtnsHabit>
                        {!editingTask
                            ?
                            <Button variant="light mr-2" size="sm" onClick={this.editHabitTitle} title="edytuj tytuł"><i className="fas fa-edit" ></i></Button>
                            :
                            <Button variant="light mr-2" size="sm" onClick={this.saveHabitTitle} title="zapisz tytuł"><i className="fas fa-check"></i></Button>
                        }
                        <Button variant="light" size="sm" onClick={this.askToConfirmRemoval} title="usuń nawyk"><i className="far fa-trash-alt" ></i></Button>
                    </BtnsHabit>


                    <ConfirmationModal
                        showmodal={showModal}
                        handleConfirm={this.confirm}
                        handleHide={this.handleHide}
                        handleCloseModal={this.handleCloseModal}
                    />

                </WrapTitleHabit>
                <Row>
                    <Col md={7} sm={12}>
                        <WrapHabit>
                            
                            {/* <Calendar daysInMonthProps={daysInMonth} handleClick={this.handleClickOnTask} habitprops={this.props.habit}/> */}
                            {daysInMonth.map(
                                (date, index) => {

                                    const active = this.checkIfActive(date)
                                    const rowClass = active ? 'task taskDone' : 'task'

                                    return <HabitDate key={date} className={rowClass} data-date={date} onClick={() => this.handleClickOnTask(date, active)}>{index + 1}</HabitDate>

                                }
                            )}
                        </WrapHabit>
                    </Col>

                    <ColProgress md={5} sm={12}>
                        <p className="mb-0">Postęp:</p>
                        <ProgressPercentageChart percentage={percentage} />
                        <p>{pointsFB}/{daysInMonth.length}</p>
                    </ColProgress>
                </Row>

            </StyledCol>
        );
    }
}
