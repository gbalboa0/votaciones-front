import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DeputiesDashboard from "./components/views/votings/dashboard"
// import { renderRoutes } from 'react-router-config';
import "./App.scss";

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);


// Pages


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <React.Suspense fallback={loading()}>
          <Switch>
            <Route
              exact
              path="/dashboard"
              name="Login Page"
              render={props => <DeputiesDashboard {...props} />}
            />
            
          </Switch>
        </React.Suspense>
      </BrowserRouter>
    );
  }
}

export default App;
