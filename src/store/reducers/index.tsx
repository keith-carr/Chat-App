//  export defaults allows for you to rename your imports
import { combineReducers } from 'redux';
import user_reducer from './user_reducer';
import channel_reducer from './channel_reducer';
import colors_reducer from './colors_reducer';

const rootReducer = combineReducers({
    user: user_reducer,
    channel: channel_reducer,
    colors: colors_reducer
}); 

export default rootReducer;