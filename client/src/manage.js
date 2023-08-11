import axios from 'axios';

export const url = 'http://localhost:3000/';

export const api = axios.create({
    baseURL: url,
    withCredentials: true,
});

api.interceptors.response.use((res) => {
    return res;
}, (err) => {
    if (err.response.status == 403) {
        window.location.reload();
        api.get('/authentication/refresh/');
    }
});