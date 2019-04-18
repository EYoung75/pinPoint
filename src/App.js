import React, { Component } from "react";
import "./App.scss";
import Navigation from "./components/Navigation.jsx";
import HomeCard from "./components/HomeCard.jsx";
import { Route } from "react-router-dom";
import Callback from "./Callback";
import Auth from "./auth";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

class App extends Component {
  state = {
    collapsed: false,
    user: false
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  handleLogin = () => {
    auth.login();
    this.setState({
      user: true
    })
  }

  handleLogout = () => {
    auth.logout();
    this.setState({
      user: false
    })
  }

  componentDidMount() {
    fetch(
      `https://api.foursquare.com/v2/venues/search?client_id=${
        process.env.REACT_APP_CLIENT_ID
      }&client_secret=${
        process.env.REACT_APP_CLIENT_SECRET
      }&v=20180323&near=Denver,CO&intent=browse&query=food`
    )
      .then(res => res.json())
      .then(data => console.log(data.response));
  }

  render() {
    return (
      <div className="App">
        <div className="home">
          <Navigation
            toggleNavbar={this.toggleNavbar}
            handleLogin={this.handleLogin}
            handleLogout={this.handleLogout}
            auth={auth}
            {...this.state}
          />
          <Route
            path="/"
            exact
            render={props => {handleAuthentication(props); return <HomeCard auth={auth} {...props} />}}
          />
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
