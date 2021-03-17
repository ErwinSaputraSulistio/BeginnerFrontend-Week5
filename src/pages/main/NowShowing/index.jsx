import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import './style.css'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export default class NowShowing extends Component {
   constructor(props){
      super(props)
      this.state = {
         nowShowing: [],
         nowShowingObject: ""
      }
   }
   componentDidMount(){
      const paramsId = this.props.match.params.id
      this.callAxios(paramsId)
   }
   callAxios = (paramsId) => {
      paramsId === undefined && (paramsId = 'all')
      console.log(paramsId)

      console.log(process.env.REACT_APP_NOWSHOWING)
      axios.get('http://localhost:2000/v1/tickets/' + paramsId)
      .then((res) => {
         const setUpResData = res.data.outputData[0].ticketId
         setUpResData === undefined ? alert(res.data.outputData) :
         this.setState({
            nowShowing: res.data.outputData,
            nowShowingLength: res.data.outputData.length
         })
      })
      .catch((err) => {alert(err.message)})
      
   }

   // ADMIN - CHANGE DATA
   updateThisNowShowingMovie(updateThisMovieBy){
      localStorage.setItem("updateMovieId", updateThisMovieBy.ticketId)
      localStorage.setItem("adminMoviesAction", "updateMovies")
      window.location = "/admin/add-or-update-movies"
   }

   // ADMIN - ERASE MOVIE
   deleteThisNowShowingMovie(deleteThisMovieBy){
      axios.delete(process.env.REACT_APP_NOWSHOWING + deleteThisMovieBy.ticketId)
      .then(() => {
         alert("Berhasil menghapus film '" + deleteThisMovieBy.movieName + "', silahkan refresh page untuk melihat perubahan!")
         window.location = "/now-showing/all"
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
               <div className="borderLinesBetween"/>
            </div>
            )}
            <Footer/>
         </div>
      )
   }
}