import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import axios from 'axios'
import './style.css'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import {Link} from 'react-router-dom'

export default class ProfilePage extends Component {
   constructor(props){
      super(props)
      this.state = {
         inputData: "",
         updateRealName: "",
         updateUserJobs: "",
         passwordVerification: "",
         eraseInput: ""
      }
   }
   componentDidMount(){
      const paramsId = this.props.match.params.id
      axios.get(process.env.REACT_APP_USER + paramsId)
      .then((res) => {
         const setUpResData = res.data.outputData[0].userId
         if(setUpResData === undefined){
            alert("User tidak ditemukan atau telah dihapus, mengarahkan kembali ke halaman login!")
            window.location = "/login"
         }
         else{
            this.setState({inputData: res.data.outputData[0]})
         }
      })
      .catch((err) => {alert(process.env.REACT_APP_USER)})
   }

   // UPDATE
   updateHandleSubmit = (e) => {
      e.preventDefault()
      const paramsId = this.props.match.params.id
      const { profileImages, userEmail, userPassword } = this.state.inputData
      const updatedData = {
         realName: this.state.updateRealName,
         userJobs: this.state.updateUserJobs,
         profileImages,
         userEmail,
         userPassword
      }
      if(this.state.passwordVerification === this.state.inputData.userPassword){
         axios.put(process.env.REACT_APP_USER + paramsId, updatedData)
         .then(() => {
            alert("Berhasil mengganti nama akun dari " + this.state.inputData.realName + " menjadi " + this.state.updateRealName + ", refresh page untuk melihat perubahan!")
            window.location = "/profile-page/" + this.state.inputData.userId
         })
         .catch((err) => {alert(err.message)})
         }
      else{alert("Gagal update data, verifikasi password salah!")}
   }
   updateChangeHandler = (e) => {this.setState({[e.target.name]: e.target.value})}

   // ERASE
   eraseHandleSubmit = (e) => {
      e.preventDefault()
      if(this.state.eraseInput === "HAPUS"){
         const paramsId = this.props.match.params.id
         axios.delete(process.env.REACT_APP_USER + paramsId)
         .then((res) => {
            alert("Berhasil menghapus akun " + this.state.inputData.realName + ", mengarahkan kembali ke halaman login!")
            window.location = "/login"
         })
         .catch((err) => {alert(err.message)})
      }
      else {alert("Tolong ketik kata 'HAPUS' untuk melanjutkan proses penghapusan akun!")}
   }
   eraseChangeHandler = (e) => {this.setState({eraseInput: e.target.value})}

   // RENDER
   render(){
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
                     <img className="hoverThis profilePicture" src={this.state.inputData.profileImages}/>
                     <p className="noMargin profileName textSet">{this.state.inputData.realName}</p>
                     <p className="profileTitle textSet">{this.state.inputData.userJobs}</p>
                  </div>
                  <div className="bottomLeftProfile">
                     <p className="mulishFont loyaltyPointsText">Loyalty Points</p>
                     <img className="hoverThis moviegoersPointCard" src="https://user-images.githubusercontent.com/77045083/111043396-e354f280-8474-11eb-9f2a-182fc02f33a4.png"/>
                  </div>
               </div>
               <div className="rightSideProfile">
                  <div className="userUpdateZone">
                     <p className="mulishFont updateYourAccountText">Update Your Data</p>
                     <form className="updateForm" onSubmit={this.updateHandleSubmit}>
                        <label className="updateLabel" for="updateName">Current Name :</label>
                        <div className="updateInputBorder">
                           <input className="mulishFont updateInput" type="text" id="updateName" name="updateRealName" placeholder={this.state.inputData.realName} onChange={this.updateChangeHandler} required/>
                        </div>
                        <label className="updateLabel marginTopUserJobs" for="updateTitle">Current Title :</label>
                        <div className="updateInputBorder marginBottomUserJobs">
                           <input className="mulishFont updateInput" type="text" id="updateTitle" name="updateUserJobs" placeholder={this.state.inputData.userJobs} onChange={this.updateChangeHandler} required/>
                        </div> 
                        <label className="updateLabel" for="pwCheck">Password Verification :</label>
                        <div className="updateInputBorder">
                           <input className="mulishFont updateInput" type="password" id="pwCheck" name="passwordVerification" placeholder="Your password?" onChange={this.updateChangeHandler} required/>
                        </div> 
                        <input className="hoverThis mulishFont updateBtn" type="submit" value="Update Data"/>
                     </form>
                  </div>
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
            <Footer/>
         </div>
      )
   }
}