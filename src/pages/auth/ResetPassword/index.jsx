import './style.css'
import { Helmet } from 'react-helmet'

export default function ResetPassword(){
   return(
      <div>
         <Helmet>
            <title>Tickitz - Reset Password</title>
         </Helmet>
         <div className="doubleSidedPage">
            <div className="leftSide">
            <div className="colorOpacity"></div>
            <img className="logo" src="https://user-images.githubusercontent.com/77045083/111033062-fe5a3f00-8441-11eb-96cd-1b88636eacae.png"/>
            <p className="textBelowLogo">wait, watch, wow!</p>
            </div>
            <img className="hiddenTickitzLogo" src="https://user-images.githubusercontent.com/77045083/111034042-69a61000-8446-11eb-9836-4d9463b438eb.png"/>
            <div className="rightSide">
               <div className="insideRightFlex">
                  <div className="signInText">
                     <p className="mulishFont resetBigText">Fill your complete email</p>
                     <p className="mulishFont forgotPasswordText">Forgot password</p>
                     <p className="mulishFont resetSmallText">we'll send a link to your email shortly</p>
                  </div>
                  <form>
                     <label className="labelInput mulishFont" for="email">Email</label>
                     <div className="borderInput">
                        <input className="input" type="email" id="email" placeholder="Write your email"/>
                     </div>
                     <input className="hoverEffect mulishFont noMargin submitBtn" type="submit" value="Activate now"/>
                  </form>
               </div>
            </div>
         </div>
      </div>
   )
}