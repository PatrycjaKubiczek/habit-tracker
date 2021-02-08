import React, { Component } from 'react';
import { Link } from "react-router-dom";
import * as ROUTES from './../../../constants/routes';
import { Navbar, Nav, Button } from 'react-bootstrap';
import firebase from 'firebase'

import { ContainerApp } from './../MainPageStyle.js'
class Navigation extends Component {
    render() {
        return (
            <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: '#373f51' }} variant="dark">
                <ContainerApp>
                    <Navbar.Brand href={process.env.PUBLIC_URL + '/'}>Habit tracker</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse>
                    <div className="displayFlexMobile">
                    <Nav>
                        <Link className="nav-link" to={ROUTES.LANDING}>Nawyki</Link>
                        <Link className="nav-link" to={ROUTES.STATS}>Statystyki</Link>
                    </Nav>
                    <Nav className="ml-auto nav-user">
                        <span className="nav-user--name">
                            <i className="far fa-user mr-2" ></i>
                            {firebase.auth().currentUser.displayName}</span>
                        <Button variant="link" className="nav-link" onClick={() => firebase.auth().signOut()}>Wyloguj</Button>
                    </Nav>
                    </div>
                    </Navbar.Collapse>
                    
                </ContainerApp>
            </Navbar>
        );
    }
}

export default Navigation;