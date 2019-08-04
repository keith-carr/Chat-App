import * as actionTypes from './actionTypes';


export interface IChannel {
    type:string,
    payload:{currentChannel:{channel:object}}
}

export const setCurrentChannel = (channel:IChannel) => {
    return {
        type:actionTypes.SET_CURRENT_CHANNEL,
        payload:{
            currentChannel: channel
        }
    }
}