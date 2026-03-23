import axios from 'axios';
import { auth } from '../../firebase.init';
import { API_BASE_URL } from '../config/appConfig';

const BaseUrl = () => {
    const link = axios.create({
        baseURL: API_BASE_URL,
    });

    link.interceptors.request.use((config) => {
        const email = auth.currentUser?.email;
        if (email) {
            config.headers['x-user-email'] = email;
        }
        return config;
    });

    return link
}

export default BaseUrl
