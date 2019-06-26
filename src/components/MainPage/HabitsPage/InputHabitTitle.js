import React from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

export default class InputHabitTitle extends React.Component {

	render() {
		return (
			
			<InputGroup className="mb-3">
			<FormControl ref="taskInput"
			placeholder="wpisz nazwę..."
			aria-label="nazwa"
			aria-describedby="basic-addon2"
			onChange={this.props.handleChange}
			style={{boxShadow: 'none'}}
			className={this.props.error ? 'error' : ''}
			value={this.props.inputHabit}
			/>
			
			<InputGroup.Append>
			<Button onClick={this.props.handleClick} style={{borderColor: '#58a4b0', backgroundColor: '#58a4b0', boxShadow: 'none'}}>dodaj nowy nawyk</Button>
			</InputGroup.Append>
			</InputGroup>
		);
	}
}
