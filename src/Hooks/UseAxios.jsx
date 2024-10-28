import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://82.112.227.89:5000'
})

const useAxios = () => {
    return axiosPublic;
};

export default useAxios;

