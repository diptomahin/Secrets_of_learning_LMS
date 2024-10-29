import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://api.ishaan.website'
})

const useAxios = () => {
    return axiosPublic;
};

export default useAxios;

