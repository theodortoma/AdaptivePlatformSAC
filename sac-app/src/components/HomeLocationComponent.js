import React, {Component} from 'react';
import "./HomeLocation.css"
import foodIcon from "../foodIcon.jpg"
import attractionsIcon from "../attractionsIcon.jpg"
import hotelsIcon from "../hotelsIcon.png"
import detailsIcon from "../detailsIcon.png"

export class HomeLocationComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
            index: 0,
            loop: false
        };
        this.baseImage = {
            key: "baseImage",
            component: () => {
                return <img className="locationImage" src={this.props.location.image}/>
            }
        };

        this.components = [
            {
                key: "description",
                component: () => {
                    return (
                        <div className="detailsContainer">
                            <img className="iconImage" src={detailsIcon}/>
                            <div className="detailsHeader">Country: {this.props.location.location.country}</div>
                            <div className="detailsHeader">City: {this.props.location.location.city}</div>
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
                            <div className="detailsHeader">{this.props.location.attractions[0].attraction}</div>
                            <div className="detailsText">Type: {this.props.location.attractions[0].type}</div>
                            <div className="detailsText">Price: {this.props.location.attractions[0].price} {this.props.location.attractions[0].coin}</div>
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
                            <div className="detailsHeader">{this.props.location.hotels[0].name}</div>
                            <div className="detailsText">Price: {this.props.location.hotels[0].priceLow} {this.props.location.hotels[0].coin}
                                        - {this.props.location.hotels[0].priceHigh} {this.props.location.hotels[0].coin}
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
                            <div className="detailsHeader">{this.props.location.food[0].name}</div>
                            <div className="detailsText">Price: {this.props.location.food[0].price} {this.props.location.food[0].coin}</div>
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

    render() {
        return (
            <div
                className="itemContainer"
                onMouseOver={() => this.overComponent()}
                onMouseLeave={() => this.leaveComponent()}
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