import { useQuery } from "@tanstack/react-query";
import useAxios from "./UseAxios";

const UseUsers = () => {

    const axiosPublic = useAxios();
    const { data: savedUsers = [], refetch} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/users`);
            return res.data;
        }
    })
    return {savedUsers, refetch};
};

export default UseUsers;