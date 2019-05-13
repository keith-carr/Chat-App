import * as actionTypes from '../actions/actionTypes';
import {GUESSACTIONS} from '../actions/actionTypes';
import {IGuessWord} from '../actions/guessWord';

const initialState:any=[];

export default (state=initialState, action:IGuessWord) => {
    switch(action.type){
        case GUESSACTIONS.Type.GUESS_WORD:
        return [...state, action.payload];

        case GUESSACTIONS.Type.CLEAR_GUESSED_WORDS:
            return [];
    default:
        return state
    }
}