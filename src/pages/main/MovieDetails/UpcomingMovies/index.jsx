import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './style.css'
import Navbar from '../../../../components/Navbar'
import Footer from '../../../../components/Footer'
import Swal from 'sweetalert2'

export default class UpcomingMovies extends Component {
   constructor(props){
      super(props)
      this.state = { 
         upcomingMovies: [],
         movieGenre: ""
      }
   }
   componentDidMount(){
      const paramsId = this.props.match.params.id
      this.callAxios(paramsId)
   }
   callAxios = (paramsId) => {
      paramsId === undefined && (paramsId = 'all')
      axios.get(process.env.REACT_APP_UPCOMING + paramsId, {
         headers: {authorization: 'Bearer ' + localStorage.getItem("jwtToken")}
      })
      .then((res) => {
         // if(res.data.statusCode === 404){
         //    Swal.fire(
         //       "Oops!",
         //       res.data.errorDetail,
         //       "warning"
         //    ).then(() => window.location = "/login")
         // }
         // else{
         const setUpResData = res.data.outputData[0].upcoming_id
         setUpResData === undefined ? alert(res.data.outputData) :
         this.setState({
            upcomingMovies: res.data.outputData,
            upcomingMoviesLength: res.data.outputData.length
         })
         // }
      })
      .catch((err) => {alert(err.message)})
      
   }

   // SORT - GENRE
   changeGenre = (e) => {
      axios.get(process.env.REACT_APP_UPCOMING_NOSLASH + "?upcoming-genre=" + e.target.getAttribute("genre"), {
         headers: {authorization: 'Bearer ' + localStorage.getItem("jwtToken")}
      })
      .then((res) => {this.setState({upcomingMovies: res.data.outputData, upcomingMoviesLength: res.data.outputData.length, movieGenre: e.target.getAttribute("genre")})})
      .catch((err) => {
         Swal.fire(
         "Error!", 
         err.response.data.errorDetail, 
         "error")
      })
   }

   // ADMIN - CHANGE DATA
   updateThisUpcomingMovie(updateThisMovieBy){
      localStorage.setItem("updateMovieId", updateThisMovieBy.upcoming_id)
      localStorage.setItem("adminMoviesAction", "updateMovies")
      window.location = "/admin/add-or-update-movies"
   }

   // ADMIN - ERASE MOVIE
   deleteThisUpcomingMovie(deleteThisMovieBy){
      axios.delete(process.env.REACT_APP_UPCOMING + deleteThisMovieBy.upcoming_id, {
         headers: {authorization: 'Bearer ' + localStorage.getItem("jwtToken")}
      })
      .then(() => {
         Swal.fire(
            "Berhasil!", 
            "Berhasil menghapus film '" + deleteThisMovieBy.upcoming_name + "', silahkan refresh page untuk melihat perubahan!", 
            "success")
         .then(() => {window.location = "/upcoming-movies/all"})
      })
      .catch((err) => {alert(err.message)})
   }

   // RENDER
   render(){
      return (
         <div className="showInAnimation">
            <Helmet>
               <title>{this.state.upcomingMoviesLength == 1 ? this.state.upcomingMovies[0].upcomingName : "Tickitz - Upcoming Movies List"}</title>
            </Helmet>
            <Navbar/>
            {this.state.nowShowingLength <= 1 ? 
            null 
            :
            <div className="dropdown mulish genreBtnGroup">
               <div className="genreGroupBorder">
                  <div className="paddingForGenreGroup">
                     Sort by genre:
                     <button className="dropdown-toggle hoverThis navBtn marginLeftGenre" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        { this.state.movieGenre !== "" ? this.state.movieGenre : "All" }
                     </button>
                     <div className="hideFirst dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <Link className="dropdown-item" onClick={this.changeGenre} genre="">All</Link>
                        <Link className="dropdown-item" onClick={this.changeGenre} genre="Action">Action</Link>
                        <Link className="dropdown-item" onClick={this.changeGenre} genre="Animation">Animation</Link>
                        <Link className="dropdown-item" onClick={this.changeGenre} genre="Comedy">Comedy</Link>
                        <Link className="dropdown-item" onClick={this.changeGenre} genre="Drama">Drama</Link>
                        <Link className="dropdown-item" onClick={this.changeGenre} genre="Horror">Horror</Link>
                        <Link className="dropdown-item" onClick={this.changeGenre} genre="School Life">School Life</Link>
                        <Link className="dropdown-item" onClick={this.changeGenre} genre="Sci-fi">Sci-Fi</Link>
                     </div>
                  </div>
                  { this.state.movieGenre !== "" ?
                  <p className="noMargin paddingForGenreGroup someMoviesFound borderTopGenre">'{this.state.upcomingMoviesLength}' upcoming movies found with genre of '{this.state.movieGenre}'</p>
                  :
                  null
                  }
               </div>
            </div>
            }
            {this.state.upcomingMovies.map((item) =>
            <div className="nowShowingMovieDetails">
               <div className="movieDetailsImgBorder">
                  <img className="movieDetailsImg" src={item.upcoming_img}/>
               </div>
               <div className="movieDetailsInfo">
                  <div className="movieDetailsTitleAndGenre">
                     <p className="movieDetailsTitle">{item.upcoming_name}</p>
                     <p className="movieDetailsGenre">{item.upcoming_genre}</p>
                  </div>
                  <div className="movieDetailsMoreInfo">
                     <div className="movieDetailsRowOne">
                        <div className="insideMovieDetailsRowOne">
                           <div className="insideMovieDetailsRowAgain">
                              <p className="topTextMovieDetails">Release date</p>
                              <p className="bottomTextMovieDetails">{item.release_date}</p>
                           </div>
                           <div className="insideMovieDetailsRowAgain">
                              <p className="topTextMovieDetails">Duration</p>
                              <p className="bottomTextMovieDetails">{item.movie_duration}</p>
                           </div>
                        </div>
                     </div>
                     <div className="movieDetailsRowTwo">
                        <div className="insideMovieDetailsRowAgain">
                           <p className="topTextMovieDetails">Directed by</p>
                           <p className="bottomTextMovieDetails">{item.directed_by}</p>
                        </div>
                        <div className="insideMovieDetailsRowAgain">
                           <p className="topTextMovieDetails">Casts</p>
                           <p className="bottomTextMovieDetails">{item.movie_casts}</p>
                        </div>
                     </div>
                  </div>
                  <div className="thisIsLineBreaksMovieDetails"/>
                  <div className="movieDetailsSynopsis">
                     <p className="synopsisText">Synopsis</p>
                     <p className="afterSynopsisText">{item.upcoming_synopsis}</p>
                  </div>
                  {/* {localStorage.getItem("userRole") === "admin" ?
                     <div className="adminMovieBtnArea">
                        <button className="hoverThis adminNowShowingBtn adminUpdateFilmBtn" onClick={this.updateThisUpcomingMovie.bind(this, item)}>Update Newest Data</button>
                        <button className="hoverThis adminNowShowingBtn adminRemoveFilmBtn" onClick={this.deleteThisUpcomingMovie.bind(this, item)}>Remove This Film</button>
                     </div>
                  : null} */}
               </div>
               <div className="borderLinesBetween"/>
            </div>
            )}
            <Footer/>
         </div>
      )
   }
}