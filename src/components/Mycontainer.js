import React, { Component } from 'react';
import firebase from '../firebase.js'

import { Container, Row, Col, Button, Spinner, InputGroup, FormControl } from 'react-bootstrap';
import styled from 'styled-components';
import TaskRow from './TaskRow'


const StyledCol = styled.div`
.col {
  margin: 2px;
  cursor: pointer;
  user-select: none;
}
.row {
  flex-wrap: nowrap;
}
.task {
  border: 1px solid #E0DCE2;
  width: 25px;
  height: 25px;
  // max-width: 25px;
  flex: 0 0 25px;
  // border: 1px solid red;
  padding: 0;
}

.calendar {
  cursor: default
}
`

class Mycontainer extends Component {
  constructor(props){
    super(props)
    this.state = {
      daysInMonth: [],
      habits: [],
      loading: true,
      input: ''
    }
  }

  componentWillMount(){
    const daysMonth = (N) => Array.from({length: N}, (v, k) => k+1); //TODO 
    this.setState({
      daysInMonth: daysMonth(30)
    })
  }

  componentDidMount(){
    this.setHabits()

  };

  setHabits = () => {
    const habitRef = firebase.database().ref('habits');
      habitRef.on('value', snapshot => {
        this.setState({loading: false})
        let habits = snapshot.val();

        let newState = [];
        for (let habit in habits) {
          newState.push({
            idkey: habit,
            id: habits[habit].habitId,
            habit: habits[habit].habitTitle,
            points: habits[habit].habitPoints,
            dates: habits[habit].dates
          });
        }
        this.setState({
          habits: newState
        })
      });
    }

    handleChange = e => {
      this.setState({ input: e.target.value });
    }

    addNewHabit = e => {

      const habitRef = firebase.database().ref('habits');
        habitRef.push({
          habitTitle: this.state.input,
          habitPoints: 0,
          dates: {}
        });

      }

      renderHabitList = habit => {
        let newDatesArr = [];
        let keyDate = ''
        for (let date in habit.dates){
          keyDate = date
          newDatesArr.push(habit.dates[date].pushDate)
        }

        return (<TaskRow title={habit.habit} dates={newDatesArr} oldDates={habit.dates} points={habit.points} newid={habit.idkey} onClick={this.handleHabit}></TaskRow>)
      };
      render(){
        const { loading } = this.state;

        return (
          <StyledCol>
          <link href="https://use.fontawesome.com/releases/v5.7.0/css/all.css" rel="stylesheet" />

          {loading && <Container style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
          <p>Wczytywanie...</p>
          <Spinner animation="border" role="status">
          <span className="sr-only">Wczytywanie...</span>
          </Spinner>
          </Container>
        }
        {!loading &&
          <Container style={{maxWidth: '900px'}}>

          <h2>Czerwiec</h2>
          <Row>
          {this.state.daysInMonth.map(number => (
            <Col className="calendar task" key={number} >{number}</Col>
            ))}
          </Row>

          {this.state.habits.map(this.renderHabitList)}


          <Row style={{marginTop: '20px', justifyContent: 'center'}}>
          <Col md="auto">
          <InputGroup className="mb-3">
          <FormControl ref="taskInput"
          placeholder="nazwa nawyku"
          aria-label="nazwa nawyku"
          aria-describedby="basic-addon2"
          onChange={this.handleChange}
          />
          <InputGroup.Append>
          <Button onClick={this.addNewHabit}>dodaj nowe zadanie</Button>
          </InputGroup.Append>
          </InputGroup>
          </Col>
          </Row>

          </Container>}

          </StyledCol>
          );
      }
    }

    export default Mycontainer;