import React, {Component} from 'react';
import "./HomeLocation.css"
import {HomeLocationComponent} from "./HomeLocationComponent";

export class HomeLocations extends Component {

    render() {
        let {locations} = this.props;
        let groupedLocations = locations.filter((location, key) => {
                return key > 4
            }
        ).map((location, key) => {
            return [location]
        });
        for (let i in [0, 1, 2, 3, 4]) {
            groupedLocations[i].push(locations[i]);
        }
        console.log("locations: ", groupedLocations);

        return (
            <div className="locationsContainer">
                {groupedLocations.map((locationsRow, key) => {
                    return (
                        <div className="locationsContainerRow">
                            {
                                locationsRow.map((location, key2) => {
                                    return (
                                        <HomeLocationComponent
                                            location={location}
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