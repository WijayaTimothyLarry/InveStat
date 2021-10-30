import React, { Component } from "react";
import ReactDOM from "react-dom";
import MainPage from "./MainPage";
import "../../css/WelcomePage.css";
import "../../Images/bg2.png"
import logo from "../../logo/InveStatLogo2.png";

class WelcomePage extends Component {
  goToMainPage() {
    ReactDOM.render(<MainPage />, document.getElementById("root"));
  }
  render() {
    return (
      // <React.Fragment>
        <div id="bg-pic-welcomePage">
          <div  id="bg-welcomePage">
            <div id="container-welcomePage">
              <div class="msgWrapper">
                <h1 class="welcome-msg">Welcome to</h1>
                <img src = {logo} className="logo"></img>
                  <p className="msg-text">InveStat is equipped with goal setting feature that will help you
                  staying on track to your financial goals.
                  </p>
              </div>
              <div className="buttonWrapper">
                <button className="login"><a href="/login"> Login</a></button>
                <button className="signup"><a href="/signup">Sign Up</a></button>

              </div>
             

                  {/* <div>
                    
                  </div> */}

            
            </div>

          </div>
        </div>
      // </React.Fragment>
    );
  }
}

export default WelcomePage;
