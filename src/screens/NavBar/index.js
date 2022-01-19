import './style.css';
import PathfindingPage from "../PathfindingPage";
import SortingPage from "../SortingPage";
import StringsearchingPage from "../StringsearchingPage";
import NavLink from "../../components/NavLink"

import {useState} from 'react';

function NavBar() {
    const [selectedPage, setSelectedPage] = useState("Pathfinding");

    const onSelectPathfindingPage = () => {
        setSelectedPage("Pathfinding")
    }
    const onSelectSortingPage = () => {
        setSelectedPage("Sorting")
    }
    const onSelectStringsearchingPage = () => {
        setSelectedPage("String-searching")
    }
    return (
        <>
            <div className="NavBar">
                <NavLink text = "Pathfinding" onSelect = {onSelectPathfindingPage} isSelected = {selectedPage == "Pathfinding"}/>
                <NavLink text = "Sorting" onSelect = {onSelectSortingPage} isSelected = {selectedPage == "Sorting"}/>
                <NavLink text = "String-searching" onSelect = {onSelectStringsearchingPage} isSelected = {selectedPage == "String-searching"}/>
            </div>
            {selectedPage == "Pathfinding" && <PathfindingPage/>}
            {selectedPage == "Sorting" && <SortingPage/>}
            {selectedPage == "String-searching" && <StringsearchingPage/>}
        </>
    );
}

export default NavBar;