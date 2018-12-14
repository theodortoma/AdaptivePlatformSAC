import React, {Component} from 'react';
import "./HomeDestinations.css"
import {HomeDestinationComponent} from "./HomeDestinationComponent";

export class HomeDestinations extends Component {

    render() {
        let {destinations} = this.props;
        let groupedDestinations = destinations.filter((location, key) => {
                return key <= 4
            }
        ).map((destination, key) => {
            return [destination]
        });
        for (let i in [0, 1, 2, 3, 4]) {
            groupedDestinations[i].push(destinations[parseInt(i)+5]);
        }
        return (
            <div className="locationsContainer">
                {groupedDestinations.map((destinationRow, key) => {
                    return (
                        <div className="locationsContainerRow">
                            {
                                destinationRow.map((destination, key2) => {
                                    return (
                                        <HomeDestinationComponent
                                            destination={destination}
                                            setCurrentDestinationPage={this.props.setCurrentDestinationPage}
                                        />
                                    )
                                })
                            }
                        </div>
                    )
                })}
            </div>
        )
    }
}