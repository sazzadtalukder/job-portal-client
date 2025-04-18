import axios from 'axios';
import React, { useEffect } from 'react';
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';
const axiosInstance = axios.create({
    baseURL: 'https://job-portal-server-again.vercel.app',
    withCredentials: true,
    headers: {}
})
const useAxiosSecure = () => {
    const {logOut} = useAuth();
    const navigate = useNavigate();
    useEffect(()=>{
        axiosInstance.interceptors.response.use(response =>{
            return response
        },error=>{
            // console.log('error caught in interceptor',error)
            if(error.status == 401 || error.status == 403){
                // console.log('need to log out user')
                logOut()
                .then(()=>{
                    // console.log('logged out from interceptor ');
                    navigate('/login')
                })
                .catch(er=>{
                    // console.log('error detected in interceptor when trying to log out',er)
                })
            }
            return Promise.reject(error)
        })
    },[])
    return axiosInstance;
};

export default useAxiosSecure;