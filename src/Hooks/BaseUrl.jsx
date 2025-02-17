import axios from 'axios';
import React from 'react'
// https://car-master-backend.vercel.app/
// http://localhost:5000/
const BaseUrl = () => {
    const link = axios.create({
        baseURL: 'https://car-master-backend.vercel.app/',
    });
    return link
}

export default BaseUrl