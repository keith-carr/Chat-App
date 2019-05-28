import * as actionTypes from '../actions/actionTypes';
import {ISetUser} from '../actions/setUser';

const initialUserState = {
    currentUser:'user',
    isLoading:true
}

const user_reducer = (state = initialUserState, action:ISetUser) => {
    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false,
            }
        case actionTypes.CLEAR_USER:
            return {
                ...initialUserState,
                isLoading: false
            }
        default: return state;
    }
}
export default user_reducer;