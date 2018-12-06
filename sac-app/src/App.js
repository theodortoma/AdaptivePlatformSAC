import React, {Component} from 'react';
import './App.css';
import {Header} from "./components/Header";
import {Route, Switch} from "react-router-dom";
import {Home} from "./components/Home";
import {Login} from "./components/Login";
import {SignUp} from "./components/SignUp";
import {SignUpConfirmation} from "./components/SignUpConfirmation";
import {Profile} from "./components/Profile";
import history from "./history"

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: "home",
            loggedIn: false,
            username: "",
            userId: "",
        }
    }

    setActivePage(page) {
        this.setState({activePage: page})
    }

    setLoggedIn(loggedIn) {
        this.setState({loggedIn: loggedIn})
    }

    setUsername(username) {
        this.setState({username: username})
    }

    logout() {
        this.setState({
            userID: "",
            loggedIn: false,
            username: "",
            activePage: "home"
        })
        history.push("/home")
    }

    render() {
        return (
            <div>
                <Header
                    activePage={this.state.activePage}
                    loggedIn={this.state.loggedIn}
                    username={this.state.username}
                    setActivePage={(page) => this.setActivePage(page)}
                    logout={() => this.logout()}
                />
                <Switch>
                    <Route path={"/"} exact render={() =>
                        <Home
                            setActivePage={(page) => this.setActivePage(page)}
                            username={this.state.username}
                            loggedIn={this.state.loggedIn}
                        />}
                    />
                    <Route path={"/home"} render={() =>
                        <Home
                            setActivePage={(page) => this.setActivePage(page)}
                            username={this.state.username}
                            loggedIn={this.state.loggedIn}
                        />}
                    />
                    <Route path={"/login"} render={() =>
                        <Login
                            setActivePage={(page) => this.setActivePage(page)}
                            setLoggedIn={(loggedIn) => this.setLoggedIn(loggedIn)}
                            setUsername={(username) => this.setUsername(username)}
                        />}
                    />
                    <Route path={"/signUp"} render={() =>
                        <SignUp
                            setActivePage={(page) => this.setActivePage(page)}
                        />}
                    />
                    <Route path={"/signUpConfirmation"} render={() =>
                        <SignUpConfirmation
                            setActivePage={(page) => this.setActivePage(page)}
                        />}
                    />
                    <Route path={"/profile"} render={() =>
                        <Profile
                            username={this.state.username}
                        />}
                    />
                </Switch>
            </div>
        )
    }
}

export default App;
