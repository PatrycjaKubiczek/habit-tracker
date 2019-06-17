import React from 'react';
import { Button, Modal } from 'react-bootstrap';
export default class ConfirmationModal extends React.Component {

	render() {
		return (
			<Modal show={this.props.showmodal} onHide={this.props.handleCloseModal}>
			<Modal.Header closeButton>
			<Modal.Title>Potwierdź usunięcie</Modal.Title>
			</Modal.Header>
			<Modal.Body>Czy na pewno chcesz usunąć ten nawyk?</Modal.Body>
			<Modal.Footer>
			<Button variant="secondary" onClick={this.props.handleCloseModal}>
			Anuluj
			</Button>
			<Button variant="danger" onClick={this.props.handleConfirm}>
			Tak
			</Button>
			</Modal.Footer>
			</Modal>

			);
		}
	}
