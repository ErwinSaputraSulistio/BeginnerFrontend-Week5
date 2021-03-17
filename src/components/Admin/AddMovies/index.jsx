import { useState } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import '../style.css'

export default function AddMovies(){
   const [createDataStorage, createNewDataInput] = useState("")
   // CREATE NEW MOVIE
   const createMovieHandleInput = (e) => {
      createNewDataInput({...createDataStorage, [e.target.name]: e.target.value})
      console.log(createDataStorage)
   }
   const createMovieSubmit = (e) => {
      e.preventDefault()
      const {
         newMovieName, 
         newMovieGenre, 
         newReleaseDate, 
         newDirectedBy,
         newMovieDuration,
         newMovieCasts,
         newMovieSynopsis,
         newMovieImgUrl
      } = createDataStorage
      const packCreatedData = 
      {
         movieName: newMovieName,
         movieGenre: newMovieGenre,
         releaseDate: newReleaseDate,
         directedBy: newDirectedBy,
         movieDuration: newMovieDuration,
         movieCasts: newMovieCasts,
         movieSynopsis: newMovieSynopsis,
         movieImgUrl : newMovieImgUrl
      }
      console.log(packCreatedData)
      axios.post(process.env.REACT_APP_NOWSHOWING, packCreatedData)
      .then(() => {
         alert("Film baru berjudul " + createDataStorage.newMovieName + " berhasil di tambahkan!")
         window.location = "/home-page"
      })
      .catch((err) => {alert(err.message)})
   }
   if(localStorage.getItem("userRole") === "admin"){
      return(
         <div className="showInAnimation">
            <Helmet>
               <title>Admin - Add Movies</title>
            </Helmet>
            <form className="formAdminMovies" onSubmit={createMovieSubmit}>
               <div className="mulishFont helloAdminText">
                  <p>Halo, admin <b>{localStorage.getItem("userName")}</b>,</p>
                  <p>ada film baru yang ingin di tambahkan?</p>
               </div>
               <input className="mulishFont inputAdminMovies" type="text" name="newMovieName" placeholder="Nama film baru ?" onChange={createMovieHandleInput} required/>
               <input className="mulishFont inputAdminMovies" type="text" name="newMovieGenre" placeholder="Genre film baru ?" onChange={createMovieHandleInput} required/>
               <input className="mulishFont inputAdminMovies" type="text" name="newReleaseDate" placeholder="Tanggal rilis film baru ?" onChange={createMovieHandleInput} required/>
               <input className="mulishFont inputAdminMovies" type="text" name="newDirectedBy" placeholder="Oleh siapa film baru ini di direksikan ?" onChange={createMovieHandleInput} required/>
               <input className="mulishFont inputAdminMovies" type="text" name="newMovieDuration" placeholder="Lamanya durasi film baru ?" onChange={createMovieHandleInput} required/>
               <input className="mulishFont inputAdminMovies" type="text" name="newMovieCasts" placeholder="Pemain / karakter apa saja dalam film baru ?" onChange={createMovieHandleInput} required/>
               <input className="mulishFont inputAdminMovies" type="text" name="newMovieImgUrl" placeholder="Link URL untuk gambar poster film baru ?" onChange={createMovieHandleInput} required/>
               <textarea className="mulishFont inputAdminMovies inputAdminMoviesSynopsis" type="textarea" name="newMovieSynopsis" maxLength="1000" placeholder="Sinopsis jelas, padat, dan singkat dari film baru ?" onChange={createMovieHandleInput} required/>
               <input className="mulishFont adminMovieBtn" type="submit" value="Tambahkan film baru ini !"/>
            </form>
         </div>
      )
   }
   else{window.location = "/home-page"}   
}