import React from 'react';
import { ProgressBar } from 'react-bootstrap';

export default class Stats extends React.Component {

	constructor(props) {
        super(props);
        this.state ={
            now: this.changeIntoPercentage()
            // max: 30
        }
    }
    changeIntoPercentage = (part, total) => {
        return Math.ceil(100 * this.props.habit.points / 30);
    }

	render() {
		return (
            <>
            <h5 style={{textAlign: 'left'}}>{this.props.habit.title}</h5>
            <ProgressBar variant="success" now={this.state.now} label={`${this.state.now}%`} style={{marginBottom: '20px'}}/>
            
            </>
            );
	}
}
