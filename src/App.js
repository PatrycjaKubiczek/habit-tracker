import React, { Component } from 'react';

import './App.css';
import Mycontainer from './components/Mycontainer';
import { StyledFirebaseAuth } from 'react-firebaseui'
import firebase from 'firebase'
import firebaseui from 'firebaseui'

const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	credentialHelper: firebaseui.auth.CredentialHelper.NONE,
	// credentialHelper: firebase.auth.CredentialHelper.NONE,
	// We will display Google and Facebook as auth providers.
	signInOptions: [
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
	],
	callbacks: {
		// Avoid redirects after sign-in.
		signInSuccessWithAuthResult: () => false
	}
};

class App extends Component {
	state = {
		isSignedIn: false // Local signed-in state.
	};
	componentDidMount() {
		this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
			(user) => this.setState({ isSignedIn: !!user })
		);
	}

	// Make sure we un-register Firebase observers when the component unmounts.
	componentWillUnmount() {
		this.unregisterAuthObserver();
	}

	render() {

		if (!this.state.isSignedIn) {
			return (<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />)
		}

		return (

			<div className="App">

				<main>
					<Mycontainer user={firebase.auth().currentUser.displayName} />
				</main>
			</div>
		);
	}
}
// function App() {
// 	const state = {
// 		isSignedIn: false // Local signed-in state.
// 	}

// 	const uiConfig = {
// 		// Popup signin flow rather than redirect flow.
// 		signInFlow: 'popup',
// 		// We will display Google and Facebook as auth providers.
// 		signInOptions: [
// 			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
// 			firebase.auth.FacebookAuthProvider.PROVIDER_ID
// 		],
// 		callbacks: {
// 			// Avoid redirects after sign-in.
// 			signInSuccessWithAuthResult: () => false
// 		}
// 	};

// 	if (this.state.isSignedIn) {
// 		return (<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />)
// 	}

// 	return (

// 		<div className="App">

// 			{/* <header className="App-header">
// 				<h2 style={{ margin: '20px 0' }}>Habit tracker</h2>

// 			</header> */}

// 			<main>
// 				<Mycontainer />
// 			</main>
// 		</div>
// 	);
// }

export default App;
