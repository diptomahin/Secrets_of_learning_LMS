import { AuthContext } from "../Providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import useAxios from "./UseAxios";

const UseLoggedUser = () => {
    const {user} = useContext(AuthContext)
    const axiosPublic = useAxios();
    const { data={}, isLoading,  refetch} = useQuery({
        queryKey: ['savedUser'],
        enabled:!!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-users`);
            return res.data.find(savedUser => savedUser.email === user.email)
        }
    })
    return {
        userData: data,
        userDataLoading: isLoading,
        refetchUserData: refetch,
      };
};

export default UseLoggedUser;