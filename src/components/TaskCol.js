import React from 'react';
import { Col } from 'react-bootstrap';

export default class TaskCol extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Col className="task" data-date={this.props.date} data-olddate={this.props.olddate} id={"task_" + this.props.id + "_" + this.props.id} onClick={this.handleClick} style={{border: '1px solid green'}}></Col>
		);
	}
}
