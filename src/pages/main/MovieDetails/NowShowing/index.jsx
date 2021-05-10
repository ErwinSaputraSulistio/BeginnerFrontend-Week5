import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import axios from 'axios'
import './style.css'
import Navbar from '../../../../components/Navbar'
import { ShowtimesAndTickets } from '../../../../components/ShowtimesAndTickets'
import Footer from '../../../../components/Footer'
import Swal from 'sweetalert2'

export default class NowShowing extends Component {
   constructor(props){
      super(props)
      this.state = { 
         nowShowing: [],
         movieGenre: ""
      }
   }
   componentDidMount(){
      const paramsQuery = this.props.location.search
      const paramsId = this.props.match.params.id
      if(paramsQuery === "" && paramsId !== undefined) { this.callAxios("/" + paramsId) }
      else if(paramsQuery !== "" && paramsId === undefined) { this.callAxios(paramsQuery) }
      else { this.callAxios("/all") }
   }
   callAxios = (axiosRoute) => {
      let axiosUrl = process.env.REACT_APP_NOWSHOWING_NOSLASH + axiosRoute
      axios.get(axiosUrl, {
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
            const setUpResData = res.data.outputData[0].ticketId
            const ticketPrice = res.data.outputData[0].ticketPrice
            if(res.data.outputData.length === 1) {
               localStorage.setItem("nowShowingId", setUpResData)
               localStorage.setItem("ticketPrice", ticketPrice)
            }
            setUpResData === undefined ?
            Swal.fire(
               "Error!", 
               res.data.outputData, 
               "error")
            :
            this.setState({
               nowShowing: res.data.outputData,
               nowShowingLength: res.data.outputData.length
            })
         // }
      })
      .catch((err) => {
         Swal.fire(
         "Error!", 
         err.response.data.errorDetail, 
         "error")
      })
   }
   
   // SORT - GENRE
   changeGenre = (e) => {
      axios.get(process.env.REACT_APP_NOWSHOWING_NOSLASH + "?genre=" + e.target.getAttribute("genre"), {
         headers: {authorization: 'Bearer ' + localStorage.getItem("jwtToken")}
      })
      .then((res) => {this.setState({nowShowing: res.data.outputData, nowShowingLength: res.data.outputData.length, movieGenre: e.target.getAttribute("genre")})})
      .catch((err) => {
         Swal.fire(
         "Error!", 
         err.response.data.errorDetail, 
         "error")
      })
   }

   // ADMIN - CHANGE DATA
   updateThisNowShowingMovie(updateThisMovieBy){
      localStorage.setItem("updateMovieId", updateThisMovieBy.ticketId)
      localStorage.setItem("adminMoviesAction", "updateMovies")
      window.location = "/admin/add-or-update-movies"
   }

   // ADMIN - ERASE MOVIE
   deleteThisNowShowingMovie(deleteThisMovieBy){
      axios.delete(process.env.REACT_APP_NOWSHOWING + deleteThisMovieBy.ticketId, {
         headers: {authorization: 'Bearer ' + localStorage.getItem("jwtToken")}
      })
      .then(() => {
         Swal.fire(
            "Berhasil!", 
            "Berhasil menghapus film '" + deleteThisMovieBy.movieName + "', silahkan refresh page untuk melihat perubahan!", 
            "success")
         .then(() => {window.location = "/now-showing/all"})
      })
      .catch((err) => {alert(err.message)})
   }

   // RENDER
   render(){
      return (
         <div className="showInAnimation">
            <Helmet>
               <title>{this.state.nowShowingLength == 1 ? this.state.nowShowing[0].movieName : "Tickitz - Now Showing List"}</title>
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
                        <Link className="dropdown-item" onClick={this.changeGenre} genre="Animation">Animation</Link>
                        <Link className="dropdown-item" onClick={this.changeGenre} genre="Comedy">Comedy</Link>
                        <Link className="dropdown-item" onClick={this.changeGenre} genre="Drama">Drama</Link>
                        <Link className="dropdown-item" onClick={this.changeGenre} genre="Horror">Horror</Link>
                        <Link className="dropdown-item" onClick={this.changeGenre} genre="Romance">Romance</Link>
                        <Link className="dropdown-item" onClick={this.changeGenre} genre="Sci-fi">Sci-Fi</Link>
                        <Link className="dropdown-item" onClick={this.changeGenre} genre="Thriller">Thriller</Link>
                     </div>
                  </div>
                  { this.state.movieGenre !== "" ?
                  <p className="noMargin paddingForGenreGroup someMoviesFound borderTopGenre">'{this.state.nowShowingLength}' now-showing movies found with genre of '{this.state.movieGenre}'</p>
                  :
                  null
                  }
               </div>
            </div>
            }
            {this.state.nowShowing.map((item) =>
            <div className="nowShowingMovieDetails">
               <div className="movieDetailsImgBorder">
                  <img className="movieDetailsImg" src={item.movieImgUrl}/>
               </div>
               <div className="movieDetailsInfo">
                  <div className="movieDetailsTitleAndGenre">
                     <p className="movieDetailsTitle">{item.movieName}</p>
                     <p className="movieDetailsGenre">{item.movieGenre}</p>
                  </div>
                  <div className="movieDetailsMoreInfo">
                     <div className="movieDetailsRowOne">
                        <div className="insideMovieDetailsRowOne">
                           <div className="insideMovieDetailsRowAgain">
                              <p className="topTextMovieDetails">Release date</p>
                              <p className="bottomTextMovieDetails">{item.releaseDate}</p>
                           </div>
                           <div className="insideMovieDetailsRowAgain">
                              <p className="topTextMovieDetails">Duration</p>
                              <p className="bottomTextMovieDetails">{item.movieDuration}</p>
                           </div>
                        </div>
                     </div>
                     <div className="movieDetailsRowTwo">
                        <div className="insideMovieDetailsRowAgain">
                           <p className="topTextMovieDetails">Directed by</p>
                           <p className="bottomTextMovieDetails">{item.directedBy}</p>
                        </div>
                        <div className="insideMovieDetailsRowAgain">
                           <p className="topTextMovieDetails">Casts</p>
                           <p className="bottomTextMovieDetails">{item.movieCasts}</p>
                        </div>
                     </div>
                  </div>
                  <div className="thisIsLineBreaksMovieDetails"/>
                  <div className="movieDetailsSynopsis">
                     <p className="synopsisText">Synopsis</p>
                     <p className="afterSynopsisText">{item.movieSynopsis}</p>
                  </div>
                  {localStorage.getItem("userRole") === "admin" ?
                     <div className="adminMovieBtnArea">
                        <button className="hoverThis adminNowShowingBtn adminUpdateFilmBtn" onClick={this.updateThisNowShowingMovie.bind(this, item)}>Update Newest Data</button>
                        <button className="hoverThis adminNowShowingBtn adminRemoveFilmBtn" onClick={this.deleteThisNowShowingMovie.bind(this, item)}>Remove This Film</button>
                     </div>
                  : null}
               </div>
            </div>
            )}
            {this.state.nowShowingLength == 1 ? <ShowtimesAndTickets/> : null}
            <Footer/>
         </div>
      )
   }
}