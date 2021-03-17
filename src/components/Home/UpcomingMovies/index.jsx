import React, { Component } from 'react'
import axios from 'axios'
import './style.css'

export default class UpcomingMovies extends Component {
   constructor(){
      super()
      this.state={
         films: []
      }
   }
   componentDidMount(){
      axios.get(process.env.REACT_APP_UPCOMING_NOSLASH + '?page=1&limit=5')
      .then((res) => {
         this.setState({ films: res.data.outputData })
      })
      .catch((err) => {alert(err.message)})
   }
   render(){
      return(
         <div className="upcomingMovies">
            <div className="nowShowingHeader">
               <div class="textSet upcomingMoviesText">Upcoming Movies</div>
               <a href="https://www.instagram.com/alegoplex.es" target="_blank"><div class="textSet viewAll">view all</div></a>
            </div>
            <div className="upcomingMoviesFlex">
               {this.state.films.map((item) =>
                <div className="upcomingMoviesList">
                     <img class="movieImg" src ={"/images/Home/Upcoming Movies/" + item.upcomingId + ".jpg"}/>
                     <div class="upcomingMoviesBorderFlex">
                        <div className="titleBorderTwo">
                           <div className="textSet upcomingMoviesTitle">{item.upcomingName}</div>
                           <div className="textSet upcomingMoviesGenre">{item.upcomingGenre}</div>
                        </div>
                        <div className="btnBorder">
                           <a className="textSet btnDetail" href={"localhost:3000/upcoming-movies/" + item.upcomingId} target="_blank">Details</a>
                        </div>
                     </div>
                </div>
               )}
            </div>
         </div>
      )
   }
}