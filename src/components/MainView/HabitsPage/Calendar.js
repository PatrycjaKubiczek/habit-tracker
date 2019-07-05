import React, { Component } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import moment from 'moment'

class Calendar extends Component {
    state = {
        currentMonth: moment().format("MMMM"),
        weekdays: moment.weekdaysShort(true),
        daysInMonth: moment().daysInMonth(),
        firstDayOfMonth: (moment().startOf('month').day() - 1),
        rows: 6
    }
    renderCalendar() {

    }
    componentDidMount() {
        console.log(this.state.firstDayOfMonth)
    }
    renderRows = () => {
        let table = []
        let numerOfDay = 1

        for (let i = 0; i < 6; i++) {
            let children = []
            for (let c = 0; c < 7; c++) {
                if (i === 0 && c < this.state.firstDayOfMonth) {
                    children.push(<td>empty</td>)
                } else if(numerOfDay > this.state.daysInMonth) {
                    break;
                } else {
                    children.push(<td>{numerOfDay}</td>)
                }
                numerOfDay++

            }
            table.push(<tr>{children}</tr>)
        }
        return table
    }
    render() {
        return (
            <div className="cal">
                <header>{this.state.currentMonth}</header>
                <Row>
                    {this.state.weekdays.map((weekday) => <Col key={weekday}>{weekday}</Col>)}
                </Row>
                <table>
                    {this.renderRows()}
                </table>
                {/* {this.state.daysInMonth.map((day) => <Col key={day}>{day}</Col>)} */}
            </div>
        );
    }
}

export default Calendar;