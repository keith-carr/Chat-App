import * as actionTypes from '../actions/actionTypes';
import {IChannel} from '../actions/setCurrentChannel'

const initialChannelState = {
    currentChannel:{}
}

const channel_reducer = (state = initialChannelState, action:IChannel) => {
    switch(action.type) {
        case actionTypes.SET_CURRENT_CHANNEL:
            return {
                currentChannel: action.payload.currentChannel,
            }
        default: return state;
    }
}
export default channel_reducer;