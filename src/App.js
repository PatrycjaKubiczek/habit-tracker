import React, { Component } from 'react';

import './App.css';
import MainPage from './components/MainView/MainPage';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase'
import firebaseui from 'firebaseui'
import Loader from './components/MainView/Loader/Loader.js'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			user: null,
			isSignedIn: false, // Local signed-in state.
			loading: true
		}
		this.uiConfig = {
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
				signInSuccessWithAuthResult: (authResult) => {
					this.writeUserData()
					return false

				},

			}
		};
	}

	writeUserData = (user) => {
		this.setState({ user: user })
		firebase.database().ref('users/' + user.uid).set({
			username: user.displayName,
			email: user.email
		});
	}
	componentWillMount() {

		this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
			(authUser) => {
				if (authUser) {

					this.setState({ isSignedIn: !!authUser })
					this.setState({ loading: false })
					// this.writeUserData(authUser)
					// this.setHabits()
				} else {
					this.setState({ isSignedIn: false })
					this.setState({ loading: false })

				}

			}
		);
	}

	componentDidMount() {

	}


	componentWillUnmount() {
		this.unregisterAuthObserver();
	}

	render() {
		const { loading } = this.state;
		if (!this.state.isSignedIn) {
			return (
				<>
					{loading ? <Loader /> : 
					<div className="firebase-wrap">
						<StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={firebase.auth()} />
					</div>
					}
				</>
			);
		}
		return (

			<div className="App">
				<main>
					<MainPage />
				</main>
			</div>
		);

	}
}

export default App;
