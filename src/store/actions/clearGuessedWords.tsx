import * as actionTypes from './actionTypes';
import { IActions } from './actionTypes';
import {GUESSACTIONS} from './actionTypes';
/**
 * @function correctGuess
 * @returns {object} - Action object with type 'CORRECT_GUESS'
 */

export function clearGuessedWords(action?:IActions):IActions {
    action = {
        type: GUESSACTIONS.Type.CLEAR_GUESSED_WORDS,        
    }
    return action;
}
