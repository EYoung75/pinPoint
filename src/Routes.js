import React from "react";
import { Router, Route } from "react-router-dom";
import Auth from "./auth";
import history from "./history";
import Navigation from "./components/Navigation.jsx";
import HomeCard from "./components/HomeCard.jsx";
import Results from "./components/Results.jsx";
import "./App.scss";

const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

class Routes extends React.Component {
  state = {
    collapsed: false,
    loggedIn: false,
    search: "",
    results: [],
    location: {
      lat: 0,
      lng: 0
    }
  };

  toggleNavbar = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  handleLogin = () => {
    auth.login();
    this.setState({
      loggedIn: true
    })
  };

  handleLogout = () => {
    auth.logout();
    this.setState({
      loggedIn: false
    })
  };

  // componentDidMount() {
  //   fetch(
  //     `https://api.foursquare.com/v2/venues/search?client_id=${
  //       process.env.REACT_APP_CLIENT_ID
  //     }&client_secret=${
  //       process.env.REACT_APP_CLIENT_SECRET
  //     }&v=20180323&near=Denver,CO&intent=browse&query=coffee`
  //   )
  //     .then(res => res.json())
  //     .then(data => console.log(data.response));
  // }

  handleSearchInput = (e) => {
    this.setState({
      search: e.target.value
    })
    console.log(this.state.search)
  }

  fetchSearch = () => {
    fetch(
      `https://api.foursquare.com/v2/venues/search?client_id=${
        process.env.REACT_APP_CLIENT_ID
      }&client_secret=${
        process.env.REACT_APP_CLIENT_SECRET
      }&v=20180323&near=Denver,CO&intent=browse&query=${this.state.search}`
    )
      .then(res => res.json())
      .then(data => this.setState({
        results: data.response.venues
      }))
      .then(console.log(this.state.results))
      
  }

  render() {
    return (
      <Router history={history} component={HomeCard}>
        <div className="App">
          <div className="home">
            <Navigation
              toggleNavbar={this.toggleNavbar}
              handleLogin={this.handleLogin}
              handleLogout={this.handleLogout}
              auth={auth}
              {...this.state}
              handleSearchInput={this.handleSearchInput}
              fetchSearch={this.fetchSearch}
            />
            <Route
              exact
              path="/"
              render={props => {
                handleAuthentication(props);
                return <HomeCard auth={auth} {...props} />;
              }}
            />
            <Route
              exact
              path="/home"
              render={props => {
                handleAuthentication(props);
                return <HomeCard auth={auth} {...props} />;
              }}
            />
            <Route path="/results" render={() => <Results {...this.state}/>}/>
          </div>
        </div>
      </Router>
    );
  }
}

export default Routes;
