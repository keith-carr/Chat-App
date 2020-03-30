import * as actionTypes from '../actions/actionTypes';

const initialColorsState = {
    primaryColor: '',
    secondaryColor: 'linear-gradient(45deg, rgba(140, 142, 240, 0.25) 1%, #f5f5fc 50%)'
}

const colors_reducer = (state = initialColorsState, action: any) => {
    switch(action.type) {
        case actionTypes.SET_COLORS:
            return {
                primaryColor: action.payload.primaryColor,
                secondaryColor: action.payload.secondaryColor
            }
        default: 
            return state;
    }
}

export default colors_reducer;