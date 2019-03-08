import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Switch } from 'react-router'
import './index.css';
import App from './App';
import SuppMaterials from './suppMaterials';
import CaseStudy from './caseStudy';
import {Provider} from 'react-redux';
import {createStore, combineReducers} from 'redux';
import {changeColors, selectGameOption, changeGameState, changeUser} from './controllers/reducers';

let browserHistory = Router.browserHistory;

const rootReducer = combineReducers({changeColors, selectGameOption, changeGameState, changeUser});

const store = createStore(rootReducer);

ReactDOM.render((
  <Provider store={store}>
    <Router history={browserHistory} basename="/Lab2">
      <Switch>
        <Route exact path="/" component={App}/>
        <Route path="/suppMaterials" component={SuppMaterials} />
        <Route path="/caseStudy" component={CaseStudy} />
        <Route component={App} />
      </Switch>
    </Router>
  </Provider>),
    document.getElementById('root')
);
