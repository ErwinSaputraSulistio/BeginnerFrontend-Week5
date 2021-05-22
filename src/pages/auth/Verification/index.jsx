import './style.css'
import { useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import axios from 'axios'

export default function Verification() {
   const { id } = useParams()
   const history = useHistory()
   const setVerifyStatus = (stat) => {
      localStorage.setItem("verifyStatus", stat)
      history.push("/login")
   }
   useEffect(() => {
      axios.get(process.env.REACT_APP_USER + "verify/" + id)
      .then(() => { setVerifyStatus("Success") })
      .catch(() => { setVerifyStatus("Failed") })
   }, [])
   return(
      <div>
         <Helmet>
            <title>Tickitz - Verification</title>
         </Helmet>
      </div>
   )
}