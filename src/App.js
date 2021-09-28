import React, { Component } from "react";
import {
  Route,
  Redirect,
  Switch,
} from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "./component/Navigation Bars/NavBar";
import MainPage from "./component/Pages/MainPage";
import IndividualPortfolioPage from "./component/Pages/IndividualPortfolioPage";
import WelcomePage from "./component/Pages/WelcomePage";
import LoginForm from "./component/common/loginForm";
import SignUpForm from "./component/common/signUpForm";
import "./App.css";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/signup" component={SignUpForm} />
            <Route path="/welcome-page" component={WelcomePage} />
            <Route path="/main-page" component={MainPage} />
            <Route path="/portfolio/:id" component={IndividualPortfolioPage} />
            <Redirect from="/" exact to="/welcome-page" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
