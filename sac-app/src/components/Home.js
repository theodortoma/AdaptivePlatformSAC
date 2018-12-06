import React, {Component} from 'react';
import "./Input.css"
import headerImage from "../headerImage.jpg"
import {HomeLocations} from "./HomeLocations";
import image from "../square.jpg"

export class Home extends Component {
    constructor(props) {
        super(props);

    }

    render() {

        let {loggedIn, username} = this.props;
        let location = {
            image: image,
            location: {
                country: "Romania",
                city: "Bucharest",
            },
            attractions: [
                {
                    attraction: "Arcul de Triumf",
                    type: "history",
                    price: "0",
                    coin: "RON"
                }
            ],
            hotels: [
                {
                    name: "Ibis",
                    priceLow: "75",
                    priceHigh: "135",
                    coin: "RON"
                }
            ],
            food: [
                {
                    name: "Local food",
                    price: "25",
                    coin: "RON"
                }
            ]
        };
        return (
            <div style={{ position: "relative"}}>
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
                <HomeLocations
                    locations={
                        [
                            {
                                ...location,
                                key: 0
                            },
                            {
                                ...location,
                                key: 1
                            },
                            {
                                ...location,
                                key: 2
                            },
                            {
                                ...location,
                                key: 3
                            },
                            {
                                ...location,
                                key: 4
                            },
                            {
                                ...location,
                                key: 5
                            },
                            {
                                ...location,
                                key: 6
                            },
                            {
                                ...location,
                                key: 7
                            },
                            {
                                ...location,
                                key: 8
                            },
                            {
                                ...location,
                                key: 9
                            },
                        ]
                    }
                />
            </div>
        )
    }
}