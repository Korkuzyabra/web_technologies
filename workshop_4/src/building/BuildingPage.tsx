import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Building from "./Building";


const BuildingPage = () => {
    return (
        <div>
            <NavBar active="1"/>
            <Building/>
            <Footer/>
        </div>
    );
}
export default BuildingPage;