const cinemaState = {
    nowShowingAll: [],
    upcomingAll: [],
    allCinema: []
 }

const cinemaReducer = (state = cinemaState, action) => {
    switch (action.type) {
        case "CINEMA_ALL":
            return {...state, allCinema: action.payload} 
        case "NOWSHOWING_ALL":
            return {...state, nowShowingAll: action.payload}
        case "UPCOMING_ALL":
            return {...state, upcomingAll: action.payload}
        default:
            return state;
    }
 }

 export default cinemaReducer