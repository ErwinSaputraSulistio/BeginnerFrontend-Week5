import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import './style.css'

export default function UpcomingMovies() {
   const dispatch = useDispatch()
   const {upcomingAll} = useSelector(state => state.cinema)
   const getUpcoming = () => {
      axios.get(process.env.REACT_APP_UPCOMING_NOSLASH + '?page=1&limit=6')
      .then((res) => { 
         dispatch({type: "UPCOMING_ALL", payload: res.data.outputData})
      })
      .catch((err) => {alert(err.message)})
   }
   useEffect(() => { getUpcoming() }, [])
   return(
      <div className="upcomingMovies">
         <div className="nowShowingHeader">
            <div class="textSet upcomingMoviesText">Upcoming Movies</div>
            <a href="/upcoming-movies/all" target="_blank"><div class="textSet viewAll">view all</div></a>
         </div>
         <div className="upcomingMoviesFlex">
            {upcomingAll.map((item) =>
               <div className="upcomingMoviesList">
                  <img class="movieImg" src ={item.upcomingImgUrl}/>
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