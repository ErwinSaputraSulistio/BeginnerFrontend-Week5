import { Helmet } from 'react-helmet'
import './style.css'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import {Link} from 'react-router-dom'

export default function ProfilePage(){
   return(
      <div className="showInAnimation">
         <Helmet>
            <title>Tickitz - Profile Page</title>
         </Helmet>
         <Navbar/>
         <div className="profilePage">
            <div className="leftSideProfile">
               <div className="topLeftProfile">
                  <div className="profileInfoTop">
                     <p className="mulishFont infoTextInsideProfile">INFO</p>
                     <Link className="hoverThis" to=""><img className="tripleDots" src="https://user-images.githubusercontent.com/77045083/111041826-d46a4200-846c-11eb-9cbf-8f53b335616b.png"/></Link>
                  </div>
                  <img className="hoverThis profilePicture" src="https://user-images.githubusercontent.com/77045083/111042275-3035ca80-846f-11eb-965e-44619835c99d.jpg"/>
                  <p className="noMargin profileName textSet">My name is Klee</p>
                  <p className="profileTitle textSet">Genshin Impact</p>
               </div>
               <div className="bottomLeftProfile">
                  <p className="mulishFont loyaltyPointsText">Loyalty Points</p>
                  <img className="moviegoersPointCard" src="https://user-images.githubusercontent.com/77045083/111043396-e354f280-8474-11eb-9f2a-182fc02f33a4.png"/>
               </div>
            </div>
            <div className="rightSideProfile">
            </div>
         </div>
         <Footer/>
      </div>
   )
}