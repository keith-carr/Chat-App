import * as actionTypes from "./actionTypes";
import { GUESSACTIONS } from "./actionTypes";

export interface IGuessWord {
        type:string,
        payload:{guessedWord:string, letterMatchCount:number}
}
/**
 * @function guessWord
 * @param {string} guessWord - Guesed word.
 * @returns {function} - Redux Thunk function
 */


export const guessWord = (action: IGuessWord) => {
  action = {
    type: GUESSACTIONS.Type.GUESS_WORD,
    payload: {guessedWord: 'Joy', letterMatchCount: 3}// ONLY EXAMPLE DATA for boiler-plate
  }; 

  return action;
};
