import React from 'react';
import { Toast } from 'react-bootstrap';

export default class ToastHabit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.showToast
    }
  }
  render() {

    return (

      <Toast onClose={this.props.handleCloseToast} style={{ zIndex: '1', position: 'fixed', background: 'white', bottom: '20px', left: '20px' }} show={this.props.showToast} autohide>
        <Toast.Header>
          <strong className="mr-auto">Stworzono nowy nawyk</strong>
        </Toast.Header>
      </Toast>

    );
  }
}
