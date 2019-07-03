import React, { Component } from 'react';

import './App.css';
import MainPage from './components/MainView/MainPage';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase'
import firebaseui from 'firebaseui'


class App extends Component {
	// The component's Local state.
	state = {
		isSignedIn: false, // Local signed-in state.
	};

	uiConfig = {
		credentialHelper: firebaseui.auth.CredentialHelper.NONE,
		// Popup signin flow rather than redirect flow.
		signInFlow: 'popup',
		// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
		// signInSuccessUrl: '/signedIn',
		// We will display Google and Facebook as auth providers.
		signInOptions: [
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,


		],
		callbacks: {
			// Avoid redirects after sign-in.
			signInSuccessWithAuthResult: () => false
			
		}
	};
	writeUserData = (user) => {
		firebase.database().ref('users/' + user.uid).set({
			username: user.displayName,
			email: user.email
		});
	}


	componentDidMount() {
		this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
			(user) => {
				this.setState({ isSignedIn: !!user })
				this.writeUserData(user)
				// this.setHabits()
			}
		);
	}
	setHabits = () => {
		let uid = firebase.auth().currentUser.uid;
		
		const habitRef = firebase.database().ref('/users/' + uid + '/habits')
		
		habitRef.on('value', snapshot => {
			
			let habits = snapshot.val(); // mt
			let newState = [];
			for (let habit in habits) {
				newState.push({
					idkey: habit,
					title: habits[habit].habitTitle,
					points: habits[habit].habitPoints,
					dates: habits[habit].dates,
				});
			}
			this.setState({
				habits: newState,
				loading: false
			})
			console.log(this.state.habits)
		  });
	}


	// Make sure we un-register Firebase observers when the component unmounts.
	componentWillUnmount() {
		this.unregisterAuthObserver();
	}

	render() {
		
		if (!this.state.isSignedIn) {
			return (
				<div className="firebase-wrap">

					{/* <p>Please sign-in:</p> */}
					<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
				</div>
			);
		}
		return (

			<div className="App">
				<main>
					<MainPage habits={this.state.habits}/>
				</main>
			</div>
		);
	}
}

export default App;
