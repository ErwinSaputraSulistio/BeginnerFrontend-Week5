import React, {Component} from 'react'
import './style.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import {Link} from 'react-router-dom'

export default class Footer extends Component {
   render() {
      return (
         <div className="row footer">
            <div className="col-12 col-md-4 footerFirstColumn">
               <img className="tickitzFooterLogo" src="/images/Footer/tickitz.png"/>
               <div className="footerFirstColumnText">
                  <p class="footerText">Stop waiting in line. Buy tickets</p>
                  <p class="footerText">conveniently, watch movies quietly.</p>
               </div>
            </div>
            <div className="col-12 col-md-2">
               <p className="footerTextTitle">Explore</p>
               <div className="footerSecondColumn">
                  <Link className="footerText">Cinemas</Link>
                  <Link className="moviesListMobile footerText">Movies List</Link>
                  <Link className="footerText">My Ticket</Link>
                  <Link className="mobileCase footerText">Notification</Link>
               </div>
            </div>
            <div className="col-12 col-md-3 offset-md-1">
               <p className="centerThis footerTextTitle">Our Sponsor</p>
               <div className="footerThirdColumn">
                  <img className="imgGap imgEbu" src="/images/Footer/ebu.png"/>
                  <img className="imgGap imgCineone" src="/images/Footer/cineone.png"/>
                  <img className="imgGap imgHiflix" src="/images/Footer/hiflix.png"/>
               </div>
            </div>
            <div className="col-12 col-md-2 footerFourthColumn">
               <p className="footerTextTitle">Follow Us</p>
               <div className="footerRowLogo">
                  <div className="someSpaceLeft footerRowText">
                     <img className="footerLogo" src="/images/Footer/facebook.png"/>
                     <p className="footerText footerFourthColumnText">Tickitz Cinema.id</p>
                  </div>
                  <div className="footerRowText">
                     <img className="footerLogo" src="/images/Footer/instagram.png"/>
                     <p className="footerText footerFourthColumnText">tickitz.id</p>
                  </div>
                  <div className="footerRowText">
                     <img className="footerLogo" src="/images/Footer/twitter.png"/>
                     <p className="footerText footerFourthColumnText">tickitz.id</p>
                  </div>
                  <div className="footerRowText">
                     <img className="footerLogo" src="/images/Footer/youtube.png"/>
                     <p className="footerText footerFourthColumnText">Tickitz Cinema.id</p>
                  </div>
               </div>
            </div>
            <div class="footerBottomText">
               <p className="footerText">&#169; 2020 Tickitz. All Rights Reserved.</p>
            </div>
         </div>
      )
   }
}