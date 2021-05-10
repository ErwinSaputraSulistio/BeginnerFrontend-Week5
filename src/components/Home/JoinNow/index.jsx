import './style.css'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'

export default function JoinNow() {
   return (
      <div className="joinNow">
         <div className="insideJoinNow">
            <div className="joinNowColumnOne">
               <p className="textSet vanguardText">Be the vanguard of the</p>
               <p className="textSet moviegoersText">Moviegoers</p>
            </div>
            <div className="joinNowColumnTwo">
               <form className="joinNowFormSetUp">
                  <div className="inputJoinNowBorder">
                     <input className="inputJoinNow" type="email" placeholder="Type your email" required/>
                  </div>
                  <button className="textSet joinNowBtn">Join Now</button>
               </form>
            </div>
            <div className="joinNowColumnThree">
               <p className="textSet joinBottomText removeLineHeight">By joining you as a Tickitz member,</p>
               <p className="textSet joinBottomText">we will always send you the latest updates via email.</p>
            </div>
         </div>
      </div>
   )
}