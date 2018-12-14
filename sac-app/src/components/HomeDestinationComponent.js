import React, {Component} from 'react';
import "./HomeDestinations.css"
import foodIcon from "../foodIcon.jpg"
import attractionsIcon from "../attractionsIcon.jpg"
import hotelsIcon from "../hotelsIcon.png"
import detailsIcon from "../detailsIcon.png"
import {mapNameToImage} from "../images"
export class HomeDestinationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            index: 0,
            loop: false
        };
        let image = "../cityImages/Bucharest";

        this.baseImage = {
            key: "baseImage",
            component: () => {
                console.log(this.props.destination.city);
                return <img className="locationImage" src={mapNameToImage(this.props.destination.city)} alt={"Image not found"}/>
            }
        };

        this.components = [
            {
                key: "description",
                component: () => {
                    return (
                        <div className="detailsContainer">
                            <img className="iconImage" src={detailsIcon}/>
                            <div className="detailsHeader" style={{fontSize: "20px"}}>City: {this.props.destination.city}</div>
                            <div className="detailsHeader">Country: {this.props.destination.country}</div>
                        </div>
                    )
                }
            },
            {
                key: "attractions",
                component: () => {
                    return (
                        <div className="detailsContainer">
                            <img className="iconImage" src={attractionsIcon}/>
                            <div className="detailsHeader">{this.props.destination.pois[0].name}</div>
                            <div className="detailsText">Type: {this.props.destination.pois[0].type}</div>
                            <div className="detailsText">Price: {this.props.destination.pois[0].price} RON</div>
                        </div>
                    )
                }
            },
            {
                key: "hotels",
                component: () => {
                    return (
                        <div className="detailsContainer">
                            <img className="iconImage" src={hotelsIcon}/>
                            <div className="detailsHeader">{this.props.destination.hotels[0].name}</div>
                            <div
                                className="detailsText">Price: {this.props.destination.hotels[0].price} RON
                            </div>
                        </div>
                    )
                }
            },
            {
                key: "food",
                component: () => {
                    return (
                        <div className="detailsContainer">
                            <img className="iconImage" src={foodIcon}/>
                            <div className="detailsHeader">{this.props.destination.restaurants[0].name}</div>
                            <div
                                className="detailsText">Cuisine: {this.props.destination.restaurants[0].cuisine.filter((value, index) => {
                                    return index < 4
                            }).map((value, index) => {
                                    return value + " | "
                            })}</div>
                        </div>
                    )
                }
            }
        ]
    }

    tick() {
        if (this.state.loop) {
            this.setState(prevState => ({
                seconds: prevState.seconds + 1
            }));
            if (this.state.seconds % 2 === 0) {
                this.setState({index: this.state.index + 1})
            }
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    overComponent() {
        this.setState({loop: true});
    }

    leaveComponent() {
        this.setState({
            loop: false,
            index: 0,
            seconds: 0
        });
    }

    goToLocationPage() {
        this.props.setCurrentDestinationPage(this.props.destination)
    }

    render() {
        return (
            <div
                className="itemContainer"
                onMouseOver={() => this.overComponent()}
                onMouseLeave={() => this.leaveComponent()}
                onClick={() => this.goToLocationPage()}
            >
                {this.state.loop
                    ?
                    this.components[this.state.index % 4].component()
                    // this.components[0].component()
                    :
                    this.baseImage.component()
                }
            </div>
        )
    }
}