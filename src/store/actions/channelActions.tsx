import * as actionTypes from './actionTypes';

// interface CurrentChannelPayload {
//     currentChannel: {
//         channel: object
//     }
// }

// export interface ChannelState {
//     channels: CurrentChannelPayload[],
// }


// export interface SetCurrentChannelAction {
//     type: typeof actionTypes.SET_CURRENT_CHANNEL,
//     payload:CurrentChannelPayload
// }

// export const setCurrentChannel = (channel:CurrentChannelPayload):SetCurrentChannelAction => {
//     return {
//         type:actionTypes.SET_CURRENT_CHANNEL,
//         payload: channel
//     }
// }


// interface PrivateChannel {
//     isPrivateChannel: boolean
// }

// export interface SetPrivateChannelAction {
//     type: typeof actionTypes.SET_PRIVATE_CHANNEL,
//     payload: PrivateChannel
// }

// export const setPrivateChannel = (isPrivateChannel: boolean):SetPrivateChannelAction => {
//     return {
//         type: actionTypes.SET_PRIVATE_CHANNEL,
//         payload: {
//             isPrivateChannel
//         }
//     }
// }

// export type ChannelActions = SetCurrentChannelAction | SetPrivateChannelAction;