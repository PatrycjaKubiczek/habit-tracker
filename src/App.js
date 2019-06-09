import React from 'react';
// import firebase from './firebase.js'
import './App.css';
import Mycontainer from './components/Mycontainer';

function App() {
  return (

    <div className="App">

      <header className="App-header">
        <h2 style={{marginBottom: '20px'}}>Habit tracker</h2>
        <Mycontainer />

        
      </header>
    </div>
  );
}

export default App;
