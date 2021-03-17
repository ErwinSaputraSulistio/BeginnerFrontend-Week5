import './style.css'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import AddMovies from '../../../components/Admin/AddMovies'
import UpdateMovies from '../../../components/Admin/UpdateMovies'

export default function AddOrUpdateMovies(){
   return(
      <div>
         <Navbar/>
         {localStorage.getItem("adminMoviesAction") === "updateMovies" ? 
         <UpdateMovies/>
         : 
         <AddMovies/>}
         <Footer/>
      </div>
   )
}