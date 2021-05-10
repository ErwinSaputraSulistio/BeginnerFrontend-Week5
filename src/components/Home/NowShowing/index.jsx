import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getNowShowing } from '../../../configs/redux/action/cinema'
import axios from 'axios'
import './style.css'

export default function NowShowing() {
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
                  <img class="nowShowingMovieImg" src = {item.movieImgUrl}/>
                  <div className="showWhenHover titleBorder">
                     <div className="textSet nowShowingTitle">{item.movieName}</div>
                     <div className="textSet nowShowingGenre">{item.movieGenre}</div>
                  </div>
                  <div className="showWhenHover btnBorder">
                     <a className="textSet btnDetail" href={"localhost:3000/now-showing/" + item.ticketId} target="_blank">Details</a>
                     <a className="textSet btnBookNow" href={"localhost:3000/now-showing/" + item.ticketId} target="_blank">Book Now</a>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}