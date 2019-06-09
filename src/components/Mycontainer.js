import React, { Component } from 'react';
import firebase from '../firebase.js'


import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
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
    }
  }

  componentWillMount(){
    const daysMonth = (N) => Array.from({length: N}, (v, k) => k+1); //TODO 
    this.setState({
      daysInMonth: daysMonth(30)
    })
  }

  componentDidMount(){

    const habitRef = firebase.database().ref('habits');
    habitRef.on('value', snapshot => {
      this.setState({loading: false})
      let habits = snapshot.val();

      let newState = [];
      // for (let date in habits[habit].dates) {
      //     let newStateDates = []
      //     // console.log(habits[habit].dates[date])
      //     newStateDates.push(habits[habit].dates[date].pushDate)
      //     console.log(newStateDates)
      //   }
      // forEach
      for (let habit in habits) {
        newState.push({
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
  };
  // cbangeDates = e => {
  //   console.log(habit)
  // }
  // handleHabit = (e) => {
  //   console.log(e.target.className)
  //  var pushedRef = firebase.database().ref('habits/' + this.habitId);
  //  pushedRef.on("value", snapshot =>{
  //   let habit = snapshot.val()   })

  // } 

  renderHabitList = habit => {
    let newDatesArr = [];
    let keyDate = ''
    for (let date in habit.dates){
      keyDate = date
      console.log(keyDate)
      newDatesArr.push(habit.dates[date].pushDate)
    }
    
    return (<TaskRow title={habit.habit} dates={newDatesArr} oldDates={habit.dates} points={habit.points} id={habit.id} onClick={this.handleHabit}></TaskRow>)
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


      <Row style={{marginTop: '20px'}}>
      <Col style={{flex: '0 0 100%'}}>
      <Button style={{marginBottom: 0}}>+ Dodaj kolejne zadanie</Button>
      </Col>
      </Row>

      </Container>}
      
      </StyledCol>
      );
  }
}

export default Mycontainer;