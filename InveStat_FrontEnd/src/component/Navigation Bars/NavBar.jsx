import React from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../logo/InveStatLogo3.png";
import "../../css/NavBar.css";
import profile from "../../Images/Profile.png"

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <Link className="navbar-brand" to="/main-page">
        <img src={logo} className="navbar-logo"/>
        
      </Link>

      <button
        className="navbar-toggler"
        id = "NavBarButton"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          <NavLink className="nav-item nav-link" to="/main-page">
            Main
          </NavLink>
          <NavLink className="nav-item nav-link" to="/watchlist">
            Watchlist
          </NavLink>
          <NavLink className="nav-item nav-link" to="/stocklist">
            Stock List
          </NavLink>
          <NavLink className="nav-item nav-link" to="/goal-setting">
            Goal Setting
          </NavLink>
          {/* <NavLink className="nav-item nav-link" to="/customers">
            Profile
          </NavLink> */}
        </div>
      </div>

      <Link className="btn btn-primary" id = "NavBarLogout" to="/logout">
        Log Out
      </Link>

      <Link className="navbar-brand" to="/main-page">
        <img src={profile} className = "profile-pic"/>
      </Link>

    </nav>
   
  );
};

export default NavBar;



// <nav className="navbar navbar-expand-lg navbar-light">
//       <Link className="navbar-brand" to="/main-page">
//         <img src={logo} 
//          height="53px" 
//          width = "97px" 
//          left = "23px" 
//          top = "8px" 
//          border-radius = "0px" 
//          padding = "10px"
//         />
        
//       </Link>

//       <button
//         className="navbar-toggler"
//         id = "NavBarButton"
//         type="button"
//         data-toggle="collapse"
//         data-target="#navbarNavAltMarkup"
//         aria-controls="navbarNavAltMarkup"
//         aria-expanded="false"
//         aria-label="Toggle navigation"
//       >
//         <span className="navbar-toggler-icon"></span>
//       </button>

//       <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
//         <div className="navbar-nav">
//           <NavLink className="nav-item nav-link" to="/main-page">
//             Main
//           </NavLink>
//           <NavLink className="nav-item nav-link" to="/watchlist">
//             Watchlist
//           </NavLink>
//           <NavLink className="nav-item nav-link" to="/stocklist">
//             Stock List
//           </NavLink>
//           <NavLink className="nav-item nav-link" to="/goal-setting">
//             Goal Setting
//           </NavLink>
//           <NavLink className="nav-item nav-link" to="/customers">
//             Profile
//           </NavLink>
//         </div>
//       </div>

      // <Link className="btn btn-danger float-right mr-2" to="/logout">
      //   Log Out
      // </Link>

//     </nav>
