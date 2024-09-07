import axios from "axios";  


export const apiClient = axios.create({
    baseURL:"localhost",
    headers:{
        'Content-Type':"application/json"
    },
    withCredentials:true
})