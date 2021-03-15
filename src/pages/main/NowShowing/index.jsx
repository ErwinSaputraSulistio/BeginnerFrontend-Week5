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
      axios.get(process.env.REACT_APP_NOWSHOWING + paramsId)
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
                  <img className="movieDetailsImg" src={"/images/Home/Now Showing/" + item.ticketId + ".jpg"}/>
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
               </div>
               <div className="borderLinesBetween"/>
            </div>
            )}
            <Footer/>
         </div>
      )
   }
}