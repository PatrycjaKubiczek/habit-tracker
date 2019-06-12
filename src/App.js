import React from 'react';
// import firebase from './firebase.js'
import './App.css';
import Mycontainer from './components/Mycontainer';

function App() {
	return (

		<div className="App">

		<header className="App-header">
		<h2 style={{margin: '20px 0'}}>Habit tracker</h2>
		</header>
		<main>
		<Mycontainer />
		</main>
		</div>
		);
}

export default App;
