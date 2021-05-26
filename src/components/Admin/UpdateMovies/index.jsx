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
         ticket_id, 
         movie_name, 
         movie_genre, 
         release_date, 
         directed_by, 
         movie_duration, 
         movie_casts,
         ticket_price,
         movie_synopsis
      } = updateData
      // FORM DATA
      const formData = new FormData()
      formData.append("ticketId", ticket_id)
      formData.append("movieName", movie_name)
      formData.append("movieGenre", movie_genre)
      formData.append("releaseDate", release_date)
      formData.append("directedBy", directed_by)
      formData.append("movieDuration", movie_duration)
      formData.append("movieCasts", movie_casts)
      formData.append("ticketPrice", ticket_price)
      formData.append("movieSynopsis", movie_synopsis)
      formData.append("movieImg", movieImg)
      // PUT DATA TO BACKEND (UPDATE)
      axios.put(process.env.REACT_APP_NOWSHOWING + ticket_id, formData, {
         headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'multipart/form-data' }
      })
      .then(() => {
         Swal.fire(
            "Berhasil!", 
            "Data film '" + movie_name + "' berhasil di ubah, silahkan refresh page untuk melihat perubahan!", 
            "success")
         .then(() => {window.location = "/home-page"})
      })
      .catch((err) => { alert(err.response.data) })
   }
   const {movie_name, movie_genre, release_date, directed_by, movie_duration, movie_casts, ticket_price, movie_synopsis} = updateData
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
            <input className="mulishFont inputAdminMovies" type="text" name="movie_name" placeholder="Ubah nama film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={movie_name} required/>
            <input className="mulishFont inputAdminMovies" type="text" name="movie_genre" placeholder="Ubah genre film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={movie_genre} required/>
            <input className="mulishFont inputAdminMovies" type="text" name="release_date" placeholder="Ubah tanggal rilis film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={release_date} required/>
            <input className="mulishFont inputAdminMovies" type="text" name="directed_by" placeholder="Ubah direktor film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={directed_by} required/>
            <input className="mulishFont inputAdminMovies" type="text" name="movie_duration" placeholder="Ubah durasi film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={movie_duration} required/>
            <input className="mulishFont inputAdminMovies" type="text" name="movie_casts" placeholder="Ubah pemain / karakter film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={movie_casts} required/>
            <input className="mulishFont inputAdminMovies" type="number" name="ticket_price" placeholder="Ubah harga tiket film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={ticket_price} required/>
            <textarea className="mulishFont inputAdminMovies inputAdminMoviesSynopsis" type="textarea" name="movie_synopsis" maxLength="1000" placeholder="Ubah sinopsis film di sini ..." onChange={(e) => {updateMovieHandleInput(e)} } value={movie_synopsis} required/>
            <input className="mulishFont inputAdminMovies" type="file" name="movieImg" placeholder="Ubah gambar poster film di sini ..." onChange={(e) => {updateMovieImg(e)} } required/>
            <input className="mulishFont adminMovieBtn" type="submit" value="Update data film ini !"/>
         </form>
      </div>
   )
}