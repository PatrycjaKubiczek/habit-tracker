import React from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';

export default class InputHabitTitle extends React.Component {

	render() {
		return (

			<InputGroup className="mb-3">
				<FormControl ref="taskInput"
					placeholder="wpisz nazwę..."
					aria-label="nazwa"
					onChange={this.props.handleChange}
					style={{ boxShadow: 'none' }}
					className={this.props.error ? 'error' : ''}
					value={this.props.inputHabit}
					onKeyPress={e => { if (e.key === 'Enter') { this.props.handleClick() } }}
				/>

				<InputGroup.Append>
					<Button variant="info" onClick={this.props.handleClick}>dodaj nowy nawyk</Button>
				</InputGroup.Append>
			</InputGroup>
		);
	}
}
