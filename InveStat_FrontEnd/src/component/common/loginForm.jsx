import React from "react";
import Joi from "joi-browser";
import Form from "./form";
import auth from "../../services/authService";
import "../../css/LoginPage.css";
import logo from "../../logo/InveStatLogo2.png";


class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    //call the server
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      window.location = "/main-page";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        console.log(errors);
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
    <div id="bg-pic-loginPage">
      <div  id="bg-loginPage">

      {/* CONTENT */}
        <div id="container-left-loginPage">
          <div className="logoWrapper" id = "logoWrapper-loginPage">
              <img src = {logo} className="logo-loginPage"></img>
              <h3 className="branding-msg-loginPage" > We provide simple, comprehensive and intuitive investment and portfolio solutions for both business and personal use.</h3>
          </div>
        </div>

        <div id="container-right-loginPage">
          <div  id = "loginFormWrapper">
            {/* delete border laterfor login form wrapper, not in use */}
            {/* <div className="loginFormnWrapper" id = "loginFormWrapper"> */}
                <form clas onSubmit={this.handleSubmit}>
                  {this.renderInput("username", "Username: ")}
                  {this.renderInput("password", "Password: ", "password")}
                  {this.renderButton("Login", "loginButton")}
                </form> 

                <div className="alt-msg">
                    Have not registered yet? <a href="/signup">Sign Up</a> here.
                </div>
            {/* </div> */}
          </div>
        </div>

      </div>
    </div>

      
    )
    }
  }
// end of program 


  // version 1 
//   <div className="jumbotron d-flex h-100 align-items-center ">
        
//   <div className="container h-50 bg-dark">


//     <div className="row">

//       <div className="col-md-6 text-center logoWrapper">
//         <div className = "p-3 border h bg-light"> 
//           <img src = {logo} className="logo" />
//           <p id="branding_msg" algin="center"> providing simple, comprehensive and intuitive investment and portfolio solutions for both business and personal use.</p>
//          </div> 
//       </div>


//       <div className="col-md-6">
//         <div className = "p-3 border h-100">
//           <h1>Login</h1>
//             <form onSubmit={this.handleSubmit}>
//               {this.renderInput("username", "Username")}
//               {this.renderInput("password", "Password", "password")}
//               {this.renderButton("Login")}
//             </form>
//           </div>
//         </div>

//     </div>

//   </div>
// </div>


  // end of version 1 

        {/* <div className="grid-container">
          <div className="row">
            <div className="grid-item1">
              jajaja
            </div>
            <div className="grod-item2">
              jajajjaj
            </div>
          </div> */}
    
          
          {/* <div className="container-bg">
           </div>  */}
          {/* <div className="row">
           <div class="col-1">
              <div className="logoWrapper">
                <img src = {logo} className="logo"/>
              </div>
            </div>
           <div class="col-2">
            <img src = {logo} className="logo"/>
           </div>
          </div> */}
        {/* </div> */}
        {/* <div className="container h-100 d-flex justify-content-center">
          <div className="jumbotron my-auto"> 
            <div className = "logoWrapper">
              <img src = {logo} className="logo"/>
              <h3 className="branding_msg"> providing simple, comprehensive and intuitive investment and portfolio solutions for both business and personal use.</h3>
            </div>

          </div>

        </div> */}
   
{/*     
    /* // <div class="row align-items-center">
    //   <div class="col">
    //     Column 1
    //   </div>
    //   <div class="col">
    //     Coluimn 2
    //   </div>
    // </div>


      // <div>
      //   <h1>Login</h1>
      //   <form onSubmit={this.handleSubmit}>
      //     {this.renderInput("username", "Username")}
      //     {this.renderInput("password", "Password", "password")}
      //     {this.renderButton("Login")}
      //   </form>
      // </div> */ }
  


export default LoginForm;
