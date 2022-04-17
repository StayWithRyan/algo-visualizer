import Constants from "../../constants";
import './style.css';
import NavLink from "../../components/NavLink";

import stringSearchinglogo from '../../icons/search-engine.png';
import pathfindingLogo from '../../icons/maze.png';
import sortingLogo from '../../icons/sort.png';
import treeBasedLogo from '../../icons/hierarchical-structure.png';

function HomePage({setPage}) {

  return (
    <div className="homePage" style = {{minWidth: `${Constants.minAppWidth}px`, backgroundColor: Constants.mainBackground, height: "100vh"}}>

        <div className='NavBar'>
            <NavLink id ={1} text={Constants.sortingPageTitle} logo={sortingLogo} onClick={() => {setPage(Constants.sortingPageTitle)}}/>
            <NavLink id ={2} text={Constants.stringsearchingPageTitle} logo={stringSearchinglogo} onClick={() => setPage(Constants.stringsearchingPageTitle)}/>
        </div>
        <div className='NavBar'>
            <NavLink id ={3} text={Constants.treeBasedPageTitle}  logo={treeBasedLogo} onClick={() => setPage(Constants.treeBasedPageTitle)}/>
            <NavLink id ={4} text={Constants.pathfindingPageTitle}  logo={pathfindingLogo} onClick={() => setPage(Constants.pathfindingPageTitle)}/>
        </div>
    </div>
  );
}

export default HomePage;