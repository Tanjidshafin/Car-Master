import axios from 'axios';
import React from 'react'

const BaseUrl = () => {
    const link = axios.create({
        baseURL: 'http://localhost:5000/',
    });
    return link
}

export default BaseUrl