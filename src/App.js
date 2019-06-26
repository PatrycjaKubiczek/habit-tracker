import React, { Component } from 'react';

import './App.css';
import MainPage from './components/MainPage/MainPage';


function App() {


	return (

		<div className="App">

			{/* <header className="App-header">
				<h2 style={{ margin: '20px 0' }}>Habit tracker</h2>

			</header> */}

			<main>
				<MainPage />
			</main>
		</div>
	);
}

export default App;
