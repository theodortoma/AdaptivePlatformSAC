import React, {Component} from 'react';
import "./Input.css"
import headerImage from "../headerImage.jpg"
import {HomeDestinations} from "./HomeDestinations";

export class PlanningResultComponent extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        let {loggedIn, username, destinations} = this.props;

        return (
            <div style={{ position: "relative"}}>
                <img style={{width: "100%", height: "auto", margin: "auto", display: "flex"}} className="homeImage"
                     src={headerImage}
                />
                <div style={{
                    width: "800px",
                    margin: "auto",
                    paddingTop: "20px",
                    fontWeight: "bold",
                    fontSize: "25px",
                }}>
                    Here are your search results:
                </div>
                <HomeDestinations
                    destinations={destinations}
                    setCurrentDestinationPage={this.props.setCurrentDestinationPage}
                />
            </div>
        )
    }
}