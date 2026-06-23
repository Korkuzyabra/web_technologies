import Gallery from "./components/Gallery";
import Content from "./components/Content";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function Main() {
    return (
        <div>
            <NavBar active="1"/>
            <Gallery/>
            <Content/>
            <Footer/>
        </div>
    );
}
export default Main;