import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://secrets-of-learning-server.onrender.com'
})

const useAxios = () => {
    return axiosPublic;
};

export default useAxios;

