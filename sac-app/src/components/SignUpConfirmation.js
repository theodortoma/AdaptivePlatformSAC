import React, {Component} from 'react';
import "./Input.css"
import history from '../history';
import "./Input.css"

export class SignUpConfirmation extends Component {

    render() {
        return (
           <div style={{
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               flexDirection: "column",
               marginTop: "30px"
           }}>
               Your account has been successfully registered!
               <div
                   className={"submitButton"}
                   onClick={() => {
                       this.props.setActivePage("login");
                       history.push(
                           "/login"
                       )
                   }}
               >
                   Go to Login
               </div>
           </div>
        )
    }
}