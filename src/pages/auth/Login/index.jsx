import { useState, useEffect } from 'react'
import axios from 'axios'
import './style.css'
import { Helmet } from 'react-helmet'
import { Link } from'react-router-dom'
import Swal from 'sweetalert2'

export default function Login() {
   const [saveAllLoginData, setLogin] = useState({
      loginEmail: '',
      loginPassword: '',
      jwtToken: '',
      showPassword: false
   })
   const alreadyLogin = () => {
      Swal.fire(
         "Login lagi?", 
         "Anda sudah login " + localStorage.getItem("userRole") + " " + localStorage.getItem("userName") + ", jika ingin mengganti user maka harap logout dahulu!", 
         "question")
      .then(() => {window.location = "/home-page"})
   }
   const passwordVisibility = () => {setLogin({...saveAllLoginData, showPassword: !saveAllLoginData.showPassword})}
   const loginChange = (e) => {setLogin({...saveAllLoginData, [e.target.name]: e.target.value})}
   const loginSubmit = (e) => {
      e.preventDefault()
      const { loginEmail, loginPassword } = saveAllLoginData
      const userLogin = { loginEmail, loginPassword }
      axios.post(process.env.REACT_APP_USER + "login", userLogin)
      .then((res) => {
         if(res.data.statusCode === 404) {
            Swal.fire(
               "Login gagal!", 
               res.data.errorMessage, 
               "error")
         }
         else{
            const {userId, realName, userRole} = res.data.outputData[0]
            localStorage.setItem("isLoggedIn", true)
            localStorage.setItem("userId", userId)
            localStorage.setItem("userName", realName)
            localStorage.setItem("userRole", userRole)
            localStorage.setItem("jwtToken", res.data.jwtSecretKey)
            Swal.fire(
               "Login berhasil!", 
               "Selamat datang, " + userRole + " " + realName + "!", 
               "success")
            .then(() => {window.location = "/home-page"})
         }
      })
      .catch((err) => {
         Swal.fire(
            "Ups, login gagal!", 
            err.response.data.errorMessage, 
            "error")
      })
   }
   useEffect(() => {
      if(localStorage.getItem("isLoggedIn") === "true") { alreadyLogin() }
      else if(localStorage.getItem("verifyStatus") === "Success") {
         Swal.fire("Selesai!", "Akun kamu berhasil di verifikasi, silahkan login!", "success")
         .then(() => { localStorage.removeItem("verifyStatus") })
      }
      else if(localStorage.getItem("verifyStatus") === "Failed") {
         Swal.fire("Error?!", "Gagal verifikasi akun, token aktivasi tidak valid!", "error")
         .then(() => { localStorage.removeItem("verifyStatus") })
      }
   }, [])
   return(
      <div>
         <Helmet>
            <title>Tickitz - Login</title>
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
                     <h1 className="signInBigText">Sign In</h1>
                     <p className="signInSmallText">Sign in with your data that you entered during your registration</p>
                  </div>
                  <form onSubmit={(e) => {loginSubmit(e)} }>
                     <label className="labelInput mulishFont" for="email">Email</label>
                     <div className="borderInput">
                        <input className="input" type="email" id="email" name="loginEmail" placeholder="Write your email" onChange={(e) => {loginChange(e)} } required/>
                     </div>
                     <label className="labelInput mulishFont" for="password">Password</label>
                     <div className="borderInput">
                        <input className="input" type={saveAllLoginData.showPassword ? "text" : "password"} id="password" name="loginPassword" placeholder="Write your password" onChange={(e) => {loginChange(e)} } required/>
                        <img className="eyeLogo" src="https://user-images.githubusercontent.com/77045083/111035327-86454680-844c-11eb-8be5-8d01d3189c35.png" onClick={() => {passwordVisibility()} }/>
                     </div>
                     <input className="hoverEffect mulishFont submitBtn" type="submit" value="Sign In"/>
                  </form>
                  <div className="optionLoginButton">
                  <Link className="hoverEffect mulishFont resetNowText" to="/register"><u>Create new account</u></Link>
                  <Link className="hoverEffect mulishFont resetPasswordNow resetNowText" to="/reset-password"><u>Reset password</u></Link>
                  </div>
               </div>
               <p className="lineBreaks"><span>Or</span></p>
               <div className="bottomSignInBtnArea">
                  <Link className="hoverEffect mulishFont bottomBtn" to=""><img class="btnLogo" src="https://user-images.githubusercontent.com/77045083/111033436-c7852880-8443-11eb-8377-6d96716a199a.png"/><span className="hideInMobile">Google</span></Link>
                  <Link className="hoverEffect mulishFont bottomBtn" to=""><img class="btnLogo" src="https://user-images.githubusercontent.com/77045083/111033438-c81dbf00-8443-11eb-99b1-e099755eadbb.png"/><span className="hideInMobile">Facebook</span></Link>
               </div>
            </div>
         </div>
      </div>
   )
}