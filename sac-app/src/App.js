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
import {DestinationPageComponent} from "./components/DestinationPageComponent";
import {PlanningComponent} from "./components/PlanningComponent";
import {PlanningResultComponent} from "./components/PlanningResultComponent";
import request from "superagent";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activePage: "home",
            loggedIn: false,
            username: "",
            userId: "",
            currentDestination: {},
            lastDestination: {},
            destinations: [],
            searchDestinations: [],
        };

        let destination = {
            area: ["Historic", "Mountain"],
            city: "Sofia",
            country: "Bulgaria",
            hotels: [
                {
                    name: "R43 Boutique Hotel", price: "74"
                },
                {
                    name: "Rosslyn Thracia Hotel", price: "42"
                }
            ],
            id: 35,
            lat: "42.5",
            long: "23.33",
            pois: [
                {
                    name: "Vitosha Mountain", price: "184", type: "outdoor",
                },
                {
                    name: "Muzeiko", price: "0", type: "museum"
                }
            ],
            restaurants: [
                {
                    cuisine: ["International", "Burger"], name: "Daro",
                },
                {
                    cuisine: ["International", "Burger"], name: "Skaptobara",
                }
            ]
        };
        let destinations =
            [
                {
                    ...destination,
                    key: 0
                },
                {
                    ...destination,
                    key: 1
                },
                {
                    ...destination,
                    key: 2
                },
                {
                    ...destination,
                    key: 3
                },
                {
                    ...destination,
                    key: 4
                },
                {
                    ...destination,
                    key: 5
                },
                {
                    ...destination,
                    key: 6
                },
                {
                    ...destination,
                    key: 7
                },
                {
                    ...destination,
                    key: 8
                },
                {
                    ...destination,
                    key: 9
                },
            ];
        this.state.destinations = destinations;
        this.state.searchDestinations = destinations;
        let object = this;
        request
            .post("http://172.19.10.241:4000/get_most_visited_locations")
            .send({})
            .end(function (err, res) {
                    console.log(res);
                    console.log((JSON.parse(res.text).results));
                    object.setState( {destinations: (JSON.parse(res.text)).results});
                }
            );
    }

    setLastDestination(destination) {
        this.setState({lastDestination: destination})
    }
    setLocations(locations) {
        this.setState({destinations: locations})
    }

    setSearchDestinations(destinations) {
        this.setState({searchDestinations: destinations})
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

    setCurrentDestinationPage(destination) {
        this.setState({currentDestination: destination});
        history.push("/destination")
    }

    logout() {
        this.setState({
            userID: "",
            loggedIn: false,
            username: "",
            activePage: "home",
            currentDestination: {},
        });
        
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
                            setCurrentDestinationPage={(destination) => this.setCurrentDestinationPage(destination)}
                            username={this.state.username}
                            loggedIn={this.state.loggedIn}
                            destinations={this.state.destinations}
                            lastDestination={this.state.lastDestination}
                        />}
                    />
                    <Route path={"/home"} render={() =>
                        <Home
                            setActivePage={(page) => this.setActivePage(page)}
                            setCurrentDestinationPage={(destination) => this.setCurrentDestinationPage(destination)}
                            username={this.state.username}
                            loggedIn={this.state.loggedIn}
                            destinations={this.state.destinations}
                            lastDestination={this.state.lastDestination}
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
                    <Route path={"/destination"} render={() =>
                        <DestinationPageComponent
                            setLocations={(locations) => this.setLocations(locations)}
                            setActivePage={(page) => this.setActivePage(page)}
                            setLastDestination={(destination) => this.setLastDestination(destination)}
                            destination={this.state.currentDestination}
                            loggedIn={this.state.loggedIn}
                            username={this.state.username}
                        />}
                    />
                    <Route path={"/planning"} render={() =>
                        <PlanningComponent
                            setLocations={(locations) => this.setSearchDestinations(locations)}
                        />}
                    />
                    <Route path={"/planningResult"} render={() =>
                        <PlanningResultComponent
                            setActivePage={(page) => this.setActivePage(page)}
                            setCurrentDestinationPage={(destination) => this.setCurrentDestinationPage(destination)}
                            username={this.state.username}
                            loggedIn={this.state.loggedIn}
                            destinations={this.state.searchDestinations}
                        />}
                    />
                </Switch>
            </div>
        )
    }
}

export default App;
