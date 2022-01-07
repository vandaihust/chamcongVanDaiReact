import { CLEAR_MESSAGE, SET_MESSAGE } from "./types"

const setMessage = (message) => {
    return {
        type: SET_MESSAGE,
        payload: message
    }
}
const clearMessage = () => {

    return {
        type: CLEAR_MESSAGE,
        payload: ''
    }
}
export { setMessage, clearMessage }