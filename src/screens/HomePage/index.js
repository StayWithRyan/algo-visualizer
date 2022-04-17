import Constants from "../../constants";
import './style.css';
import NavLink from "../../components/NavLink";
import { Link } from "react-router-dom";
import stringSearchinglogo from '../../icons/search-engine.png';
import pathfindingLogo from '../../icons/maze.png';
import sortingLogo from '../../icons/sort.png';
import treeBasedLogo from '../../icons/hierarchical-structure.png';
import { useNavigate } from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    return (
        <div className="homePage" style = {{minWidth: `${Constants.minAppWidth}px`, backgroundColor: Constants.mainBackground, height: "100vh"}}>

            <div className='NavBar'>
                <NavLink id={1} text={Constants.sortingPageTitle} logo={sortingLogo} onClick={() => navigate("/sorting")}/>
                <NavLink id={2} text={Constants.stringsearchingPageTitle} logo={stringSearchinglogo} onClick={() => navigate("/string-searching")}/>
            </div>
            <div className='NavBar'>
                <NavLink id={3} text={Constants.treeBasedPageTitle} logo={treeBasedLogo} onClick={() => navigate("/tree-based")}/>
                <NavLink id={4} text={Constants.pathfindingPageTitle} logo={pathfindingLogo} onClick={() => navigate("/pathfinding")}/>
            </div>
        </div>
    );
}

export default HomePage;