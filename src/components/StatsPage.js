import React, { Component } from 'react';
import { Container, Row } from 'react-bootstrap';
import Stats from './Stats.js';

class StatsPage extends Component {
    render() {
        return (
            <Container className="container__app" style={{ flexDirection: 'column' }}>
                <Row className="row__subtitle">
                    <h2 className="text-left">Statystki</h2>
                </Row>
                <Container className="container__stats mb-5" style={{marginTop: '23px'}}>
                    {
                        this.props.habits.map((habit) => <Stats habit={habit} key={habit.idkey} />)
                    }
                </Container>
            </Container>
        );
    }
}

export default StatsPage;