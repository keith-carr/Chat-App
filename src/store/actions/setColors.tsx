import * as actionTypes from './actionTypes';
import {IColors} from '../../components/colorpanel/ColorPanel';

export const setColors = (primaryColor: IColors, secondaryColor:IColors) => {
    return {
        type: actionTypes.SET_COLORS,
        payload: {
            primaryColor,
            secondaryColor
        }
    }
}

export default setColors;