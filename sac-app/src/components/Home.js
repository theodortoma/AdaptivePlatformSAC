import React, {Component} from 'react';
import "./Input.css"
import headerImage from "../headerImage.jpg"
import {HomeDestinations} from "./HomeDestinations";

export class Home extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        let destinations = this.props.destinations;
        let loggedIn = this.props.loggedIn;
        let lastDestination = this.props.lastDestination;
        console.log(lastDestination);
        return (
            <div style={{position: "relative"}}>
                {/*<div style={{width: "100%", height: "15px"}}/>*/}
                <img style={{width: "100%", height: "auto", margin: "auto", display: "flex"}} className="homeImage"
                     src={headerImage}
                />
                {!loggedIn
                    ?
                    <div className="headerMessage">
                        <div className="headerText">Plan your next trip!</div>
                        {/*<div className="headerText">Here are some of our best trips!</div>*/}
                    </div>
                    :
                    null
                }
                {
                    !lastDestination.city
                        ?
                        <div>
                            These are our most visited location
                        </div>
                        :
                        <div>
                            These are the most similar destinations with <b>{lastDestination.city}</b>
                        </div>
                }
                <HomeDestinations
                    destinations={destinations}
                    setCurrentDestinationPage={this.props.setCurrentDestinationPage}
                />
            </div>
        )
    }
}