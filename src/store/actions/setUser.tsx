import * as actionTypes from './actionTypes';
import { ActionCreator } from 'react-redux';

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