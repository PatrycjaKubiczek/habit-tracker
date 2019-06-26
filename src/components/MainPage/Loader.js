import React, { Component } from 'react';
import { Container, Spinner} from 'react-bootstrap';

export default class Loader extends Component {
	render() {
		return (
			<Container className="container__loading">
			<p>Wczytywanie...</p>
			<Spinner animation="border" role="status">
			<span className="sr-only">Wczytywanie...</span>
			</Spinner>
			</Container>
		);
	}
}
