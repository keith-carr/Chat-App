import * as actionTypes from '../actions/actionTypes';
import {ISetUser} from '../actions/setUser';

const initialUserState = {
    currentUser:'',
    isLoading:true
}

const user_reducer = (state = initialUserState, action:ISetUser) => {
    switch(action.type) {
        case actionTypes.SET_USER:
            return {
                currentUser: action.payload.currentUser,
                isLoading: false,
            }
        default: return state;
    }
}
export default user_reducer;