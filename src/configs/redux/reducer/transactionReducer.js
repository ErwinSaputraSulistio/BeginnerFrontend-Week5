const transactionState = {
    transactionId: []
 }

const transactionReducer = (state = transactionState, action) => {
    switch (action.type) {
        case "TRANSACTION_ID":
            return {...state, transactionId: action.payload}
        default:
            return state;
    }
 }

 export default transactionReducer