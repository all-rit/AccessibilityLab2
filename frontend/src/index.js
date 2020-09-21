import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import "./index.css";
import App from "./App";
import SuppMaterials from "./suppMaterials";
import CaseStudy from "./caseStudy";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import {
  changeColors,
  selectGameOption,
  changeGameState,
  changeUser
} from "./controllers/reducers";
import app from './reducers/AppReducer';


let browserHistory = Router.browserHistory;

const rootReducer = combineReducers({
  changeColors,
  selectGameOption,
  changeGameState,
  changeUser,
  app 
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} basename="Lab2">
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/suppMaterials" component={SuppMaterials} />
        <Route path="/caseStudy" component={CaseStudy} />
        <Route
          path="/lecture"
          component={() => {
            window.location =
              "https://docs.google.com/presentation/d/1ylWIGVRfCr8-vLXGrY3OgkxZEJbNRBMj5Y8CRTG4rY0/edit?usp=sharing";
            return null;
          }}
        />
        <Route component={App} />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
