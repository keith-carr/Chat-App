import * as actionTypes from './actionTypes';

export const setPrivateChannel = (isPrivateChannel: boolean) => {
    return {
        type: actionTypes.SET_PRIVATE_CHANNEL,
        payload: {
            isPrivateChannel
        }
    }
}