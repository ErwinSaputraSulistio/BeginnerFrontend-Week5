import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import './style.css'
import Navbar from '../../../components/Navbar'
import NowShowing from '../../../components/Home/NowShowing'
import UpcomingMovies from '../../../components/Home/UpcomingMovies'
import JoinNow from '../../../components/Home/JoinNow'
import Footer from '../../../components/Footer'

export default class HomePage extends Component {
   render(){
      return (
         <div className="showInAnimation">
            <Helmet>
               <title>Tickitz - Home Page</title>
            </Helmet>
            <Navbar/>
            <div className="headerDesktop movieShow container-fluid">
               <div className="headerText headerMobile">
                  <p className="text nearestCinema">Nearest Cinema, Newest Movie,</p>
                  <p className="text findOutNow">Find out now!</p>
               </div>
               <div className="headerDisplay">
                  <div className="displayList">
                     <img className="display displayMobile display-left" src="/images/Home/display-left.png" />
                     <img className="display displayMobile display-center" src="/images/Home/display-center.png" />
                     <img className="display displayMobile display-right" src="/images/Home/display-right.png" />
                  </div>
               </div>
            </div>
            <NowShowing/>
            <UpcomingMovies/>
            <JoinNow/>
            <Footer/>
         </div>
      )
   }
}