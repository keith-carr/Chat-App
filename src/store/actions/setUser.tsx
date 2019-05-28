import * as actionTypes from './actionTypes';

export interface ISetUser {
    type: string,
    payload: {
        currentUser:string
    }
}

export const setUser = (user:object) => {
    return {
        type: actionTypes.SET_USER,
        payload: {
            currentUser: user
        }
    }
}

export const clearUser = () => {
    return {
        type: actionTypes.CLEAR_USER
    }
}