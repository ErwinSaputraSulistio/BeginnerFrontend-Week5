import './style.css'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import AddMovies from '../../../components/Admin/AddMovies'
import UpdateMovies from '../../../components/Admin/UpdateMovies'
import Swal from 'sweetalert2'

const notAdminAlert = () => {
   Swal.fire(
      "Eits, stop dulu!", 
      "Halaman ini hanya boleh di akses oleh admin, user biasa atau member gak boleh ke sini yah ~", 
      "error")
   .then(() => {window.location = "/home-page"})
}

export default function AddOrUpdateMovies(){
   return(
      <div>
         <Navbar/>
         {localStorage.getItem("adminMoviesAction") === "updateMovies" ? 
         <UpdateMovies/>
         : 
         <AddMovies/>}
         <Footer/>
         {localStorage.getItem("userRole") !== "admin" && notAdminAlert()}
      </div>
   )
}