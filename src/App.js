import React, { Component } from "react";
import "./App.scss";
import Navigation from "./components/Navigation.jsx";
import HomeCard from "./components/HomeCard.jsx";
import { Route } from "react-router-dom";
import Login from "./components/Login.jsx";
import SignUp from "./components/SignUp.jsx";
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
    login: true,
    signUp: false
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  toggleLogin = () => {
    this.setState({
      login: !this.state.login
    });
  };

  handleLogin = () => {
    auth.login()
  }

  toggleSignUp = () => {
    this.setState({
      signUp: !this.state.signUp
    });
  };

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
    const { isAuthenticated } = auth;

    return (
      <div className="App">
        <div className="home">
          <Navigation
            toggleNavbar={this.toggleNavbar}
            toggleLogin={this.toggleLogin}
            toggleSignUp={this.toggleSignUp}
            {...this.state}
          />
          <Login {...this.state} toggleLogin={this.toggleLogin} handleLogin={this.handleLogin}/>
          <SignUp {...this.state} toggleSignUp={this.toggleSignUp} />
          <Route
            path="/"
            exact
            render={props => <HomeCard auth={auth} {...props} />}
          />
          <Route
            path="/callback"
            render={props => {
              handleAuthentication(props);
              return <Callback {...props} />;
            }}
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
