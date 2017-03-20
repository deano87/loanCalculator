import axios from 'axios';

export const CALC_GET_SETTINGS = 'CALC_GET_SETTINGS';

export function getCalcSettings() {
    const request = axios.get(apiPath + "loan-calc");

    return {
        type: CALC_GET_SETTINGS,
        payload: request
    };
}
