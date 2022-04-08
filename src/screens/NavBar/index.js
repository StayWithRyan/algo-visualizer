import './style.css';
import PathfindingPage from "../PathfindingPage";
import SortingPage from "../SortingPage";
import StringsearchingPage from "../StringsearchingPage";
import TreeBasedPage from "../TreeBasedPage";
import NavLink from "../../components/NavLink"

import {useState} from 'react';

import Constants from '../../constants';

function NavBar() {

    const pages = [
        {
            page: <PathfindingPage/>,
            name: Constants.pathfindingPageTitle
        },
        {
            page: <SortingPage/>,
            name: Constants.sortingPageTitle
        },
        {
            page: <StringsearchingPage/>,
            name: Constants.stringsearchingPageTitle
        },
        {
            page: <TreeBasedPage/>,
            name: Constants.treeBasedPageTitle
        }
    ];

    const [selectedPage, setSelectedPage] = useState(pages[0]);
    
    const onSelectPage = (page) => {
        setSelectedPage(page);
    }
    
    return (
        <>
            <div className="NavBar" style = {{height: Constants.navBarHeight, backgroundColor: Constants.navBarColor}} >
                {pages.map(
                    page => <NavLink key = {page.name} text = {page.name} onSelect = {() => onSelectPage(page)} isSelected = {selectedPage.name === page.name}/>
                )}
            </div>
            {selectedPage.page}
        </>
    );
}

export default NavBar;