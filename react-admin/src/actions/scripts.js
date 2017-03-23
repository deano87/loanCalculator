import axios from 'axios';

export const GET_SCRIPTS = 'GET_SCRIPTS';
export function getScripts() {
    const request = axios.get(`${apiPath}loan-calc/scripts`);

    return {
        type: GET_SCRIPTS,
        payload: request
    };
}

export const RUN_SCRIPT = 'RUN_SCRIPT';
export function runScript(name) {
    const request = axios.post(`${apiPath}loan-calc/scripts/${name}`, {});

    return {
        type: RUN_SCRIPT,
        payload: request
    };
}
