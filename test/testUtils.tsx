import checkPropTypes from 'check-prop-types';
import { createStore,applyMiddleware } from 'redux';

import rootReducer from '../src/store/reducers/index';
import {middlewares} from '../src/index';
/**
 * Create a testing store with imported reducers, middleware, and initial state.
 * globals: rootReducer
 * @para {object} initialState = Initial State for store
 * @function storeFactory
 * @returns {Store} - Redux store
 * 
 */
export const storeFactory = (initialState?:any) => {
    const createStoreWithMiddleware = applyMiddleware(...middlewares)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
}
/**
 * Return node(s) with the given data-test attribute.
 * @param {ShallowWrapper}
 * @`param` {string} val -Component props specific to this setup. * @para {any} state - Initial state for setup.
 * @returns {ShallowWrapper}
 */
export interface IWrapper {
    find(target:string):any
}


export const findByTestAttr = (wrapper:IWrapper, attrName:string) => {
    return wrapper.find(`[data-test="${attrName}"]`);
}

export const checkProps = (component:any, conformingProps:{}) => {
    const propError = checkPropTypes(
        component.propTypes,
        conformingProps,
        'prop',
        component.name);
    expect(propError).toBeUndefined(); 
}  
//   interface FindByTestAttr {
//     wrapper:{
//         find(target:{}):{}
//     };
//     val:string;
// }

// function findByTestAttr <FindByTestAttr>(wrapper:{ find:(target:{})=>{} }, val:string):any {
//     return wrapper.find(`[data-test="${val}"]`);
// }

