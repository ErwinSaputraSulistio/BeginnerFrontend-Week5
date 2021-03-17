import React, { Component } from 'react'
import axios from 'axios'
import './style.css'
import { Helmet } from 'react-helmet'
import { Link } from'react-router-dom'

export default class Login extends Component {
   constructor(props) {
      super(props)
      this.state = {
         loginEmail: '',
         loginPassword: '',
         loginData: ''
      }
    }
    loginChange = (e) => {this.setState({[e.target.name]: e.target.value})}
    loginSubmit = (e) => {
      e.preventDefault()
      const { loginEmail, loginPassword } = this.state
      axios.get(process.env.REACT_APP_USER + 'login?email=' + loginEmail + '&pass=' + loginPassword)
      .then((res) => {
         if(localStorage.getItem("isLoggedIn") === "true"){
            alert("Anda sudah login " + localStorage.getItem("userName") + ", jika ingin mengganti user maka harap logout dahulu!")
            window.location = "/home-page"
         }
         else{
            this.setState({ loginData: res.data.outputData[0] })
            localStorage.setItem("isLoggedIn", true)
            localStorage.setItem("userId", this.state.loginData.userId)
            localStorage.setItem("userName", this.state.loginData.realName)
            localStorage.setItem("userRole", this.state.loginData.userRole)
            alert("Login berhasil! Selamat datang, " + this.state.loginData.userRole + " " + this.state.loginData.realName + "!")
            window.location = "/home-page"
         }
      })
      .catch(() => {alert("Gagal login, email belum terdaftar atau password salah!")})
   };
   render(){   
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
                     <form onSubmit={this.loginSubmit}>
                        <label className="labelInput mulishFont" for="email">Email</label>
                        <div className="borderInput">
                           <input className="input" type="email" id="email" name="loginEmail" placeholder="Write your email" onChange={this.loginChange} required/>
                        </div>
                        <label className="labelInput mulishFont" for="password">Password</label>
                        <div className="borderInput">
                           <input className="input" type="password" id="password" name="loginPassword" placeholder="Write your password" onChange={this.loginChange} required/>
                           <img className="eyeLogo" src="https://user-images.githubusercontent.com/77045083/111035327-86454680-844c-11eb-8be5-8d01d3189c35.png" onclick="showPass()"/>
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
}