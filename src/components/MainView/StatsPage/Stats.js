import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import firebase from './../../../firebase.js'
import moment from 'moment';

export default class Stats extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            points: 0,
            total: 0,
            now: 0
        }
    }
    changeIntoPercentage = (part, total) => {
        return Math.ceil(100 * part / total);
    }
    setPoints= () => {
        let uid = firebase.auth().currentUser.uid;
        let daysInMonthMoment = moment().daysInMonth();
        let pushDate = firebase.database().ref('/users/' + uid + '/habits/' + this.props.habit.idkey).child('dates').orderByChild('pushDate').startAt(this.props.currentMonthDate);

        pushDate.once('value', snapshot => {
            let dates = snapshot.val()

            let currentDates = [];
            for (let date in dates) {
                currentDates.push(date);
            }
            let points = currentDates.length
            this.setState({
                points: points,
                total: daysInMonthMoment 
            })
        

        }).then(() => {
           let perc = this.changeIntoPercentage(this.state.points, this.state.total)
           this.setState({
               now: perc
           })
        })

    }
    componentWillMount(){
        this.setPoints()
    }

    render() {
        return (
            <>
                <h5 style={{ textAlign: 'left' }}>{this.props.habit.title}</h5>
                <ProgressBar variant="success" now={this.state.now} label={`${this.state.now}%`} style={{ marginBottom: '20px', color: '#000' }} />

            </>
        );
    }
}
