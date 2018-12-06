import React, {Component} from 'react';
import {Header} from "./Header";
import {Home} from "./Home";
import {BrowserRouter, Route} from "react-router-dom";
import {Login} from "./Login";

export class Root extends Component {
    render() {
        return (
            <div className="containter">
                <Header/>
                <BrowserRouter>
                    <div>
                        <Route path={"/"} exact component={Home}/>
                        <Route path={"/user"} component={Login}/>
                        <Route path={"/home"} component={Home}/>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}