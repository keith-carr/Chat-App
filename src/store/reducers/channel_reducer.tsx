import * as actionTypes from '../actions/actionTypes';
import {IChannel} from '../actions/setCurrentChannel'


const initialChannelState = {
  currentChannel: null
};

const channel_reducer = (state = initialChannelState, action:any) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_CHANNEL:
      return {
        ...state,
        currentChannel: action.payload.currentChannel
      }
    case actionTypes.SET_PRIVATE_CHANNEL:
      return {
          ...state,
          isPrivateChannel: action.payload.isPrivateChannel
      }
    default:
      return state;
  }
}
export default channel_reducer;



// import * as actionTypes from '../actions/actionTypes';
// import {ChannelActions, ChannelState} from '../actions/channelActions';
// // import {IChannel} from '../actions/setCurrentChannel'


// const initialChannelState = {
//   currentChannel: null
// };

// const channel_reducer = (state = initialChannelState, action:ChannelActions):ChannelState => {
//   switch (action.type) {
//     case actionTypes.SET_CURRENT_CHANNEL:
//       return {
//         ...state,
//         currentChannel: action.payload
//       }
//     case actionTypes.SET_PRIVATE_CHANNEL:
//       return {
//           ...state,
//           isPrivateChannel: action.payload.isPrivateChannel
//       }
//     default:
//       return state;
//   }
// }
// export default channel_reducer;