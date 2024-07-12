import Banner from "../../Components/Home_Comp/Banner";
import Choice from "../../Components/Home_Comp/Choice";
import HomeCourses from "../../Components/Home_Comp/HomeCourses";
import HomeRiviews from "../../Components/Home_Comp/HomeRiviews";
import Start from "../../Components/Home_Comp/Start";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Start></Start>
            <Choice></Choice>
            <HomeCourses></HomeCourses>
            <HomeRiviews></HomeRiviews>
        </div>
    );
};

export default Home;