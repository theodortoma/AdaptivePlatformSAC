import React, { Component } from 'react';

class App extends Component {

    render() {
        return (
           <div className="note" onClick={this.props.deleteMethod}>
               {this.props.text}
           </div>
        );
    }
}

export default App;
