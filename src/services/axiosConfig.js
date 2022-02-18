import React from "react";
import axios from "axios";
import {env} from '../environment/environment'
import {useSelector} from "react-redux";

const chatApi = axios.create({
    baseURL: env.baseUrl,
    withCredentials: true,
})

chatApi.interceptors.request.use(function (config) {
    // Do something before request is sent
    let state = localStorage.getItem('persist:runzen_auth')
    let token = ''
    if (state) {
        state = JSON.parse(state)
    }

    if (state.token) {
        token = JSON.parse(state.token)
    }

    if (!config.headers || !config.headers.Authorization) {
        if (token) {
            if (config.headers) {
                config.headers = {
                    ...config.headers,
                    'Authorization': 'Bearer ' + token
                }
            } else {
                config.headers = {
                    'Authorization': 'Bearer ' + token
                }
            }
        }
    }

    return config;
});

export {chatApi}
