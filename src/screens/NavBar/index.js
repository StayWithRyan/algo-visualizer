import './style.css';
import PathfindingPage from "../PathfindingPage";
import SortingPage from "../SortingPage";
import StringsearchingPage from "../StringsearchingPage";
import TreeBasedPage from "../TreeBasedPage";
import NavLink from "../../components/NavLink"

import {useState} from 'react';

import Defaults from '../../defaults';

function NavBar() {
    const pagesMapping = {
        "Pathfinding": <PathfindingPage/>,
        "Sorting": <SortingPage/>,
        "String-searching": <StringsearchingPage/>,
        "Tree Based": <TreeBasedPage/>
    }
    
    const pages = [];
    for (let property in pagesMapping) {
        pages.push(property);
    }

    const [selectedPage, setSelectedPage] = useState(pages[3]);
    
    const onSelectPage = (page) => {
        setSelectedPage(page);
    }
    
    return (
        <>
            <div className="NavBar" style = {{height: Defaults.navBarHeight, backgroundColor: Defaults.navBarColor}} >
                {pages.map(
                    page => <NavLink key = {page} text = {page} onSelect = {() => onSelectPage(page)} isSelected = {selectedPage === page}/>
                )}
            </div>
            {pagesMapping[selectedPage]}
        </>
    );
}

export default NavBar;