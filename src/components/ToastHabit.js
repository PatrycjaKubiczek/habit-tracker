import React from 'react';
import { Row, Col, Toast, Button } from 'react-bootstrap';

export default class ToastHabit extends React.Component {

	constructor(props) {
        super(props);
	}

	render() {
        return (
          
                <Toast style={{zIndex: '1', position: 'fixed', background: 'white', bottom: '20px', left: '20px'}} show={this.props.showToast} onClose={this.props.handleCloseToast} autohide>
                  <Toast.Header>
                    <strong className="mr-auto">Stworzono nowy nawyk</strong>
                  </Toast.Header>

                </Toast>
           
          );
	}
}
