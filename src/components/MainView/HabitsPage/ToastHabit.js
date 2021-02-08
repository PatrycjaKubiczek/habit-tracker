import React from 'react';
import { Toast } from 'react-bootstrap';

export default class ToastHabit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: this.props.showToast
    }
  }
  componentDidMount() {

  }
  render() {

    return (

      <Toast
        onClose={this.props.handleCloseToast}
        style={{ zIndex: '1', position: 'fixed', bottom: '20px', left: '20px', border: 'none' }}
        show={this.props.showToast}
        autohide
        >
        <Toast.Header style={{background: '#28a745', color: 'white',}}>
          <strong className="mr-auto">Stworzono nowy nawyk</strong>
        </Toast.Header>
      </Toast>

    );
  }
}
