import axios from 'axios';
import React from 'react'
// https://car-master-backend.vercel.app/

const BaseUrl = () => {
    const link = axios.create({
        baseURL: 'http://localhost:5000/',
    });
    return link
}

export default BaseUrl