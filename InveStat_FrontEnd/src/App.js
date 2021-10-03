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
import NotLoggedInNavBar from "./component/Navigation Bars/LoginSignUpNavBar";
import Logout from "./component/common/logout";
import NewPortfolioForm from "./component/common/newPortfolioForm";
import WatchListPage from "./component/Pages/WatchListPage";
class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const user = localStorage.getItem("token");
      this.setState({ user });
    } catch (error) {
      const user = null;
      this.setState({ user });
    }
  }
  render() {
    console.log(this.state);
    return (
      <React.Fragment>
        {this.state.user ? <NavBar /> : <NotLoggedInNavBar />}
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <Route path="/signup" component={SignUpForm} />
            <Route path="/welcome-page" component={WelcomePage} />
            <Route path="/main-page" component={MainPage} />
            <Route path="/portfolio/new" component={NewPortfolioForm} />
            <Route path="/portfolio/:id" component={IndividualPortfolioPage} />
            <Route path="/watchlist" component={WatchListPage} />
            <Redirect from="/" exact to="/welcome-page" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
