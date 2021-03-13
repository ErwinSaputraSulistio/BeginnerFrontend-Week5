import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { Helmet } from 'react-helmet'
import './style.css'

export default function NotFound(){
   return(
      <div className="notFound">
         <Helmet>
            <title>404 - Page Not Found</title>
         </Helmet>
         <Navbar/>
         <h1 className="textSet pageNotFound">404 - Page Not Found</h1>
         <Footer/>
      </div>
   )
}