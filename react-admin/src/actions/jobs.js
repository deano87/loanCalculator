import axios from 'axios';

export const GET_JOBS = 'GET_JOBS';
export function getJobs() {
    const request = axios.get(`${apiPath}loan-calc/jobs`);

    return {
        type: GET_JOBS,
        payload: request
    };
}

export const CREATE_JOB = 'CREATE_JOB';
export function createJob(id, data) {
    const request = axios.post(`${apiPath}loan-calc/jobs`, data);

    return {
        type: CREATE_JOB,
        payload: request
    };
}

export const UPDATE_JOB = 'UPDATE_JOB';
export function updateJob(id, data) {
    const request = axios.put(`${apiPath}loan-calc/jobs/${id}`, data);

    return {
        type: UPDATE_JOB,
        payload: request
    };
}

export const DELETE_JOB = 'DELETE_JOB';
export function deleteJob(id, data) {
    const request = axios.delete(`${apiPath}loan-calc/jobs/${id}`, data);

    return {
        type: DELETE_JOB,
        payload: request
    };
}
