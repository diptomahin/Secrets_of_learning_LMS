import { useQuery } from "@tanstack/react-query";
import useAxios from "./UseAxios";

const UseUsers = () => {

    const axiosPublic = useAxios();
        const {
            data = [],
            isPending,
            isLoading,
            refetch,
          } = useQuery({
        queryKey: ['all users'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-users`);
            return res.data;
        }
    })

      return {
        allUser: data,
        refetchAllUserData : refetch,
        AllUserDataIsLoading : isLoading,
        AllUserDataIsPending : isPending,
      };

};

export default UseUsers;