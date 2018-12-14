import React, {Component} from 'react';
import "./Input.css"
import Select from 'react-select';
import request from "superagent";
import history from "../history";

export class PlanningComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationArea:"-",
            mainInterest:"-",
            hotelMinPrice:"-",
            hotelMaxPrice:"-",
            mainCuisine:[],
        };

        this.object = this;

        this.areaTypes = [
            "-",
            "Sea",
            "Island",
            "Urban",
            "Ocean",
            "Mountain",
            "Historic",
        ];
        this.hotelMinPrices = [
            "-", "25 RON", "50 RON", "100 RON", "200 RON", "500 RON"
        ];
        this.hotelMaxPrices = [
            "-", "25 RON", "50 RON", "100 RON", "200 RON", "500 RON"
        ];
        this.mainInterests = [
            "-",
            "transportation",
            "landmark",
            "nature",
            "park",
            "outdoor",
            "shopping",
            "museum",
            "casino",
            "concert",
        ];
        this.mainCuisines = [
            {label: " Abu Dhabi", value: " Abu Dhabi"},
            {label: " Bar &amp; Store", value: " Bar &amp; Store"},
            {label: " Cafe &amp; Restaurant", value: " Cafe &amp; Restaurant"},
            {label: " Chophouse &amp; Bar", value: " Chophouse &amp; Bar"},
            {label: " Coffee &amp; Resto", value: " Coffee &amp; Resto"},
            {label: " Fresh Pasta To Go", value: " Fresh Pasta To Go"},
            {label: " Hong Kong", value: " Hong Kong"},
            {label: " Lenkom", value: " Lenkom"},
            {label: " Lounge And Terrace Doha", value: " Lounge And Terrace Doha"},
            {label: " Macau", value: " Macau"},
            {label: " Nova Tasca", value: " Nova Tasca"},
            {label: " Opera Ristorante", value: " Opera Ristorante"},
            {label: " Shenzhen", value: " Shenzhen"},
            {label: " Shinjuku East Entrance", value: " Shinjuku East Entrance"},
            {label: " Yas Mall", value: " Yas Mall"},
            {label: "African", value: "African"},
            {label: "American", value: "American"},
            {label: "Arabic", value: "Arabic"},
            {label: "Argentinean", value: "Argentinean"},
            {label: "Asian", value: "Asian"},
            {label: "Barbecue", value: "Barbecue"},
            {label: "British", value: "British"},
            {label: "Burmese", value: "Burmese"},
            {label: "Cafe", value: "Cafe"},
            {label: "Cajun &amp; Creole", value: "Cajun &amp; Creole"},
            {label: "Caribbean", value: "Caribbean"},
            {label: "Chinese", value: "Chinese"},
            {label: "Cuban", value: "Cuban"},
            {label: "Deli", value: "Deli"},
            {label: "Eastern European", value: "Eastern European"},
            {label: "Ethiopian", value: "Ethiopian"},
            {label: "European", value: "European"},
            {label: "Fast Food", value: "Fast Food"},
            {label: "Filipino", value: "Filipino"},
            {label: "French", value: "French"},
            {label: "Fusion", value: "Fusion"},
            {label: "German", value: "German"},
            {label: "Gluten Free Options", value: "Gluten Free Options"},
            {label: "Greek", value: "Greek"},
            {label: "Halal", value: "Halal"},
            {label: "Hawaiian", value: "Hawaiian"},
            {label: "Healthy", value: "Healthy"},
            {label: "Hungarian", value: "Hungarian"},
            {label: "Indian", value: "Indian"},
            {label: "Indonesian", value: "Indonesian"},
            {label: "International", value: "International"},
            {label: "Irish", value: "Irish"},
            {label: "Italian", value: "Italian"},
            {label: "Japanese", value: "Japanese"},
            {label: "Korean", value: "Korean"},
            {label: "Kosher", value: "Kosher"},
            {label: "Latin", value: "Latin"},
            {label: "Lebanese", value: "Lebanese"},
            {label: "Malaysian", value: "Malaysian"},
            {label: "Mediterranean", value: "Mediterranean"},
            {label: "Mexican", value: "Mexican"},
            {label: "Middle Eastern", value: "Middle Eastern"},
            {label: "Moroccan", value: "Moroccan"},
            {label: "Pakistani", value: "Pakistani"},
            {label: "Persian", value: "Persian"},
            {label: "Peruvian", value: "Peruvian"},
            {label: "Pizza", value: "Pizza"},
            {label: "Polish", value: "Polish"},
            {label: "Portuguese", value: "Portuguese"},
            {label: "Russian", value: "Russian"},
            {label: "Seafood", value: "Seafood"},
            {label: "Soups", value: "Soups"},
            {label: "South American", value: "South American"},
            {label: "Spanish", value: "Spanish"},
            {label: "Steakhouse", value: "Steakhouse"},
            {label: "Street Food", value: "Street Food"},
            {label: "Sushi", value: "Sushi"},
            {label: "Taiwanese", value: "Taiwanese"},
            {label: "Thai", value: "Thai"},
            {label: "Turkish", value: "Turkish"},
            {label: "Vegan Options", value: "Vegan Options"},
            {label: "Vegetarian Friendly", value: "Vegetarian Friendly"},
            {label: "Venezuelan", value: "Venezuelan"},
            {label: "Vietnamese", value: "Vietnamese"},
        ];
    }

    handlePlanning(object) {
        console.log(this.state);
        alert("Planning sent")
        request
            .post("http://172.19.10.241:4000/planning")
            .send({
                area: this.state.locationArea,
                mainInterest: this.state.mainInterest,
                hotelMinPrice: this.state.hotelMinPrice,
                hotelMaxPrice: this.state.hotelMaxPrice,
                mainCuisine: this.state.mainCuisine.map((cuisine, key) => {
                    return cuisine.value
                })
            })
            .end(function (err, res) {
                    if (res === undefined) {
                        history.push({
                            pathname: '/planningResult'
                        });
                        return
                    }
                    console.log((JSON.parse(res.text)));
                    object.props.setLocations((JSON.parse(res.text)).results);
                    history.push({
                        pathname: '/planningResult'
                    })
                }
            );
    }

    render() {
        //let {loggedIn, username} = this.props;
        let MakeItem = function (X) {
            return <option key={X}>{X}</option>;
        };

        return (

            <div className="form">
                <div className="formText">
                    Select the area type
                </div>
                <select className="input"
                        onChange={locationArea => {
                            this.state.locationArea = locationArea.target.value;
                        }}>
                    {this.areaTypes.map(MakeItem)}
                </select>
                <div className="formText">
                    Select your main interest type
                </div>
                <select className="input"
                        onChange={mainInterest => {
                            this.state.mainInterest = mainInterest.target.value;
                        }}>
                    {this.mainInterests.map(MakeItem)}
                </select>
                <div className="formText">
                    Select a minimum Hotel price
                </div>
                <select className="input"
                        onChange={hotelMinPrice => {
                            this.state.hotelMinPrice = hotelMinPrice.target.value;
                        }}>
                    {this.hotelMinPrices.map(MakeItem)}
                </select>
                <div className="formText">
                    Select a maximum Hotel price
                </div>
                <select className="input"
                        onChange={hotelMaxPrice => {
                            this.state.hotelMaxPrice = hotelMaxPrice.target.value;
                        }}>
                    {this.hotelMaxPrices.map(MakeItem)}
                </select>
                <div className="formText">
                    Select your main cuisine interest
                </div>
                <Select
                    className="multipleSelect"
                    options={this.mainCuisines}
                    isMulti={true}
                    onChange={(selectedOption) => {
                        this.state.mainCuisine = selectedOption
                    }}
                />
                <div className="submitButton"
                     onClick={() => this.handlePlanning(this.object)}>
                    Search for a destination
                </div>
            </div>
        )
    }
}