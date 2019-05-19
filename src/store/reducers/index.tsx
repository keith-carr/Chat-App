 // export defaults allows for you to rename your imports
import { combineReducers } from 'redux';
import user_reducer from './user_reducer';

const rootReducer = combineReducers({
    user: user_reducer

}); 

export default rootReducer; 
 