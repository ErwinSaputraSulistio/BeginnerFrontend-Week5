import React, { Component } from 'react'
import axios from 'axios'

export default class DeleteAccount extends Component {
   constructor(props){
      super(props)
      this.state = ""
   }
    handleSubmit = (e) => {
      e.preventDefault()
      const paramsId = this.props.match.params.id
      axios.delete('http://localhost:2000/v1/users/' + paramsId)
      .then((res) => {
         setUpResData === undefined ? alert(res.data.outputData) :
         this.setState(res.data.outputData[0])
      })
      .catch((err) => {alert(err.message)})
   };
   render(){
      return(
         <form onSubmit={this.handleSubmit}>
            <input className="hoverEffect mulishFont submitBtn" type="submit" value="Delete Account"/>         
         </form>
      )
   }
}