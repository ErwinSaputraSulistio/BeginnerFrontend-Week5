import axios from 'axios'

export const getNowShowing = () => (dispatch) => {
    axios.get(process.env.REACT_APP_NOWSHOWING_NOSLASH + '?page=1&limit=6')
    .then((res) => { 
       dispatch({type: "NOWSHOWING_ALL", payload: res.data.outputData})
    })
    .catch((err) => {alert(err.message)})
}