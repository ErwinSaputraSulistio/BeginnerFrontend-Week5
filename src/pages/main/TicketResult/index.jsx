import './style.css'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Helmet } from 'react-helmet'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import axios from 'axios'
import Swal from 'sweetalert2'

export default function TicketResult(){
   const paramsId = useParams().id
   const [transactionData, setTransaction] = useState({})
   useEffect(() => {
      axios.get(process.env.REACT_APP_TRANSACTION + "number/" + paramsId)
      .then((res) => {
         setTransaction(res.data.outputData[0])
         console.log(res.data.outputData[0])
      })
      .catch(() => {})
   }, [])
   const { choosenMovie, showDate, startTime, howManyTickets, seatPosition, totalPayment } = transactionData
   return(
      <div className="showInAnimation">
         <Helmet>
            <title>Tickitz - Ticket Result</title>
         </Helmet>
         <Navbar/>
         <div className="mulish purpleOutsideTicketResult">
            <div className="greyOutsideTicketResult">
               <p className="boldThis proofText">Proof of Payment</p>
               <div className="ticketResult">
                  <div className="leftTicketResult">
                     <div className="topTicketResult topLeftTicket">
                        <img className="tickitzTicketResultLogo" src="https://user-images.githubusercontent.com/77045083/113519381-fd867a00-95b5-11eb-9065-5d3d45c1c851.png"/>
                        <p className="noMargin admitOneTicket">Admit One</p>
                     </div>
                     <div className="bottomTicketResult bottomLeftTicket">
                        <div className="bottomLeftTicketRow">
                           <div className="bottomLeftTicketColumn">
                              <p className="noMargin ticketLittleTitle">Movie</p>
                              <p className="ticketTitleContent">{choosenMovie}</p>
                           </div>
                        </div>
                        <div className="bottomLeftTicketRow">
                           <div className="bottomLeftTicketColumn widthFourty">
                              <p className="noMargin ticketLittleTitle">Date</p>
                              <p className="ticketTitleContent">{showDate}</p>
                           </div>
                           <div className="bottomLeftTicketColumn widthThirty">
                              <p className="noMargin ticketLittleTitle">Time</p>
                              <p className="ticketTitleContent">{startTime}</p>
                           </div>
                           <div className="bottomLeftTicketColumn widthThirty">
                              <p className="noMargin ticketLittleTitle">Category</p>
                              <p className="ticketTitleContent">PG-13</p>
                           </div>
                        </div>
                        <div className="bottomLeftTicketRow">
                           <div className="bottomLeftTicketColumn widthFourty">
                              <p className="noMargin ticketLittleTitle">Count</p>
                              <p className="ticketTitleContent">{howManyTickets} pieces</p>
                           </div>
                           <div className="bottomLeftTicketColumn widthThirty">
                              <p className="noMargin ticketLittleTitle">Seats</p>
                              <p className="ticketTitleContent">{seatPosition}</p>
                           </div>
                           <div className="bottomLeftTicketColumn widthThirty">
                              <p className="noMargin ticketLittleTitle">Price</p>
                              <p className="ticketTitleContent">IDR {totalPayment}</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="rightTicketResult">
                     <div className="topTicketResult topRightTicket">
                        <img className="tickitzTicketResultLogo" src="https://user-images.githubusercontent.com/77045083/113519381-fd867a00-95b5-11eb-9065-5d3d45c1c851.png"/>
                     </div>
                     <div className="bottomTicketResult bottomRightTicket">
                        <div className="insideBottomRightTicket">
                           <div>
                              <p className="noMargin ticketLittleTitle">Movie</p>
                              <p className="ticketTitleContent">{choosenMovie}</p>
                           </div>
                           <div className="bottomRightTicketRow">
                              <div className="widthFifty">
                                 <p className="noMargin ticketLittleTitle">Date</p>
                                 <p className="ticketTitleContent">{showDate}</p>
                              </div>
                              <div className="widthFifty">
                                 <p className="noMargin ticketLittleTitle">Time</p>
                                 <p className="ticketTitleContent">{startTime}</p>
                              </div>
                           </div>
                           <div className="bottomRightTicketRow">
                              <div className="widthFifty">
                                 <p className="noMargin ticketLittleTitle">Count</p>
                                 <p className="ticketTitleContent">{howManyTickets} pieces</p>
                              </div>
                              <div className="widthFifty">
                                 <p className="noMargin ticketLittleTitle">Seats</p>
                                 <p className="ticketTitleContent">{seatPosition}</p>
                              </div>
                           </div>
                           <div className="bottomRightTicketRow">
                              <div className="widthFifty">
                              </div>
                              <div className="widthFifty">
                                 <p className="noMargin ticketLittleTitle">Category</p>
                                 <p className="ticketTitleContent">PG-13</p>
                              </div>
                           </div>
                        </div>
                        <img className="barcodeDummy" src="https://user-images.githubusercontent.com/77045083/113520413-1e060280-95bd-11eb-9f31-b6f8f0d2f1ae.png"/>
                     </div>
                  </div>
               </div>
               <div className="downloadAndPrint">
                  <div className="downloadBtn"><img className="downloadAndPrintBtnLogo" src="https://user-images.githubusercontent.com/77045083/113519145-a207bc80-95b4-11eb-919b-5ee2642f1fa6.png"/>Download</div>
                  <div className="printBtn"><img className="downloadAndPrintBtnLogo" src="https://user-images.githubusercontent.com/77045083/113519142-a0d68f80-95b4-11eb-8d00-2ce8f31c2e60.png"/>Print</div>
               </div>
            </div>
         </div>
         <Footer/>
      </div>
   )
}