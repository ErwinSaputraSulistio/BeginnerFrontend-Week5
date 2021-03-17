import React, { Component } from 'react'
import axios from 'axios'
import './style.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Link } from 'react-router-dom'
import { renderStatic } from 'react-helmet';

export default class Navbar extends Component {
   constructor(props) {
      super(props)
      this.state = {
         getMovieData: []
      }
   }

   // AXIOS
   componentDidMount(){
      axios.get(process.env.REACT_APP_USER + localStorage.getItem("userId"))
      .then((res) => {this.setState(res.data.outputData[0])})
      .catch(() => {})
   }
   
   // LIVE SEARCH - MOVIE
   searchMovieWithAxios = (valueParams) => {
      axios.get("http://localhost:2000/v1/tickets?movie-name=" + valueParams)
      .then((res) => {this.setState({ getMovieData: res.data.outputData })})
      .catch(() => {this.setState({ getMovieData : [] })})
   }

   liveSearchMovieChange = (e) => {
      this.setState({ searchedMovie: e.target.value })
      this.searchMovieWithAxios(e.target.value)
   }

   // LOGOUT
   logoutFunction = () => {
      alert("Logout berhasil! Sampai jumpa lagi " + this.state.userRole + " " + this.state.realName + "!")
      localStorage.clear()
      window.location = "/login"
   }

   // RENDER - RETURN
   render(){
   return (
      <div className="navbarTop">
         <div className="navHeader col-12 col-md-2 order-1">
            <Link onClick={() => {window.location = "/home-page"}}><img className="hoverThis logoTickitz" src="/images/Navbar/tickitz.png"/></Link>
            <img className="hamMenu" src="/images/Navbar/navMobile.png"/>
         </div>
         <Link id="navSet" className="hideFirst textSet navSet order-md-2 order-4" onClick={() => {window.location = "/now-showing/all"}}>
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
                  <form action="/now-showing/all">
                     <input className="searchBar" type="text" onChange={this.liveSearchMovieChange} placeholder="Search film ..."/>
                  </form>
               </div>
               {this.state.getMovieData.map((item) => {
                     return (
                     <Link className="movieSearchResultLink" onClick={() => {window.location = "/now-showing/" + item.ticketId}}>
                        <div className="searchResultBorder">
                           <div className="">
                              <img className="searchResultImgSize" src={item.movieImgUrl}/>
                           </div>
                           <div className="movieSearchResultText">
                              <p className="searchResultMovieName noMargin">{item.movieName}</p>
                              <p className="searchResultMovieGenre noMargin">{item.movieGenre}</p>
                           </div>
                        </div>
                     </Link>
                     )
                  })}
            </div>
         </div>
         <div className="hideFirst col-12 textSet allRightsReserved order-6">&#169; 2020 Tickitz. All Rights Reserved.</div>
         { localStorage.getItem("isLoggedIn") === "true" ?
         <div className="hideFirst col-md-1 dropdown order-md-7">
            <img className="dropdown-toggle hoverThis imgNavbar" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" src={this.state.profileImages}/>
            <div className="hideFirst dropdown-menu dropdownUser" aria-labelledby="dropdownMenuButton">
               <div className="userDropdownWrapper">
                  <div className="userDropdownArea">
                     <img className="hoverThis userProfileImage" src={this.state.profileImages}/>
                     <div className="userProfileNameAndTitle">
                        <p className="mulishFont userProfileName">{this.state.realName}</p>
                        <p className="mulishFont userProfileTitle">{this.state.userJobs}</p>
                     </div>
                  </div>
                  { localStorage.getItem("userRole") === "admin" ? 
                  <Link className="mulishFont addOrUpdateBtn" to="/admin/add-or-update-movies" onClick={() => {localStorage.setItem("adminMoviesAction", "addMovies")}}>
                     <div className="hoverThis addOrUpdateMovies">Add a New Movie</div>   
                  </Link> 
                  : null }
                  <div className="userBtnArea">
                     <Link className="userUpdateBtn" to="/profile-page">Settings</Link>
                     <button className="hoverThis userRedBtn" onClick={this.logoutFunction}>Logout</button>
                  </div>
               </div> 
            </div>
         </div>
         : 
         <Link className="signInLink textSet navSet order-md-7" to="/login">
            <div className="col-12 col-md-12 gapBetweenBtn hoverThis signIn">Sign In</div>
         </Link>
         }
         </div>
      )
   }
}