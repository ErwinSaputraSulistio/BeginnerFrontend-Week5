import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import './style.css'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import OrderHistory from '../../../components/other/parts/OrderHistory'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

export default class ProfilePage extends Component {
   constructor(props){
      super(props)
      this.state = {
         inputData: "",
         updateFirstName: "",
         updateLastName: "",
         updateEmail: "",
         updateTitle: "",
         eraseInput: "",
         oneOfThreeButtons: "AccountSetting",
         showFirstPassword: false,
         showSecondPassword: false,
         updatePassword: null,
         confirmPassword: null
      }
   }
   componentDidMount(){
      axios.get(process.env.REACT_APP_USER + localStorage.getItem("userId"))
      .then((res) => {
         this.setState({
            inputData: res.data.outputData[0], 
            updateFirstName: res.data.outputData[0].realName, 
            updateEmail: res.data.outputData[0].userEmail, 
            updateTitle: res.data.outputData[0].userJobs})
         })
      .catch((err) => {alert(err.message)})
   }
   // SHOW/HIDE PASSWORD
   firstPasswordVisibility = () => {this.setState({showFirstPassword: !this.state.showFirstPassword})}
   secondPasswordVisibility = () => {this.setState({showSecondPassword: !this.state.showSecondPassword})}
   // CHANGE AVATAR
   changeAvatar = () => {
      Swal.fire({
         icon: "info",
         title: "Change Avatar",
         text: "Silahkan pilih sebuah gambar dari komputer-mu untuk dijadikan Profile Picture baru kamu :", 
         input: 'file',
         inputAttributes: {
            'accept': 'image/*',
            'aria-label': 'Upload your profile picture'
         },
         confirmButtonText: 'Upload',
         showCancelButton: true,
         closeOnConfirm: false,
         animation: "slide-from-top"
         })
      .then((res) => {
         if(res.value === null){ 
            Swal.fire({
               icon: "question",
               title: "Kosong ?!", 
               text: "Gimana uploadnya nih kalau gambarnya gak ada? XD",
               })
          }
         else{
            const data = new FormData()
            data.append("profileImages", res.value)
            axios.patch(process.env.REACT_APP_USER + localStorage.getItem("userId"), data, {
               headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'multipart/form-data' }
            })
            .then((res) => {
               if(res.data.checkResult === "Failed"){
                  Swal.fire({
                     icon: "warning",
                     title: "Security Issue?!", 
                     text: res.data.jwtError,
                  }).then(() => {
                     localStorage.clear()
                     window.location = "/login"
                  })
               }
               else if(res.data.statusCode === 400){
                  Swal.fire({
                     icon: "error",
                     title: "Gagal ~", 
                     text: "Perubahan gambar profile user dibatalkan, tidak ada yang berubah ~",
                  })
               }
               else{
                  Swal.fire({
                     icon: "success",
                     title: "Berhasil!", 
                     text: "Gambar profile kamu sudah berubah nih, refresh page untuk melihat perubahan!",
                  }).then(() => {window.location = "/profile-page/" + localStorage.getItem("userId")})
               }
               
            })
            .catch((err) => {
               if(err.response.data.statusCode === 401){
                  Swal.fire({
                     icon: "warning",
                     title: "Login ulang dulu, yuk?!", 
                     text: err.response.data.jwtError,
                  })
                  .then(() => {
                     window.location = "/login"
                     localStorage.clear()
                  })
               }
               else{
                  Swal.fire({
                     icon: "error",
                     title: "Error!", 
                     text: err.response.data.errorMessage,
                  }) 
               }
            })
            // cek format gambar -  code64, httpbin
            // axios.post("http://httpbin.org/anything", data)
            // .then((res) => {console.log(res)})
         }
      })
      .catch((err) => {
         Swal.fire({
            icon: "error",
            title: "Batal~", 
            text: "Perubahan gambar profile user dibatalkan!",
            })
         console.log(err)
      })
   }

   // UPDATE
   updateHandleSubmit = (e) => {
      e.preventDefault()
      if(this.state.updatePassword !== this.state.confirmPassword) { Swal.fire("Gagal!", "Password baru dan konfirmasi password berbeda!", "error") }
      else{
         const { profileImages, userName, userRole } = this.state.inputData
         const { updateFirstName, updateLastName, updateEmail, updateTitle, updatePassword } = this.state
         const updatedData = {
            realName: updateFirstName + " " + updateLastName,
            userJobs: updateTitle,
            profileImages,
            userName,
            userEmail: updateEmail,
            userPassword: updatePassword,
            userRole
         }
         axios.put(process.env.REACT_APP_USER + localStorage.getItem("userId"), updatedData, {
            headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken") }
         })
         .then(() => {
            Swal.fire(
               "Selesai!", 
               "Berhasil memperbarui data akun dari " + this.state.updateFirstName + " " + this.state.updateLastName + ", refresh page untuk melihat perubahan!", 
               "success")
            .then(() => {window.location = "/profile-page/" + this.state.inputData.userId})
         })
         .catch((err) => {
            Swal.fire(
               "Login lagi, yuk?!", 
               err.response.data.jwtError, 
               "warning")
            .then(() => {
               window.location = "/login"
               localStorage.clear()
            })
         })
      }
   }
   updateChangeHandler = (e) => {this.setState({[e.target.name]: e.target.value})}

   // TURN ON NOTIFICATION
   // turnOnNotification = (e) => {
   //    const { profileImages, userName, userEmail, userPassword, userRole, userJobs } = this.state.inputData
   //    const updatedData = {
   //       realName: this.state.updateFirstName + " " + this.state.updateLastName,
   //       userJobs,
   //       profileImages,
   //       userName,
   //       userEmail,
   //       userPassword,
   //       userRole,
   //       userNotification: e.target.value
   //    }
   //    axios.put(process.env.REACT_APP_USER + localStorage.getItem("userId"), updatedData , {
   //       headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken") }
   //    })
   //    .then(() => {
   //       if(e.target.value === "ON"){
   //          Swal.fire(
   //             "Notifikasi di-aktifkan!", 
   //             "Sekarang semua informasi mengenai film baru akan langsung di-kirimkan ke email kamu, maka dari itu pastikan email kamu valid yah!", 
   //             "success")
   //          .then(() => {window.location = "/profile-page/" + this.state.inputData.userId})
   //       }
   //       else{
   //          Swal.fire(
   //             "Notifikasi di-matikan!", 
   //             "Kini semua informasi penting mengenai film baru tidak akan masuk ke inbox email kamu, lho ~", 
   //             "error")
   //          .then(() => {window.location = "/profile-page/" + this.state.inputData.userId})
   //       }
         
   //    })
   //    .catch((err) => {alert(err.message)})
   // }

   // ERASE
   eraseHandleSubmit = (e) => {
      e.preventDefault()
      if(this.state.eraseInput === "HAPUS"){
         // const paramsId = this.props.match.params.id
         axios.delete(process.env.REACT_APP_USER + localStorage.getItem("userId"), { headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken") } })
         .then(() => {
            Swal.fire(
               "Selesai!", 
               "Berhasil menghapus akun " + this.state.inputData.realName + ", mengarahkan kembali ke halaman login!", 
               "success")
            .then(() => {
               localStorage.clear()
               window.location = "/login"
            })
         })
         .catch((err) => {alert(err.message)})
      }
      else {
         Swal.fire(
            "Gagal ?!", 
            "Tolong ketik kata 'HAPUS', kalau ingin melanjutkan proses penghapusan akun yah ~", 
            "error")
      }
   }
   eraseChangeHandler = (e) => {this.setState({eraseInput: e.target.value})}
   
   // RENDER
   render(){
      if(localStorage.getItem("userId") === null){window.location = "/login"}
      else{
         return(
            <div className="showInAnimation">
               <Helmet>
                  <title>Tickitz - Account Settings</title>
               </Helmet>
               <Navbar/>
               <div className="profilePage">
                  <div className="leftSideProfile">
                     <div className="topLeftProfile">
                        <div className="profileInfoTop">
                           <p className="mulishFont infoTextInsideProfile">INFO</p>
                           <Link className="hoverThis" to=""><img className="tripleDots" src="https://user-images.githubusercontent.com/77045083/111041826-d46a4200-846c-11eb-9cbf-8f53b335616b.png"/></Link>
                        </div>
                        <div className="profilePicture">
                           <Link className="changePictureBtn" onClick={this.changeAvatar}>
                              <img className="profileImage" src={this.state.inputData.profileImages}/>
                              <p className="mulishFont changePictureText">Change Picture</p>
                           </Link>
                        </div>
                        <p className="noMargin profileName textSet">{this.state.inputData.realName}</p>
                        <p className="profileTitle textSet">{this.state.inputData.userJobs}</p>
                     </div>
                     <div className="bottomLeftProfile">
                        <p className="mulishFont loyaltyPointsText">Loyalty Points</p>
                        <img className="hoverThis moviegoersPointCard" src="https://user-images.githubusercontent.com/77045083/111043396-e354f280-8474-11eb-9f2a-182fc02f33a4.png"/>
                     </div>
                  </div>
                  <div className="rightSideProfile">
                     <div className="rightSideProfileTop">
                        <Link className={this.state.oneOfThreeButtons === "AccountSetting" ? "mulishFont profilePageButtonSelection profilePageButtonSelectionActive" : "mulishFont profilePageButtonSelection"} onClick={()=>{this.setState({oneOfThreeButtons: "AccountSetting"})}}>Account Setting</Link>
                        <Link className={this.state.oneOfThreeButtons === "OrderHistory" ? "mulishFont profilePageButtonSelection profilePageButtonSelectionActive" : "mulishFont profilePageButtonSelection"} onClick={()=>{this.setState({oneOfThreeButtons: "OrderHistory"})}}>Order History</Link>
                        <Link className={this.state.oneOfThreeButtons === "MoreConfiguration" ? "mulishFont profilePageButtonSelection profilePageButtonSelectionActive" : "mulishFont profilePageButtonSelection"} onClick={()=>{this.setState({oneOfThreeButtons: "MoreConfiguration"})}}>More Configuration</Link>
                     </div>
                     {this.state.oneOfThreeButtons === "OrderHistory" ? 
                     <OrderHistory/>
                     : 
                     this.state.oneOfThreeButtons === "MoreConfiguration" ?
                     <div className="rightSideProfileBottom">
                        <div className="userNotificationAndDelete">
                           {/* <div className="userNotificationZone">
                              <p className="mulishFont noMargin notificationText">Notification : 
                              {this.state.inputData.userNotification === "ON" ? 
                              <button className="hoverThis onSwitch" onClick={this.turnOnNotification} value="OFF">ON</button> 
                              : 
                              <button className="hoverThis offSwitch" onClick={this.turnOnNotification} value="ON"> OFF</button>}
                              </p>
                           </div> */}
                           <div className="userDeleteZone">
                              <p className="mulishFont eraseYourAccountText">Delete Your Account</p>
                              <p className="mulishFont thisActionCantUndo">( Warning! This action can't be undone! )</p>
                              <form className="deleteForm" onSubmit={this.eraseHandleSubmit}>
                                 <div className="eraseInputBorder">
                                    <input className="mulishFont eraseInput" type="text" placeholder="Ketik kata 'HAPUS' untuk melanjutkan ..." onChange={this.eraseChangeHandler}/>
                                 </div>
                                 <input className="hoverThis mulishFont deleteBtn" type="submit" value="Delete Account"/>         
                              </form>
                           </div>
                        </div>
                     </div>
                     :
                     <form onSubmit={this.updateHandleSubmit}>
                        <div className="mulishFont accountSetting">
                           <div className="accountSettingTop">
                              <p className="accountSettingTextTitle">Details Information</p>
                              <div className="accountSettingRow">
                                 <div className="accountSettingInputGap">
                                    <p className="accountSettingInputLabel">First Name</p>
                                    <div className="accountSettingInputBorder">
                                       <input className="accountSettingInput" type="text" placeholder="Your first name" name="updateFirstName" maxLength="32" value={this.state.updateFirstName} onChange={this.updateChangeHandler} required/>
                                    </div>
                                    </div>
                                 <div className="accountSettingInputGap">
                                    <p className="accountSettingInputLabel">Last Name</p>
                                    <div className="accountSettingInputBorder">
                                       <input className="accountSettingInput" type="text" placeholder="Your last name" name="updateLastName" maxLength="32" value={this.state.updateLastName} onChange={this.updateChangeHandler} required/>
                                    </div>
                                    </div>
                              </div>
                              <div className="accountSettingRow">
                                 <div className="accountSettingInputGap">
                                    <p className="accountSettingInputLabel">E-mail</p>
                                    <div className="accountSettingInputBorder">
                                       <input className="accountSettingInput" type="email" placeholder="Your e-mail address" name="updateEmail" maxLength="64" value={this.state.updateEmail} onChange={this.updateChangeHandler} required/>
                                    </div>
                                    </div>
                                 <div className="accountSettingInputGap">
                                    <p className="accountSettingInputLabel">Title / Job</p>
                                    <div className="accountSettingInputBorder">
                                       <input className="accountSettingInput" type="text" placeholder="Your title or job" name="updateTitle" maxLength="32" value={this.state.updateTitle} onChange={this.updateChangeHandler} required/>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="accountSettingBottom">
                              <p className="accountSettingTextTitle">Account and Privacy</p>
                              <div className="accountSettingRow">
                                 <div className="accountSettingInputGap">
                                    <p className="accountSettingInputLabel">New Password</p>
                                    <div className="accountSettingInputBorder">
                                       <input className="accountSettingInput" type={this.state.showFirstPassword ? "text" : "password"} name="updatePassword" minLength="8" maxLength="32" onChange={this.updateChangeHandler} placeholder="Write your password" required/>
                                       <img className="eyeLogo" src="https://user-images.githubusercontent.com/77045083/111035327-86454680-844c-11eb-8be5-8d01d3189c35.png" onClick={this.firstPasswordVisibility}/>
                                    </div>
                                    </div>
                                 <div className="accountSettingInputGap">
                                    <p className="accountSettingInputLabel">Confirm Password</p>
                                    <div className="accountSettingInputBorder">
                                       <input className="accountSettingInput" type={this.state.showSecondPassword ? "text" : "password"} name="confirmPassword" minLength="8" maxLength="32" onChange={this.updateChangeHandler} placeholder="Confirm your password" required/>
                                       <img className="eyeLogo" src="https://user-images.githubusercontent.com/77045083/111035327-86454680-844c-11eb-8be5-8d01d3189c35.png" onClick={this.secondPasswordVisibility}/>
                                    </div>
                                    </div>
                              </div>
                           </div>
                           <div className="updateChangesBtnZone">
                              <input className="hoverThis updateChangesBtn" type="submit" value="Update Changes"/>
                           </div>
                        </div>
                     </form>
                     }
                  </div>
               </div>
               <Footer/>
            </div>
         )
      }
   }
}