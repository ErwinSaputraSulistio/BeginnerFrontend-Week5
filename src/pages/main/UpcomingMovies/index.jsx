import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import './style.css'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'

export default class UpcomingMovies extends Component {
   constructor(props){
      super(props)
      this.state = ""
   }
   componentDidMount(){
      const paramsId = this.props.match.params.id
      axios.get(process.env.REACT_APP_UPCOMING + paramsId)
      .then((res) => {
         const setUpResData = res.data.outputData[0].upcomingId
         setUpResData === undefined ? alert(res.data.outputData) :
         this.setState(res.data.outputData[0])
      })
      .catch((err) => {alert(err.message)})
   }
   render(){
      return (
         <div className="showInAnimation">
            <Helmet>
               <title>{this.state.upcomingName}</title>
            </Helmet>
            <Navbar/>
            <div className="movieDetails">
               <div className="movieDetailsImgBorder">
                  <img className="movieDetailsImg" src={"/images/Home/Upcoming Movies/" + this.state.upcomingId + ".jpg"}/>
               </div>
               <div className="movieDetailsInfo">
                  <div className="movieDetailsTitleAndGenre">
                     <p className="movieDetailsTitle">{this.state.upcomingName}</p>
                     <p className="movieDetailsGenre">{this.state.upcomingGenre}</p>
                  </div>
                  <div className="movieDetailsMoreInfo">
                     <div className="movieDetailsRowOne">
                        <div className="insideMovieDetailsRowOne">
                           <div className="insideMovieDetailsRowAgain">
                              <p className="topTextMovieDetails">Release date</p>
                              <p className="bottomTextMovieDetails">{this.state.releaseDate}</p>
                           </div>
                           <div className="insideMovieDetailsRowAgain">
                              <p className="topTextMovieDetails">Duration</p>
                              <p className="bottomTextMovieDetails">{this.state.movieDuration}</p>
                           </div>
                        </div>
                     </div>
                     <div className="movieDetailsRowTwo">
                        <div className="insideMovieDetailsRowAgain">
                           <p className="topTextMovieDetails">Directed by</p>
                           <p className="bottomTextMovieDetails">{this.state.directedBy}</p>
                        </div>
                        <div className="insideMovieDetailsRowAgain">
                           <p className="topTextMovieDetails">Casts</p>
                           <p className="bottomTextMovieDetails">{this.state.movieCasts}</p>
                        </div>
                     </div>
                  </div>
                  <div className="lineBreaksMovieDetails"/>
                  <div className="movieDetailsSynopsis">
                     <p className="synopsisText">Synopsis</p>
                     <p className="afterSynopsisText">{this.state.upcomingSynopsis}</p>
                  </div>
               </div>
            </div>
            <Footer/>
         </div>
      )
   }
}