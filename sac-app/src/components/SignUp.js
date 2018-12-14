import React, {Component} from 'react';
import request from "superagent";

export class SignUp extends Component{
    constructor(props) {
        super(props);
        this.object = this;
        this.months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
        this.days = Array.apply(null, {length: 31}).map(Number.call, Number).map((x) => x + 1)
        this.years = Array.apply(null, {length: 100}).map(Number.call, Number).map((x) => x + 1918)
        this.state = {
            username: "",
            password1: "",
            password2: "",
            email: "",
            day: "",
            month: "",
            year: "",
            errorPasswordsDontMatch: false,
            errorPasswordTooShort: false,
            errorInvalidEmail: false,
            errorUsernameNotEntered: false,
            errorPassword1NotEntered: false,
            errorPassword2NotEntered: false,
            errorEmailNotEntered: false,
            errorBirthDateNotEntered: false,
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
            return false
        }
    }

    checkPassword1Errors() {
        if (this.state.password1 === "") {
            this.setState({errorPassword1NotEntered: true});
            this.state.error = true;
            return true
        } else {
            this.setState({errorPassword1NotEntered: false});
        }

        if (this.state.password1.length <= 4) {
            this.setState({errorPasswordTooShort: true});
            this.state.error = true;
            return true
        } else {
            this.setState({errorPasswordTooShort: false});
            return false
        }
    }

    checkPassword2Errors() {
        if (this.state.password2 === "") {
            this.setState({errorPassword2NotEntered: true});
            this.state.error = true;
            return true
        } else {
            this.setState({errorPassword2NotEntered: false});
        }
        if (this.state.password1 !== this.state.password2) {
            this.setState({errorPasswordsDontMatch: true});
            this.state.error = true;
            return true
        } else {
            this.setState({errorPasswordsDontMatch: false});
            return false
        }
    }

    checkEmailErrors() {
        if (this.state.email === "") {
            this.setState({errorEmailNotEntered: true});
            this.state.error = true;
            return true
        } else {
            this.setState({errorEmailNotEntered: false});
        }
        if (this.state.email.indexOf('@') === -1) {
            this.setState({errorInvalidEmail: true});
            this.state.error = true;
            return true
        } else {
            this.setState({errorInvalidEmail: false});
            return false
        }
    }

    checkBirthDateErrors() {
        if (this.state.day === "" || this.state.month === "" || this.state.year === "") {
            this.setState({errorBirthDateNotEntered: true});
            this.state.error = true;
            return true
        } else {
            this.setState({errorBirthDateNotEntered: false});
            return false
        }
    }

    checkLocalErrors() {
        let err1 = this.checkUSerNameErrors();
        let err2 = this.checkPassword1Errors();
        let err3 = this.checkPassword2Errors();
        let err4 = this.checkEmailErrors();
        let err5 = this.checkBirthDateErrors();
        return err1 || err2 || err3 || err4 || err5
    }

    handleSignUp() {
        console.log(this.state);
        let err = this.checkLocalErrors();
        if (!err) {
            request
                .post("http://172.19.10.241:4000/signup2")
                .send({ username: this.state.username, password: this.state.password1, email: this.state.email, birthdate: "???"})
                .end(function(err, res){
                    console.log(JSON.parse(res.text).message);

                });
        }
    }

    render() {
        let MakeItem = function (X) {
            return <option key={X}>{X}</option>;
        };

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
                        this.state.errorPassword1NotEntered
                            ?
                            <div
                                className="error">
                                Password is empty
                            </div>
                            :
                            this.state.errorPasswordTooShort
                                ?
                                <div className="error">
                                    This password is too short
                                </div>
                                :
                                <div className="emptyBlock"/>
                    }
                    <div className="inputRow">

                        <input className="input" type={this.state.password1 === "" ? "text" : "password"}
                               placeholder="Password"
                               onChange={password1 => {
                                   this.state.password1 = password1.target.value;
                                   this.checkPassword1Errors()
                               }}
                               onFocus={() => this.checkPassword1Errors()}
                        />
                    </div>

                    {
                        this.state.errorPassword2NotEntered
                            ?
                            <div className="error">
                                Please retype your password
                            </div>
                            :
                            this.state.errorPasswordsDontMatch
                                ?
                                <div className="error">
                                    Passwords don't match
                                </div>
                                :
                                <div className="emptyBlock"/>
                    }
                    <div className="inputRow">
                        <input className="input" type={this.state.password2 === "" ? "text" : "password"}
                               placeholder="Retype Password"
                               onChange={password2 => {
                                   this.state.password2 = password2.target.value;
                                   this.checkPassword2Errors()
                               }}
                               onFocus={() => this.checkPassword2Errors()}
                        />
                    </div>

                    {
                        this.state.errorEmailNotEntered
                            ?
                            <div className="error">
                                Email is empty
                            </div>
                            :
                            this.state.errorInvalidEmail
                                ?
                                <div className="error">
                                    This email is invalid
                                </div>
                                :
                                <div className="emptyBlock"/>
                    }
                    <div className="inputRow">
                        <input className="input" type="text" placeholder="Email"
                               onChange={email => {
                                   this.state.email = email.target.value;
                                   this.checkEmailErrors()
                               }}
                               onFocus={() => this.checkEmailErrors()}
                        />
                    </div>

                    <div className="formText">
                        Birthday
                    </div>

                    {
                        this.state.errorBirthDateNotEntered
                            ?
                            <div className="error">
                                Please complete your birth date
                            </div>
                            :
                            <div className="emptyBlock"/>
                    }
                    <div className="birthDateContainer">
                        <select className="input"
                                onChange={day => {
                                    this.state.day = day.target.value;
                                    this.checkBirthDateErrors()
                                }}>
                            {this.days.map(MakeItem)}
                        </select>
                        <select className="input"
                                onChange={month => {
                                    this.state.month = month.target.value;
                                    this.checkBirthDateErrors()
                                }}>
                            {this.months.map(MakeItem)}
                        </select>
                        <select className="input"
                                onChange={year => {
                                    this.state.year = year.target.value;
                                    this.checkBirthDateErrors()
                                }}>
                            {this.years.map(MakeItem)}
                        </select>
                    </div>
                    <div className="submitButton"
                         onClick={() => this.handleSignUp()}>
                        Sign Up
                    </div>
                </form>
            </div>
        )
    }
}