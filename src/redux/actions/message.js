import { CLEAR_MESSAGE, SET_MESSAGE } from "./types"

const setMessage = (message) => {
    return {
        type: SET_MESSAGE,
        payload: message
    }
}
const clearMessage = () => {
    console.log('clear message');
    return {
        type: CLEAR_MESSAGE,
        payload: ''
    }
}
export { setMessage, clearMessage }