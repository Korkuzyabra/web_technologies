import NavBar from "../components/NavBar";
import BuildingsGrid from "./components/BuildingsGrid";
import Footer from "../components/Footer";


function List() {
    return (
        <div>
            <NavBar active="2"/>
            <BuildingsGrid/>
            <Footer/>
        </div>
    );
}
export default List;