import {combineReducers} from 'redux'
import cinemaReducer from './cinemaReducer'
import transactionReducer from './transactionReducer'

const rootReducer = combineReducers({
    cinema: cinemaReducer, 
    transaction: transactionReducer
 })

export default rootReducer
 