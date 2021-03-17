import React, { Component } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import '../style.css'

export default class UpdateMovies extends Component {
   constructor(props) {
      super(props)
      this.state = ""
   }

   // BASE CONF
   componentDidMount(){
      axios.get(process.env.REACT_APP_NOWSHOWING + localStorage.getItem("updateMovieId"))
      .then((res) => {this.setState(res.data.outputData[0])})
      .catch((err) => {alert(err.message)})
   }

   // UPDATE MOVIE DATA
   updateMovieHandleInput = (e) => {
      this.setState({[e.target.name]: e.target.value})
      console.log(this.state.movieImgUrl)
   }
   updateMovieSubmit = (e) => {
      e.preventDefault()
      const {
         ticketId,
         movieName, 
         movieGenre, 
         releaseDate, 
         directedBy,
         movieDuration,
         movieCasts,
         movieSynopsis,
         movieImgUrl
      } = this.state
      const packUpdatedData = 
      {
         movieName,
         movieGenre,
         releaseDate,
         directedBy,
         movieDuration,
         movieCasts,
         movieSynopsis,
         movieImgUrl
      }
      axios.put(process.env.REACT_APP_NOWSHOWING + ticketId, packUpdatedData)
      .then(() => {
         alert("Data film '" + this.state.movieName + "' berhasil di ubah, silahkan refresh page untuk melihat perubahan!")
         window.location = "/home-page"
      })
      .catch((err) => {alert(err.message)})
   }

   render(){
      if(localStorage.getItem("userRole") === "admin"){
         return(
            <div className="showInAnimation">
               <Helmet>
                  <title>Admin - Update Movies</title>
               </Helmet>
               <form className="formAdminMovies" onSubmit={this.updateMovieSubmit}>
                  <div className="mulishFont helloAdminText">
                     <p>Halo, admin <b>{localStorage.getItem("userName")}</b>,</p>
                     <p>ada data film yang ingin di ubah?</p>
                  </div>
                  <input className="mulishFont inputAdminMovies" type="text" name="movieName" placeholder="Ubah nama film di sini ..." onChange={this.updateMovieHandleInput} value={this.state.movieName} required/>
                  <input className="mulishFont inputAdminMovies" type="text" name="movieGenre" placeholder="Ubah genre film di sini ..." onChange={this.updateMovieHandleInput} value={this.state.movieGenre} required/>
                  <input className="mulishFont inputAdminMovies" type="text" name="releaseDate" placeholder="Ubah tanggal rilis film di sini ..." onChange={this.updateMovieHandleInput} value={this.state.releaseDate} required/>
                  <input className="mulishFont inputAdminMovies" type="text" name="directedBy" placeholder="Ubah direktor film di sini ..." onChange={this.updateMovieHandleInput} value={this.state.directedBy} required/>
                  <input className="mulishFont inputAdminMovies" type="text" name="movieDuration" placeholder="Ubah durasi film di sini ..." onChange={this.updateMovieHandleInput} value={this.state.movieDuration} required/>
                  <input className="mulishFont inputAdminMovies" type="text" name="movieCasts" placeholder="Ubah pemain / karakter film di sini ..." onChange={this.updateMovieHandleInput} value={this.state.movieCasts} required/>
                  <input className="mulishFont inputAdminMovies" type="text" name="movieImgUrl" placeholder="Ubah link URL untuk gambar poster film di sini ..." onChange={this.updateMovieHandleInput} value={this.state.movieImgUrl} required/>
                  <textarea className="mulishFont inputAdminMovies inputAdminMoviesSynopsis" type="textarea" name="movieSynopsis" maxLength="1000" placeholder="Ubah sinopsis film di sini ..." onChange={this.updateMovieHandleInput} value={this.state.movieSynopsis} required/>
                  <input className="mulishFont adminMovieBtn" type="submit" value="Update data film ini !"/>
               </form>
            </div>
         )
      }
      else{window.location = "/home-page"}   
   }
}