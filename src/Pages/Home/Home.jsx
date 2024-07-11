import Banner from "../../Components/Home_Comp/Banner";
import Choice from "../../Components/Home_Comp/Choice";
import HomeRiviews from "../../Components/Home_Comp/HomeRiviews";
import Start from "../../Components/Home_Comp/Start";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Start></Start>
            <Choice></Choice>
            <HomeRiviews></HomeRiviews>
        </div>
    );
};

export default Home;