import React, {Component} from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import home from "../sweet-home-icon.jpg"
import {DropDownMenu} from "./DropDownMenu";
import history from "../history";
import userImage from "../user.png"

export class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            activeButton: "home"
        };
        this.menuItems = [
            {
                key: "block",
                component: () => {
                    return (
                        <div className="block"/>
                    )
                }
            },
            {
                key: "home",
                component: (activeButton, username, loggedIn) => {
                    return (
                        <Link className={activeButton === "home" ? "activeMenuButton" : "menuButton"}
                              onClick={() => {
                                  this.props.setActivePage("home");
                              }}
                              to="/home">
                            <img className="homeImage" src={home}/>
                            Home
                        </Link>)
                }
            },
            {
                key: "login",
                component: (activeButton, username, loggedIn) => {
                    return (
                        !loggedIn
                            ?
                            <Link className={activeButton === "login" ? "activeMenuButton" : "menuButton"}
                                  onClick={() => {
                                      this.props.setActivePage("login")
                                  }}
                                  to="/login">Login
                            </Link>
                            :
                            null)
                }
            },
            {
                key: "signUp",
                component: (activeButton, username, loggedIn) => {
                    return (
                        !loggedIn
                            ?
                            <Link className={activeButton === "signUp" ? "activeMenuButton" : "menuButton"}
                                  onClick={() => {
                                      this.props.setActivePage("signUp")
                                  }}
                                  to="/signUp">Sign Up
                            </Link>
                            :
                            null
                    )
                }
            },
            {
                key: "planning",
                component: (activeButton, username, loggedIn) => {
                    return (
                        <Link className={activeButton === "planning" ? "activeMenuButton" : "menuButton"}
                              onClick={() => {
                                  this.props.setActivePage("planning")
                              }}
                              to="/planning">Plan a Trip
                        </Link>

                    )
                }
            },
            {
                key: "rightSide",
                component: (activeButton, username, loggedIn) => {
                    let options = [
                        {
                            title: "Profile",
                            onClick: () => this.goToProfile()
                        },
                        {
                            title: "Logout",
                            onClick: () => this.props.logout()
                        }
                    ];
                    return (
                        loggedIn
                            ?
                            <div className={"rightContainer"}>
                                <img className="userImage" src={userImage}/>
                                <div className={"userName"}>
                                    <i>{username}</i>
                                </div>

                                <DropDownMenu
                                    title="User"
                                    active={activeButton === "menu"}
                                    options={options}
                                />
                            </div>
                            :
                            null
                    )
                }
            }
        ]
    }

    goToProfile() {
        console.log("ASD")
        history.push({
            pathname: '/profile'
        })
    }

    render() {
        let activeButton = this.props.activePage,
            username = this.props.username,
            loggedIn = this.props.loggedIn;

        return (
            <div className="headerContainer">
                {this.menuItems.map((menuItem, key) => {
                    return menuItem.component(activeButton, username, loggedIn)
                })}
            </div>
        )
    }
}