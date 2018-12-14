import React, {Component} from 'react';
import "./HomeDestinations.css"
import "./DestinationPage.css"
import {mapNameToImage} from "../images";
import request from "superagent";
import history from "../history";

export class DestinationPageComponent extends Component {
    constructor(props) {
        super(props)
        this.object = this
    }

    handleGo(object) {
        request
            .post("http://172.19.10.241:4000/user_locations")
            .send({username: this.props.username, id_destination: this.props.destination.id})
            .end(function (err, res) {
                    console.log(res.text);
                    object.props.setActivePage("home");
                    object.props.setLastDestination(object.props.destination);
                    object.props.setLocations((JSON.parse(res.text).results));
                    history.push({
                        pathname: '/home'
                    })

                }
            );
    }

    render() {
        let {destination, loggedIn} = this.props;
        console.log(destination);
        return (
            <div className="destinationContainer">
                <div className="destinationHeader">
                    <img className="destinationImage"
                         src={mapNameToImage(destination.city)}
                    />

                    <div className="destinationTitleContainer">
                        <div className="destinationTitle">
                            {destination.city}
                        </div>
                        <div className="destinationTitle" style={{fontWeight: "400"}}>
                            - {destination.country} -
                        </div>
                        {loggedIn
                            ?
                            <div className="submitButton"
                                 onClick={() => this.handleGo(this.object)}>
                                Go!
                            </div>
                            :
                            null
                        }
                    </div>
                </div>
                <div className="destinationDetails">
                    <div className="destinationDetailsTitle">
                        Points of interest
                    </div>
                    <div className="destinationDetailsContent">
                        {
                            destination.pois.map((poi, index) => {
                                return (
                                    <div className="destinationDetailsText">
                                        <b>{poi.name}</b> - Type: {poi.type} | Price: {poi.price}
                                    </div>
                                )
                            })
                        }
                        <div style={{height: "20px"}}/>
                    </div>

                    <div className="destinationDetailsTitle">
                        Local Restaurants
                    </div>
                    <div className="destinationDetailsContent">
                        {
                            destination.restaurants.map((restaurant, index) => {
                                return (
                                    <div className="destinationDetailsText">
                                        <b>{restaurant.name}</b> - Cuisine: {restaurant.cuisine.map((name, index) => {
                                        return name + " | "
                                    })}
                                    </div>
                                )
                            })
                        }
                        <div style={{height: "20px"}}/>
                    </div>

                    <div className="destinationDetailsTitle">
                        Local Hotels
                    </div>
                    <div className="destinationDetailsContent">
                        {
                            destination.hotels.map((hotel, index) => {
                                return (
                                    <div className="destinationDetailsText">
                                        <b>{hotel.name}</b> - Price: {hotel.price}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
}