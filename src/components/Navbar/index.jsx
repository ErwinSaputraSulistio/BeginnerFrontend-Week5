import React, { Component } from 'react'
import './style.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Link} from 'react-router-dom'

export default class Navbar extends Component {
   render() {
      return (
         <div className="navbarTop">
            <div className="navHeader col-12 col-md-2 order-1">
               <Link to="/home-page"><img className="hoverThis logoTickitz" src="/images/Navbar/tickitz.png"/></Link>
               <img className="hamMenu" src="/images/Navbar/navMobile.png"/>
            </div>
            <Link id="navSet" className="hideFirst textSet navSet order-md-2 order-4" to="">
               <div className="col-12 col-md-12 gapBetweenBtn">Movies</div>
            </Link>
            <Link className="hideFirst textSet navSet order-md-3 order-5" to="">
               <div className="col-12 col-md-12 gapBetweenBtn">Cinemas</div>
            </Link>
            <Link className="hideFirst textSet navSet order-md-4 order-6" to="">
               <div className="col-12 col-md-12 gapBetweenBtn">Buy Tickets</div>
            </Link>
            <div className="hideFirst col-12 col-md-1 offset-md-3 dropdown textSet navSet order-md-5 order-3">
               <button className="navBtn dropdown-toggle hoverThis" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Location
               </button>
               <div className="hideFirst dropdown-menu dropdownMenuCenter" aria-labelledby="dropdownMenuButton">
                  <a className="dropdown-item" href="#">Jabodetabek</a>
                  <a className="dropdown-item" href="#">Other</a>
               </div>
            </div>
            <div className="hideFirst col-md-1 dropdown textSet navSet order-md-6 order-2">
               <button className="navBtn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <img className="hoverThis searchLogo" src="https://user-images.githubusercontent.com/77045083/111035357-ba206c00-844c-11eb-9c67-9731505eee02.png"/>
               </button>
               <div className="searchBtn hideFirst dropdown-menu dropdownMenuSearch" aria-labelledby="dropdownMenuButton">
                  <div className="searchBarBorder">
                     <form method="GET">
                        <input className="searchBar" type="text" placeholder="Search film ..."/>
                     </form>
                  </div>
               </div>
            </div>
            <div className="hideFirst col-12 textSet allRightsReserved order-6">&#169; 2020 Tickitz. All Rights Reserved.</div>
            <Link className="signUpLink textSet navSet order-md-7" to="/register">
               <div className="col-12 col-md-12 gapBetweenBtn hoverThis signUp">Sign Up</div>
            </Link>
         </div>
      )
   }
}