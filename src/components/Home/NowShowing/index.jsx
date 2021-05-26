import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getNowShowing } from '../../../configs/redux/action/cinema'
import axios from 'axios'
import './style.css'

export default function NowShowing() {
   const history = useHistory()
   const dispatch = useDispatch()
   const {nowShowingAll} = useSelector(state => state.cinema)
   useEffect(() => { dispatch(getNowShowing()) }, [])
   return(
      <div className="nowShowing">
         <div className="nowShowingHeader">
            <div class="textSet nowShowingText">Now Showing</div>
            <a href="/now-showing/all" target="_blank"><div class="textSet viewAll">view all</div></a>
         </div>
         <div className="nowShowingList">
            {nowShowingAll.map((item) =>
               <div className="nowShowingMovie">
                  <img class="nowShowingMovieImg" src = {item.movie_img}/>
                  <div className="showWhenHover titleBorder">
                     <div className="textSet nowShowingTitle">{item.movie_name}</div>
                     <div className="textSet nowShowingGenre">{item.movie_genre}</div>
                  </div>
                  <div className="showWhenHover btnBorder">
                     <button className="textSet btnDetail" onClick={ () => { history.push("/now-showing/" + item.ticket_id) }} target="_blank">Details</button>
                     <button className="textSet btnBookNow" onClick={ () => { history.push("/now-showing/" + item.ticket_id) }} target="_blank">Book Now</button>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}