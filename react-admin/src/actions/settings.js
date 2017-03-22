import axios from 'axios';

export const GET_SETTINGS = 'GET_SETTINGS';
export function getSettings() {
    const request = axios.get(`${apiPath}loan-calc/settings`);

    return {
        type: GET_SETTINGS,
        payload: request
    };
}

export const UPDATE_SETTING = 'UPDATE_SETTING';
export function updateSetting(data) {
    const request = axios.put(`${apiPath}loan-calc/settings`, data);

    return {
        type: UPDATE_SETTING,
        payload: request
    };
}
