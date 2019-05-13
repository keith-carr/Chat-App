export interface IActions {
  type: string;
}

export namespace GUESSACTIONS {
  export enum Type {
    GUESS_WORD = "GUESS_WORD",
    CLEAR_GUESSED_WORDS = "CLEAR_GUESSED_WORDS"
  }
}
