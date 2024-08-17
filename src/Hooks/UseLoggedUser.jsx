import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import useAxios from "./UseAxios";

const UseLoggedUser = () => {
    const {user} = useContext(AuthContext)
    const axiosPublic = useAxios();
    const { data: savedUser = {}, isLoading: userLoading} = useQuery({
        queryKey: ['savedUser'],
        enabled:!!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/users`);
            return res.data.find(savedUser => savedUser.email === user.email)
        }
    })
    return {savedUser, userLoading}
};

export default UseLoggedUser;