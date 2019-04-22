import React from "react";
import { Router, Route } from "react-router-dom";
import Auth from "./auth";
import history from "./history";
import Navigation from "./components/Navigation.jsx";
import HomeCard from "./components/HomeCard.jsx";
import Results from "./components/Results.jsx";
import "./App.scss";
import { geolocated } from "react-geolocated";

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
    userLocation: {}
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
    });
  };

  handleLogout = () => {
    auth.logout();
    this.setState({
      loggedIn: false
    });
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

  componentDidMount() {
    if (this.props.coords !== null) {
      this.setState({
        lat: this.props.coords.lat,
        long: this.props.coords.long
      });
    }
  }

  handleSearchInput = e => {
    this.setState({
      search: e.target.value
    });
  };

  fetchSearch = (userLocation) => {
    const lat = userLocation.lat.toFixed(4)
    const long = userLocation.long.toFixed(4)
    console.log(lat, long)
    fetch(
      `https://api.foursquare.com/v2/venues/search?client_id=${
        process.env.REACT_APP_CLIENT_ID
      }&client_secret=${
        process.env.REACT_APP_CLIENT_SECRET
      }&v=20180323&ll=${lat},${long}&query=${this.state.search}`
    )
      .then(res => res.json())
      .then(data =>
        this.setState({
          results: data.response.venues
        })
      )
      .then(console.log(this.state.results));
  };

  render() {
    return (
      <Router history={history} component={HomeCard}>
        <div className="App">
          <div className="home">
            {!this.props.isGeolocationAvailable ? (
              <div>Your browser does not support Geolocation</div>
            ) : !this.props.isGeolocationEnabled ? (
              <div>Geolocation is not enabled</div>
            ) : this.props.coords ? (
              // <table>
              //   <tbody>
              //     <tr>
              //       <td>latitude</td>
              //       <td>{this.props.coords.latitude}</td>
              //     </tr>
              //     <tr>
              //       <td>longitude</td>
              //       <td>{this.props.coords.longitude}</td>
              //     </tr>
              //     <tr>
              //       <td>altitude</td>
              //       <td>{this.props.coords.altitude}</td>
              //     </tr>
              //   </tbody>
              // </table>
              <Navigation
                toggleNavbar={this.toggleNavbar}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                auth={auth}
                {...this.state}
                handleSearchInput={this.handleSearchInput}
                fetchSearch={this.fetchSearch}
                lat={this.props.coords.latitude}
                long={this.props.coords.longitude}
              />
            ) : (
              <div>Getting location data... </div>
            )}
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
            <Route path="/results" render={() => <Results {...this.state} />} />
          </div>
        </div>
      </Router>
    );
  }
}

export default geolocated({
  positionOptions: {
    enableHighAccuracy: false
  },
  userDecisionTimeout: 5000
})(Routes);
