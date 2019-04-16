import React, { Component } from "react";
import "./App.scss";
import Navigation from "./components/Navigation.jsx";
import HomeCard from "./components/HomeCard.jsx";

class App extends Component {
  state = {
    collapsed: false,
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  componentDidMount() {
    fetch(`https://api.foursquare.com/v2/venues/explore?client_id=${process.env.REACT_APP_CLIENT_ID}&client_secret=${process.env.REACT_APP_CLIENT_SECRET}&v=20180323&limit=1&ll=40.7243,-74.0018&query=coffee`)
    .then(res => res.json())
    .then(data => console.log(data.response))
  }

  render() {
    return (
      <div className="App">
        <div className="home">
          <Navigation toggleNavbar={this.toggleNavbar} {...this.state} />
          <HomeCard/>
        </div>
      </div>
    );
  }
}

export default App;



/*
fetch('https://api.foursquare.com/v2/venues/explore?client_id=CLIENT_ID&client_secret=CLIENT_SECRET&v=20180323&limit=1&ll=40.7243,-74.0018&query=coffee')
    .then(function() {
        // Code for handling API response
    })
    .catch(function() {
        // Code for handling errors
    })
    */