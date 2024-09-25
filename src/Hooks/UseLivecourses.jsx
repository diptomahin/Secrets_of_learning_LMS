import { useQuery } from "@tanstack/react-query";
import useAxios from "./UseAxios";

const UseLiveCourses = () => {

    const axiosPublic = useAxios();
        const {
            data = [],
            isPending,
            isLoading,
            refetch,
          } = useQuery({
        queryKey: ['Live courses'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/live-courses`);
            return res.data;
        }
    })

      return {
        liveCourses: data,
        refetchAllCoursesData : refetch,
        AllCoursesDataIsLoading : isLoading,
        AllCoursesDataIsPending : isPending,
      };

};

export default UseLiveCourses;