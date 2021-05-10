import { useState } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import '../style.css'
import Swal from 'sweetalert2'

export default function AddMovies(){
   const [createDataStorage, createNewDataInput] = useState("")

   // CREATE NEW MOVIE
   const createMovieHandleInput = (e) => {createNewDataInput({...createDataStorage, [e.target.name]: e.target.value})}
   const movieImgInput = (e) => {createNewDataInput({...createDataStorage, newMovieImg: e.target.files[0]})}
   const createMovieSubmit = (e) => {
      e.preventDefault()
      const {
         newMovieName, 
         newMovieGenre, 
         newReleaseDate, 
         newDirectedBy,
         newMovieDuration,
         newMovieCasts,
         newMovieTicketPrice,
         newMovieSynopsis,
         newMovieImg
      } = createDataStorage
      // FORM DATA
      const formData = new FormData()
      formData.append("movieName", newMovieName)
      formData.append("movieGenre", newMovieGenre)
      formData.append("releaseDate", newReleaseDate)
      formData.append("directedBy", newDirectedBy)
      formData.append("movieDuration", newMovieDuration)
      formData.append("movieCasts", newMovieCasts)
      formData.append("ticketPrice", newMovieTicketPrice)
      formData.append("movieSynopsis", newMovieSynopsis)
      formData.append("movieImg", newMovieImg)
      // POST DATA TO BACKEND (CREATE)
      axios.post(process.env.REACT_APP_NOWSHOWING, formData, {
         headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'multipart/form-data' }
      })
      .then(() => {
         Swal.fire(
            "Berhasil!", 
            "Film baru berjudul " + createDataStorage.newMovieName + " berhasil di tambahkan!", 
            "success")
         .then(() => {window.location = "/home-page"})
      })
      .catch((err) => {alert(err.response.data.errorMessage)})
   }
   return(
      <div className="showInAnimation">
         <Helmet>
            <title>Admin - Add Movies</title>
         </Helmet>
         <form className="formAdminMovies" onSubmit={createMovieSubmit}>
            <div className="mulishFont helloAdminText">
               <p>Halo, {localStorage.getItem("userRole")} <b>{localStorage.getItem("userName")}</b>,</p>
               <p>ada film baru yang ingin di tambahkan?</p>
            </div>
            <input className="mulishFont inputAdminMovies" type="text" name="newMovieName" placeholder="Nama film baru ?" onChange={createMovieHandleInput} required/>
            <input className="mulishFont inputAdminMovies" type="text" name="newMovieGenre" placeholder="Genre film baru ?" onChange={createMovieHandleInput} required/>
            <input className="mulishFont inputAdminMovies" type="text" name="newReleaseDate" placeholder="Tanggal rilis film baru ?" onChange={createMovieHandleInput} required/>
            <input className="mulishFont inputAdminMovies" type="text" name="newDirectedBy" placeholder="Oleh siapa film baru ini di direksikan ?" onChange={createMovieHandleInput} required/>
            <input className="mulishFont inputAdminMovies" type="text" name="newMovieDuration" placeholder="Lamanya durasi film baru ?" onChange={createMovieHandleInput} required/>
            <input className="mulishFont inputAdminMovies" type="text" name="newMovieCasts" placeholder="Pemain / karakter apa saja dalam film baru ?" onChange={createMovieHandleInput} required/>
            <input className="mulishFont inputAdminMovies" type="number" name="newMovieTicketPrice" placeholder="Harga tiket untuk film baru ini ?" onChange={createMovieHandleInput} required/>
            <textarea className="mulishFont inputAdminMovies inputAdminMoviesSynopsis" type="textarea" name="newMovieSynopsis" maxLength="1000" placeholder="Sinopsis jelas, padat, dan singkat dari film baru ?" onChange={createMovieHandleInput} required/>
            <input className="mulishFont inputAdminMovies" type="file" name="newMovieImg" placeholder="Masukkan gambar yang akan dijadikan poster film!" onChange={movieImgInput} required/>
            <input className="mulishFont adminMovieBtn" type="submit" value="Tambahkan film baru ini !"/>
         </form>
      </div>
   )
}