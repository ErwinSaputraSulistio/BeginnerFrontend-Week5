import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import './style.css'

export default function UpcomingMovies() {
   const history = useHistory()
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
                  <img class="movieImg" src ={item.upcoming_img}/>
                  <div class="upcomingMoviesBorderFlex">
                     <div className="titleBorderTwo">
                        <div className="textSet upcomingMoviesTitle">{item.upcoming_name}</div>
                        <div className="textSet upcomingMoviesGenre">{item.upcoming_genre}</div>
                     </div>
                     <div className="btnBorder">
                        <a className="textSet btnDetail" onClick={ () => { history.push("/upcoming-movies/" + item.upcoming_id) } } target="_blank">Details</a>
                     </div>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}