import React, { Component } from "react";
import "./App.scss";
import Navigation from "./components/Navigation.jsx";

class App extends Component {
  state = {
    collapsed: false
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <div className="App">
        <div className="home">
          <Navigation toggleNavbar={this.toggleNavbar} {...this.state} />
        </div>
      </div>
    );
  }
}

export default App;
