import Constants from "../../constants";
import './style.css';
import NavLink from "../../components/NavLink";
import { Link } from "react-router-dom";
import stringSearchinglogo from '../../icons/search-engine.png';
import pathfindingLogo from '../../icons/maze.png';
import sortingLogo from '../../icons/sort.png';
import treeBasedLogo from '../../icons/hierarchical-structure.png';

function HomePage() {

  return (
    <div className="homePage" style = {{minWidth: `${Constants.minAppWidth}px`, backgroundColor: Constants.mainBackground, height: "100vh"}}>

        <div className='NavBar'>
            <Link style={{ textDecoration: "none"}} to="/sorting">
                <NavLink id={1} text={Constants.sortingPageTitle} logo={sortingLogo}/>
            </Link>
            <Link style={{ textDecoration: "none"}} to="/string-searching">
                <NavLink id={2} text={Constants.stringsearchingPageTitle} logo={stringSearchinglogo}/>
            </Link>
        </div>
        <div className='NavBar'>
            <Link style={{ textDecoration: "none"}} to="/tree-based">
                <NavLink id={3} text={Constants.treeBasedPageTitle} logo={treeBasedLogo}/>
            </Link>
            <Link style={{ textDecoration: "none"}} to="/pathfinding">
                <NavLink id={4} text={Constants.pathfindingPageTitle} logo={pathfindingLogo}/>
            </Link>
        </div>
    </div>
  );
}

export default HomePage;