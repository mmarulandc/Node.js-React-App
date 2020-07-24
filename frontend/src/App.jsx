import React from "react";
// import CommentsArea from './components/CommentsArea';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import MainPage from "./components/MainPage";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import SignupForm from './components/SignupForm';
// import NotFound from './components/NotFound';

class App extends React.Component {
  state = {
    comments: [
      {
        username: "",
        email: "",
        comment: "",
        trend: "",
      },
    ],
  };
  sendName = (name) => {
    this.setState({
      username: name,
    });
  };
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <LoginForm {...props} />}
            />
            <Route path="/signup" component={SignupForm}/>
            <Route
              path="/dashboard"
              render={(props) => (
                <MainPage {...props}/>
              )}
            />
            {/* <Route component = {NotFound}/>}/> */}
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
