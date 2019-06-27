import React, { Component } from 'react';
import { Spinner} from 'react-bootstrap';

// STYLES
import { ContainerLoader } from './LoaderStyle.js'

export default class Loader extends Component {
	render() {
		return (
			<ContainerLoader>
			<p>Wczytywanie...</p>
			<Spinner animation="border" role="status">
			<span className="sr-only">Wczytywanie...</span>
			</Spinner>
			</ContainerLoader>
		);
	}
}
