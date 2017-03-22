import axios from 'axios';

export const CALC_GET_SETTINGS = 'CALC_GET_SETTINGS';
export function getCalcSettings() {
    const request = axios.get(apiPath + "loan-calc");

    return {
        type: CALC_GET_SETTINGS,
        payload: request
    };
}

export const CALC_RESULTS = 'CALC_RESULTS';
export function makeCalculation(data) {
    const request = axios.post(apiPath + "loan-calc", data);

    return {
        type: CALC_RESULTS,
        payload: request
    };
}
