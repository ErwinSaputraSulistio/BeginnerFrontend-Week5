import { useEffect, useState } from 'react'
import axios from 'axios'
import { Helmet } from 'react-helmet'
import '../style.css'
import Swal from 'sweetalert2'

export default function UpdateMovies(){
   const [movieImg, setMovieImg] = useState("")
   const [updateData, setUpdateData] = useState("")

   // BASE CONF
   useEffect(() => {
      axios.get(process.env.REACT_APP_NOWSHOWING + localStorage.getItem("updateMovieId"))
      .then((res) => {setUpdateData(res.data.outputData[0])})
      .catch((err) => {alert(err.message)})
   }, [])
   

   // UPDATE MOVIE DATA
   const updateMovieImg = (e) => { setMovieImg(e.target.files[0]) }
   const updateMovieHandleInput = (e) => { setUpdateData({...updateData, [e.target.name]: e.target.value}) }
   const updateMovieSubmit = (e) => {
      e.preventDefault()
      const {
         ticketId, 
         movieName, 
         movieGenre, 
         releaseDate, 
         directedBy, 
         movieDuration, 
         movieCasts,
         ticketPrice,
         movieSynopsis
      } = updateData
      // FORM DATA
      const formData = new FormData()
      formData.append("ticketId", ticketId)
      formData.append("movieName", movieName)
      formData.append("movieGenre", movieGenre)
      formData.append("releaseDate", releaseDate)
      formData.append("directedBy", directedBy)
      formData.append("movieDuration", movieDuration)
      formData.append("movieCasts", movieCasts)
      formData.append("ticketPrice", ticketPrice)
      formData.append("movieSynopsis", movieSynopsis)
      formData.append("movieImg", movieImg)
      // PUT DATA TO BACKEND (UPDATE)
      axios.put(process.env.REACT_APP_NOWSHOWING + ticketId, formData, {
         headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'multipart/form-data' }
      })
      .then(() => {
         Swal.fire(
            "Berhasil!", 
            "Data film '" + movieName + "' berhasil di ubah, silahkan refresh page untuk melihat perubahan!", 
            "success")
         .then(() => {window.location = "/home-page"})
      })
      .catch((err) => {alert(err.response.data)})
   }
   return(
      <div className="showInAnimation">
         <Helmet>
            <title>Admin - Update Movies</title>
         </Helmet>
         <form className="formAdminMovies" onSubmit={(e) => {updateMovieSubmit(e)}}>
            <div className="mulishFont helloAdminText">
               <p>Halo, {localStorage.getItem("userRole")} <b>{localStorage.getItem("userName")}</b>,</p>
               <p>ada data film yang ingin di ubah?</p>
            </div>
            <input className="mulishFont inputAdminMovies" type="text" name="movieName" placeholder="Ubah nama film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={updateData.movieName} required/>
            <input className="mulishFont inputAdminMovies" type="text" name="movieGenre" placeholder="Ubah genre film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={updateData.movieGenre} required/>
            <input className="mulishFont inputAdminMovies" type="text" name="releaseDate" placeholder="Ubah tanggal rilis film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={updateData.releaseDate} required/>
            <input className="mulishFont inputAdminMovies" type="text" name="directedBy" placeholder="Ubah direktor film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={updateData.directedBy} required/>
            <input className="mulishFont inputAdminMovies" type="text" name="movieDuration" placeholder="Ubah durasi film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={updateData.movieDuration} required/>
            <input className="mulishFont inputAdminMovies" type="text" name="movieCasts" placeholder="Ubah pemain / karakter film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={updateData.movieCasts} required/>
            <input className="mulishFont inputAdminMovies" type="number" name="ticketPrice" placeholder="Ubah harga tiket film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={updateData.ticketPrice} required/>
            <textarea className="mulishFont inputAdminMovies inputAdminMoviesSynopsis" type="textarea" name="movieSynopsis" maxLength="1000" placeholder="Ubah sinopsis film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={updateData.movieSynopsis} required/>
            <input className="mulishFont inputAdminMovies" type="file" name="movieImg" placeholder="Ubah gambar poster film di sini ..." onChange={(e) => {updateMovieImg(e)} } required/>
            <input className="mulishFont adminMovieBtn" type="submit" value="Update data film ini !"/>
         </form>
      </div>
   )
}