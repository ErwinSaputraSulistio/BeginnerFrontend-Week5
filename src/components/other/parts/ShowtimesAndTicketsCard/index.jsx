import './style.css'
import { PurpleBookNowButton, TransparentButton } from '../Button'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

// SHOWTIMES & TICKETS (TICKITZ)
const setStartTime = (e) => {
   // localStorage.setItem("startTime", e.target.getAttribute("value")), 
   localStorage.setItem("cinemaUrl", e.target.getAttribute("cinemaUrl")), 
   localStorage.setItem("cinemaName", e.target.getAttribute("cinemaName"))
}
export function ShowtimesAndTicketsCard({ selectedCity }){
   const dispatch = useDispatch()
   const {allCinema} = useSelector(state => state.cinema)
   const getCinema = () => {
      axios.get("http://localhost:2000/v1/cinemas/all")
      .then((res) => { dispatch({type: "CINEMA_ALL", payload: res.data.outputData}) })
      .catch((err) => {alert(err.message)})
   }
   const[cinemaByLocation, setCinema] = useState([])
   const filterCinemaByLocation = () => {
      if(allCinema.length === 0) { return null }
      else{
         let currentFilter = []
         for(let i = 0; i <= allCinema.length - 1; i++){
            if(allCinema[i].cinemaLocation.includes(selectedCity)) {
               currentFilter.push(allCinema[i])
            }
         }
         setCinema(currentFilter)
      }
   }
   useEffect(() => { getCinema() }, [])
   useEffect(() => { setCinema(allCinema) }, [allCinema])
   useEffect(() => { if(selectedCity !== "Location") { filterCinemaByLocation() } }, [selectedCity])
   return(
      <div className="ticketsCardRow">
         {
         cinemaByLocation.map((item) => {
            const cinemaName = item.cinemaName
            const cinemaUrl = item.cinemaLogo
            const cinemaTimeSplit = item.cinemaTime.split(",")
            const firstFourTimeCinema = cinemaTimeSplit.slice(0,4)
            const lastFourTimeCinema = cinemaTimeSplit.slice(4,8)
            return(<div className="showtimesAndTicketsCard">
               <div className="cardFlexRow eightPadding fourPaddingBottom topInfoCardBorder">
                  <img className="orderHistoryCinemaImg" src={item.cinemaLogo}/>
                  <div className="cinemaInformation">
                     <p className="cinemaName boldText mulish noMargin">{item.cinemaName}</p>
                     <p className="cinemaStreet greyText mulish noMargin">{item.cinemaLocation}</p>
                  </div>
               </div>
               <div className="timeFlexRow mulish">
                  <div className="cardFlexColumn">
                     <div className="cardFlexRow timeGap">
                        {firstFourTimeCinema.map((item) => { return(<Link className="showtimesTimeText" cinemaName={cinemaName} cinemaUrl={cinemaUrl} value={item} onClick={setStartTime}>{item}</Link>) })}
                     </div>
                     <div className="cardFlexRow timeGap">
                        {lastFourTimeCinema.map((item) => { return(<Link className="showtimesTimeText" cinemaName={cinemaName} cinemaUrl={cinemaUrl} value={item} onClick={setStartTime}>{item}</Link>) })}
                     </div>
                  </div>
               </div>
               <div className="cardFlexRow eightPaddingSideOnly priceTextCard">
                  <p className="mulish noMargin greyText">Price</p>
                  <p className="mulish noMargin boldText">IDR {localStorage.getItem("ticketPrice")} / seat</p>
               </div>
               <div className="cardFlexRow eightPadding fourPaddingBottom">
                  <PurpleBookNowButton/>
                  <TransparentButton/>
               </div>
            </div>)
         })}
      </div>
   )
}