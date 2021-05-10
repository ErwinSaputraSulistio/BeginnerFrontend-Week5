import './style.css'
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

// PURPLE BUTTON - TICKITZ
const bookNowRequirement = () => {
   if(localStorage.getItem("isLoggedIn") === null){
      Swal.fire(
         "Login dulu yah ~",
         "Kalau ingin memesan tiket, harap login dengan akun kamu dulu yah ~",
         "error"
      ).then(() => {window.location = "/login"})
   }
   else if(localStorage.getItem("showDate") === null || localStorage.getItem("startTime") === null){
      Swal.fire(
         "Oops, there's something missing!",
         "Sebelum melanjutkan ke bagian akhir proses pemesanan, pastikan dulu sudah memilih tanggal dan jam tayang yah ~",
         "warning"
      )
   }
   else {window.location = "/order-page/" + localStorage.getItem("nowShowingId")}
}

export function PurpleBookNowButton(){
   return(
      <Link className="mulish purpleButtonComponent" onClick={bookNowRequirement}>
         <div className="purpleButtonComponentShape">Book Now</div>
      </Link>
   )
}
// TRANSPARENT BUTTON - TICKITZ
export function TransparentButton(){
   return(
      <Link className="mulish transparentButtonComponent" to="">
         <div className="transparentButtonComponentShape">Add to cart</div>
      </Link>
   )
}