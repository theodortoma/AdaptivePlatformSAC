import React, {Component} from 'react';
import history from '../history';
import request from "superagent";

export class Login extends Component {
    constructor(props) {
        super(props);
        this.object = this;
        this.state = {
            username: "",
            password: "",
            errorUsernameNotEntered: false,
            errorPasswordNotEntered: false,
            error: false
        }
    }

    checkUSerNameErrors() {
        if (this.state.username === "") {
            this.setState({errorUsernameNotEntered: true});
            this.state.error = true;
            return true
        } else {
            this.setState({errorUsernameNotEntered: false});
            return false;
        }
    }

    checkPasswordErrors() {
        if (this.state.password === "") {
            this.setState({errorPasswordNotEntered: true});
            this.state.error = true;
            return true
        } else {
            this.setState({errorPasswordNotEntered: false});
            return false;
        }
    }

    checkLocalErrors() {
        let err1 = this.checkUSerNameErrors();
        let err2 = this.checkPasswordErrors();
        return err1 || err2
    }

    handleLogin(object) {
        console.log(this.state);
        let err = this.checkLocalErrors();
        if (!err) {
            // request
            //     .post("http://192.168.100.8:4000/login")
            //     .send({username: this.state.username, password: this.state.password})
            //     .end(function (err, res) {
            //             console.log((JSON.parse(res.text)));
            //             // if ((JSON.parse(res.text)).error === 0) {
            //                 object.props.setActivePage("home");
            //                 object.props.setLoggedIn(true);
            //                 object.props.setUsername(object.state.username);
            //                 history.push({
            //                     pathname: '/home'
            //                 })
            //             // }
            //         }
            //     );
            object.props.setActivePage("home");
            object.props.setLoggedIn(true);
            object.props.setUsername(object.state.username);
            history.push({
                pathname: '/home'
            })
        }
    }

    render() {

        return (
            <div>
                <form className="form">
                    <div className="emptyBlock"/>

                    {
                        this.state.errorUsernameNotEntered
                            ?
                            <div className="error">
                                Username is empty
                            </div>
                            :
                            <div className="emptyBlock"/>
                    }
                    <div className="inputRow">
                        <input className="input" type="text" placeholder="Username"
                               onChange={username => {
                                   this.state.username = username.target.value;
                                   this.checkUSerNameErrors()
                               }}
                               onFocus={() => this.checkUSerNameErrors()}
                        />
                    </div>

                    {
                        this.state.errorPasswordNotEntered
                            ?
                            <div
                                className="error">
                                Password is empty
                            </div>
                            :
                            <div className="emptyBlock"/>
                    }
                    <div className="inputRow">
                        <input className="input" type={this.state.password === "" ? "text" : "password"}
                               placeholder="Password"
                               onChange={password1 => {
                                   this.state.password = password1.target.value;
                                   this.checkPasswordErrors()
                               }}
                               onFocus={() => this.checkPasswordErrors()}
                        />
                    </div>

                    <div className="submitButton"
                         onClick={() => this.handleLogin(this.object)}>
                        Login
                    </div>
                </form>
            </div>
        )
    }
}