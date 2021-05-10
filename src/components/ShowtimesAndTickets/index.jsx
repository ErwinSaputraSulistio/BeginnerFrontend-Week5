import './style.css'
import { ShowtimesAndTicketsCard } from '../other/parts/ShowtimesAndTicketsCard'
import calendarLogo from './Logo/calendar.png'
import locationLogo from './Logo/location.png'
import { useState } from 'react'

// SHOWTIMES & TICKETS (TICKITZ)
export function ShowtimesAndTickets(){
   const [cinemaLocation, setLocation] = useState("Location")
   const changeShowDate = (e) => {localStorage.setItem("showDate", e.target.value)}
   const changeLocation = (e) => { 
      localStorage.setItem("cinemaLocation", e.target.getAttribute('value'))
      setLocation(e.target.getAttribute('value')) 
   }
   return(
      <div className="mulish showtimesAndTickets">
         <p className="boldText showtimesTicketsTextBig">Showtimes and Tickets</p>
         <div className="twoShowtimesButtons">
            <div class="hoverThis oneOfTheShowtimesButtons btn-group">
               <img className="showtimesLogo" src={calendarLogo}/><input class="calendarInput" type="date" placeholder="Set a date" onChange={changeShowDate}/>
            </div>
            <div class="btn-group hoverThis oneOfTheShowtimesButtons">
               <button type="button" class="locationDropdown btn shadow-none"><img className="showtimesLogo" src={locationLogo}/>{cinemaLocation}</button>
               <button type="button" class="btn dropdown-toggle locationToggle dropdown-toggle-split shadow-none" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
               <span class="sr-only"></span>
               </button>
               <ul class="locationSelect dropdown-menu" value="menu">
                  <li class="dropdown-item" onClick={changeLocation} value="Jakarta">Jakarta</li>
                  <li class="dropdown-item" onClick={changeLocation} value="Bogor">Bogor</li>
                  <li class="dropdown-item" onClick={changeLocation} value="Depok">Depok</li>
                  <li class="dropdown-item" onClick={changeLocation} value="Tangerang">Tangerang</li>
                  <li class="dropdown-item" onClick={changeLocation} value="Bekasi">Bekasi</li>
               </ul>
            </div>
         </div>
         <ShowtimesAndTicketsCard selectedCity = {cinemaLocation}/>
      </div>
   )
}