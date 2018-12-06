import React, {Component} from 'react';
import "./Input.css"
import history from "../history"

export class Profile extends Component {
    componentWillMount() {
        if (this.props.username === ""){
            history.push("/home")
        }
    }

    render() {
        let {username} = this.props;
        return (
            <div>
                {
                    <div>
                        Hello <b>{username}</b>, it's nice to see you again. This is your profile
                    </div>
                }
            </div>
        )
    }
}