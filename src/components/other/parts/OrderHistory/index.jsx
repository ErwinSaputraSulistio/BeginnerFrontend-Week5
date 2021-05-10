import './style.css'
import { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

export default class OrderHistory extends Component {
   constructor(props) {
      super(props)
      this.state = { transactions: [] }
   }
   // GET TRANSACTION BASED ON USER ID
   componentDidMount(){
      axios.get(process.env.REACT_APP_TRANSACTION + "user/" + localStorage.getItem("userId"))
      .then((res) => {
         console.log(res.data.outputData[0].transactionId)
         this.setState({ transactions: [...res.data.outputData] })})
      .catch((err) => {console.log(err.message)})
   }
   // DELETE TRANSACTION
   deleteTransaction = (item) => {
      const {ticketStatus, transactionId} = item
      if(ticketStatus == "active"){
         Swal.fire(
            "Gagal?!",
            "Tiketnya masih aktif lho, silahkan di pakai dulu yah sebelum di hapus ~",
            "error"
            )
      }
      // else if(ticketStatus == "pending"){
      //    Swal.fire(
      //       "Pending!",
      //       "Gagal menghapus transaksi yang diminta, tiket masih dalam proses transaksi (pending)!",
      //       "warning"
      //       )
      // }
      else{
         axios.delete(process.env.REACT_APP_TRANSACTION + transactionId, {
            headers: { authorization: 'Bearer ' + localStorage.getItem("jwtToken"), 'Content-Type': 'multipart/form-data' }
         })
         .then(() => {
            Swal.fire(
               "Berhasil!",
               "Transaksi tiket telah di hapus, silahkan refresh page untuk melihat perubahan!",
               "success"
               ).then(() => {window.location = "/profile-page/" + localStorage.getItem("userId")})
         })
         .catch((err) => {
            Swal.fire(
               "Error?!",
               err.message,
               "error"
               )
         })
      }
   }
   // SHOW RESULT
   render(){
      return(
         <div>
            {this.state.transactions.length !== 0 ?
            <div>
               {this.state.transactions.map((item) => 
                  <div className="mulish orderHistoryCard">
                     <div className="orderHistoryTop">
                        <div className="dateAndMovieText">
                           <p className="orderHistoryShowDate">[{item.showDate}], {item.startTime}</p>
                           <p className="noMargin orderHistoryMovieName">{item.choosenMovie}</p>
                        </div>
                        <img className="orderHistoryCinemaImg" src={item.cinemaUrl}/>
                     </div>
                     <div className="orderHistoryBottom">
                        {
                        item.ticketStatus === "pending" ?
                        <p className="noMargin orderHistoryTicketStatus ticketPending">Ticket Pending</p>
                        :
                        item.ticketStatus === "active" ? 
                        <p className="noMargin orderHistoryTicketStatus ticketActive">Ticket Active</p>
                        :
                        item.ticketStatus === "used" ?
                        <p className="noMargin orderHistoryTicketStatus ticketUsed">Ticket Used</p>
                        :
                        <p className="noMargin orderHistoryTicketStatus ticketExpired">Ticket Expired</p>
                        }
                        <div className="hideFirst dropdown textSet navSet">
                           <button className="navBtn dropdown-toggle hoverThis" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Show Details
                           </button>
                           <div className="hideFirst dropdown-menu dropdownMenuCenter" aria-labelledby="dropdownMenuButton">
                              <Link className="dropdown-item" to={"/now-showing/" + item.ticketId} target="_blank">Movie Details</Link>
                              {item.ticketStatus === "pending" ? <Link className="dropdown-item" to={"/payment-page/" + item.transactionId}>Fulfill Ticket Payment</Link> : null}
                              {item.ticketStatus === "active" ? <Link className="dropdown-item" to={"/ticket-result/" + item.transactionId}>Ticket Result</Link> : null}
                              <Link className="dropdown-item" onClick={() => {this.deleteTransaction(item)}}>Delete Transaction</Link>
                           </div>
                        </div>
                     </div>
                  </div>
               )}
            </div>
            :
            <p>No Film</p>
            }
         </div>
      )
   }
}