import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import _ from 'lodash';

import SessionsPage from "../Pages/SessionsPage.jsx"
import ProfilePageContainer from "../Containers/Pages/ProfilePageContainer"
import HeaderContainer from '../Containers/HeaderContainer.jsx';
import MainPageContainer from '../Containers/Pages/MainPageContainer'
import CurrentSessionPage from '../Pages/CurrentSessionPage.jsx';
import SignupPage from '../Pages/SignupPage'
import SignupPageContainer from '../Containers/Pages/SignupPageContainer.jsx';
import { fetchSession } from '../Actions/users.js';

export default function root_init(node, store) {
  ReactDOM.render(
    <Provider store={store}>
      <Root />
    </Provider>, node);
}

class Root extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
  }

  componentWillMount() {
    fetchSession()
  }

  render() {
    return <div>
      <Router>
        <div>
          <div className="shadow mb-5 bg-light rounded">
            <HeaderContainer className="shadow" />
          </div>
          <div className="row">
            <div className="col-12">
              <Route path="/" exact={true} render={() =>
                <MainPageContainer />
              } />
              <Route path="/sessions" exact={true} render={() =>
                <SessionsPage />
              } />
              <Route path="/profile" exact={true} render={() =>
                <ProfilePageContainer />
              } />
              <Route path="/currentSession" component={CurrentSessionPage} exact={true} />
              <Route path="/signup" exact={true} render={() =>
                <SignupPageContainer />
              } />
            </div>
          </div>
        </div>
      </Router>
    </div>;
  }
}
