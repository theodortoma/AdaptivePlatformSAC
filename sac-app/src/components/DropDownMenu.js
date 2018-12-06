import React, {Component} from 'react';
import "./DropDown.css"
import "./Header.css"

export class DropDownMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    toggleMenu() {
        this.setState({open: !this.state.open});
    }

    render() {
        let title = this.props.title,
            options = this.props.options;

        return (
            <div style={{display: "flex", height: "100"}}>
                <div
                    onClick={() => this.toggleMenu()}
                    className={this.state.open ? "activeMenuButton" : "menuButton"}
                >
                    {title}
                </div>
                {this.state.open
                    ?
                    <div
                        className="dropdownContent"
                        onMouseLeave={() => this.toggleMenu()}
                    >
                        {options.map((option, key) =>
                                <div
                                    className={"dropdownItem"}
                                    onClick={option.onClick}
                                >
                                    {option.title}
                                </div>
                        )}
                    </div>
                    :
                    null
                }
            </div>
        )
    }
}