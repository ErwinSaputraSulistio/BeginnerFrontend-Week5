import './style.css'
import { Helmet } from 'react-helmet'
import { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function ResetPassword(){
   const [isJwtValid, setJwtValid] = useState(false)
   const [resetMail, setResetMail] = useState(null)
   const [resetPassword, setResetPassword] = useState({checkJwtToken: "", newPassword: "", retypePassword: ""})
   const history = useHistory()
   const { id } = useParams()
   useEffect(() => {
      if(id !== "send-mail") {
         axios.get(process.env.REACT_APP_USER + "reset/" + id)
         .then(() => { 
            setJwtValid(true)
            setResetPassword({ ...resetPassword, checkJwtToken: id })
         })
         .catch(() => {
            Swal.fire("Error?!", "Token JWT untuk reset password invalid, kembali ke halaman login!", "error")
            .then(() => { history.push("/login") })
         })
      }
   }, [])
   // ONCHANGE & SEND RESET PASSWORD MAIL
   const sendMailChange = (e) => { setResetMail(e.target.value) }
   const sendMail = (e) => {
      e.preventDefault()
      const sendThisResetMail = { userEmail: resetMail }
      axios.post(process.env.REACT_APP_USER + "reset/send-mail", sendThisResetMail)
      .then(() => {
         Swal.fire("Berhasil!", "Silahkan cek email kamu untuk melanjutkan proses reset password!", "success")
         .then(() => { history.push("/login") })
      })
      .catch(() => { Swal.fire("Error?!", "Terjadi sebuah kesalahan, silahkan coba lagi!", "error") })
   }

   // ONCHANGE & SET NEW PASSWORD
   const setPasswordChange = (e) => { setResetPassword({...resetPassword, [e.target.name]: e.target.value}) }
   const setNewPassword = (e) => {
      e.preventDefault()
      const { checkJwtToken, newPassword, retypePassword } = resetPassword
      const setNewPasswordData = { checkJwtToken, newPassword, retypePassword }
      axios.put(process.env.REACT_APP_USER + "reset/new-password", setNewPasswordData)
      .then(() => {
         Swal.fire("Berhasil!", "Proses reset password selesai, silahkan coba login dengan password baru!", "success")
         .then(() => { history.push("/login") })
      })
      .catch((err) => { Swal.fire("Error?!", err.response.data.errorMessage, "error") })
   }
   console.log(resetPassword)
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
               {isJwtValid === false ?
               <div className="insideRightFlex">
                  <div className="signInText">
                     <p className="mulishFont resetBigText">Fill your complete email</p>
                     <p className="mulishFont forgotPasswordText">Forgot password</p>
                     <p className="mulishFont resetSmallText">we'll send a link to your email shortly</p>
                  </div>
                  <form onSubmit={ (e) => { sendMail(e) } }>
                     <label className="labelInput mulishFont" for="email">Email</label>
                     <div className="borderInput">
                        <input className="input" type="email" id="email" onChange={ (e) => { sendMailChange(e) } } placeholder="Write your email" value={resetMail}/>
                     </div>
                     <input className="hoverEffect mulishFont noMargin submitBtn" type="submit" value="Reset now"/>
                  </form>
               </div>
               : 
               <div className="insideRightFlex">
                  <div className="signInText">
                     <p className="mulishFont resetBigText">Set up your new password</p>
                     <p className="mulishFont forgotPasswordText">Change password</p>
                     <p className="mulishFont resetSmallText">Make a new password to replace the old one</p>
                  </div>
                  <form onSubmit={ (e) => { setNewPassword(e) } }>
                     <label className="labelInput mulishFont" for="email">New Password</label>
                     <div className="borderInput">
                        <input className="input" type="password" id="email" name="newPassword" onChange={ (e) => { setPasswordChange(e) } } placeholder="New password..." value={resetPassword.newPassword}/>
                     </div>
                     <label className="labelInput mulishFont" for="email">Re-type Password</label>
                     <div className="borderInput">
                        <input className="input" type="password" id="email" name="retypePassword" onChange={ (e) => { setPasswordChange(e) } } placeholder="Re-type password..." value={resetPassword.retypePassword}/>
                     </div>
                     <input className="hoverEffect mulishFont noMargin submitBtn" type="submit" value="Set Password"/>
                  </form>
               </div>
               }
            </div>
         </div>
      </div>
   )
}