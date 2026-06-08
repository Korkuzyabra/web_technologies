import Gallery from "./components/Gallery";
import Content from "./components/Content";
import NavBar from "../components/NavBar";

function Main() {
    return (
        <div>
            <NavBar active="1"/>
            <Gallery/>
            <Content/>
        </div>
    );
}
export default Main;