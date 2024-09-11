import { useQuery } from "@tanstack/react-query";
import useAxios from "./UseAxios";

const UseCourses = () => {

    const axiosPublic = useAxios();
        const {
            data = [],
            isPending,
            isLoading,
            refetch,
          } = useQuery({
        queryKey: ['all courses'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-courses`);
            return res.data;
        }
    })

      return {
        allCourses: data,
        refetchAllCoursesData : refetch,
        AllCoursesDataIsLoading : isLoading,
        AllCoursesDataIsPending : isPending,
      };

};

export default UseCourses;