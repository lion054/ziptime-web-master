import React from 'react';
import ReactDOM from 'react-dom';
// import leaflet from "assets/css/leaflet.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from './views/login.js';
import Places from './views/places.js';
import PlaceDetails from './views/placeDetails.js';
import LineDetails from './views/lineDetails.js';
import Users from './views/users.js';
import UserDetails from './views/userDetails.js';
import store from './store';
import { Provider } from 'react-redux';
import "core-js/stable";
import "regenerator-runtime/runtime";
import styles from "./assets/css/styles.css";

class Routes extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/places" component={Places} />
                    <Route exact path="/places/:placeId" component={PlaceDetails} />
                    <Route exact path="/lines/:placeId" component={LineDetails} />
                    <Route exact path="/users" component={Users} />
                    <Route exact path="/users/:userId" component={UserDetails} />
                </Switch>
            </BrowserRouter>
        );
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.querySelector('#app')
);