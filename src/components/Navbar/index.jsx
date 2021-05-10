import { useEffect, useState } from 'react'
import axios from 'axios'
import './style.css'
import {Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Navbar(){
   const [userData, useUserData] = useState("")
   const [getMovieData, useMovieData] = useState([])
   const [searchedMovie, useSearch] = useState("")
   
   // AXIOS & SET DATA
   useEffect(() => {
      axios.get(process.env.REACT_APP_USER + localStorage.getItem("userId"))
      .then((res) => { useUserData(res.data.outputData[0]) })
      .catch((err) => { alert(err.message) })
   }, [])
   const {profileImages, realName, userJobs, userRole} = userData

   // QUERY - SEARCH
   const querySearch = (e) => {
      e.preventDefault()
      window.location = "/now-showing/search?movie-name=" + searchedMovie
   }

   // LIVE SEARCH - MOVIE
   const liveSearchMovieChange = (e) => {
      if(e.target.value === "") { 
         useMovieData([])
         useSearch("")
      }
      else{
         axios.get(process.env.REACT_APP_NOWSHOWING_NOSLASH + "?movie-name=" + e.target.value)
         .then((res) => {
            useMovieData(res.data.outputData)
            useSearch(e.target.value)
         })
         .catch(() => { 
            useMovieData([])
            useSearch(e.target.value)
         })
      }
   }

   // LOGOUT
   const logoutFunction = () => {
      Swal.fire(
         "Logout berhasil!", 
         "Sampai jumpa lagi " + userRole + " " + realName + "!", 
         "success")
      .then(() => {
         localStorage.clear()
         window.location = "/login"})
   }

   // RETURN
   return (
      <div className="navbarTop">
         <div className="navHeader col-12 col-md-2 order-1">
            <Link onClick={() => {window.location = "/home-page"}}><img className="hoverThis logoTickitz" src="/images/Navbar/tickitz.png"/></Link>
            <img className="hamMenu" src="/images/Navbar/navMobile.png"/>
         </div>
         <div className="hideFirst dropdown textSet navSet order-md-2 order-4">
            <button className="dropdown-toggle hoverThis navBtn gapBetweenBtn" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               Movies
            </button>
            <div className="hideFirst dropdown-menu dropdownMenuCenter" aria-labelledby="dropdownMenuButton">
               <Link className="dropdown-item" onClick={() => {window.location = "/now-showing/all"}}>Now Showing</Link>
               <Link className="dropdown-item" onClick={() => {window.location = "/upcoming-movies/all"}}>Upcoming Movies</Link>
            </div>
         </div>
         <div className="hideFirst textSet order-md-3 order-5">
            <Link className="hoverThis gapBetweenBtn navSet">Cinemas</Link>
         </div>
         <div className="hideFirst textSet order-md-4 order-6" to="">
            <Link className="hoverThis gapBetweenBtn navSet">Buy Tickets</Link>
         </div>
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
                  <form onSubmit={querySearch}>
                     <input className="searchBar" type="text" onChange={(e) => {liveSearchMovieChange(e)} } placeholder="Search film ..." required/>
                  </form>
               </div>
               {getMovieData.map((item) => {
                  return (
                     <Link className="movieSearchResultLink" onClick={() => {window.location = "/now-showing/" + item.ticketId}}>
                        <div className="searchResultBorder">
                           <div>
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
            <img className="dropdown-toggle hoverThis imgNavbar" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" src={profileImages}/>
            <div className="hideFirst dropdown-menu dropdownUser" aria-labelledby="dropdownMenuButton">
               <div className="userDropdownWrapper">
                  <div className="userDropdownArea">
                     <img className="hoverThis userProfileImage" src={profileImages}/>
                     <div className="userProfileNameAndTitle">
                        <p className="mulishFont userProfileName">{realName}</p>
                        <p className="mulishFont userProfileTitle">{userJobs}</p>
                     </div>
                  </div>
                  { localStorage.getItem("userRole") === "admin" ? 
                  <Link className="mulishFont addOrUpdateBtn" to="/admin/add-or-update-movies" onClick={() => {localStorage.setItem("adminMoviesAction", "addMovies")}}>
                     <div className="hoverThis addOrUpdateMovies">Add a New Movie</div>   
                  </Link> 
                  : null }
                  <div className="userBtnArea">
                     <Link className="userUpdateBtn" to="/profile-page">Settings</Link>
                     <button className="hoverThis userRedBtn" onClick={() => {logoutFunction()} }>Logout</button>
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