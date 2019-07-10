import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import moment from 'moment'
import find from 'lodash/find';

class Calendar extends Component {
    state = {
        currentMonth: moment().format("MMMM"),
        weekdays: moment.weekdaysShort(true),
        daysInMonth: moment().daysInMonth(),
        firstDayOfMonth: (moment().startOf('month').day() - 1),
        rows: 6,

    }
    renderCalendar() {

    }
    componentDidMount() {
    }
    checkIfActive = (date) => {
        if (!this.props.habitprops.dates)
            return false;

        return typeof find(this.props.habitprops.dates, { 'pushDate': date }) !== 'undefined'
    }

    renderRows = (dates) => {
        let table = []
        let numerOfDay = 1


        for (let i = 0; i < 6; i++) {
            let children = []
            for (let c = 0; c < 7; c++) {
                if (i === 0 && c < this.state.firstDayOfMonth) {
                    children.push(<td>empty</td>)
                } else if (numerOfDay > this.state.daysInMonth) {
                    break;
                } else {
                    
                    children.push(<td className='col' key={dates[numerOfDay - 1]} data-date={dates[numerOfDay - 1]}>{numerOfDay}</td>)
                }
                numerOfDay++
                

            }
            table.push(<tr>{children}</tr>)
        }
        return table
    }
    render() {
        return (
            <div className="col">


                <table>
                    <thead>
                        <tr>
                            {this.state.weekdays.map((weekday) => <th key={weekday}>{weekday}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {
                        this.renderRows(this.props.daysInMonthProps)}
                    </tbody>
                </table>
                {/* {this.state.daysInMonth.map((day) => <Col key={day}>{day}</Col>)} */}
            </div>
        );
    }
}

export default Calendar;