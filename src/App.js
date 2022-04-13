import Constants from "./constants";
import './App.css';
import NavLink from './components/NavLink';

import PathfindingPage from "./screens/PathfindingPage";
import SortingPage from "./screens/SortingPage";
import StringsearchingPage from "./screens/StringsearchingPage";
import TreeBasedPage from "./screens/TreeBasedPage";
import HomePage from "./screens/HomePage";


import {useState, useEffect, useRef, useCallback} from 'react';

function App() {
    const [selectedPage, setSelectedPage] = useState(Constants.homePageTitle);

    const handlePageChange = (name) => {
        setSelectedPage(name);
    }

    const handleHomePage = () => {
        setSelectedPage(Constants.homePageTitle);
    }

    return (
        <div style = {{backgroundColor: Constants.mainBackground, height: "100vh"}}>
            {selectedPage === Constants.homePageTitle && <HomePage setPage={handlePageChange}/>}
            {selectedPage === Constants.pathfindingPageTitle && <PathfindingPage goBack={handleHomePage}/>}
            {selectedPage === Constants.sortingPageTitle && <SortingPage goBack={handleHomePage}/>}
            {selectedPage === Constants.stringsearchingPageTitle && <StringsearchingPage goBack={handleHomePage}/>}
            {selectedPage === Constants.treeBasedPageTitle && <TreeBasedPage goBack={handleHomePage}/>}
        </div>
    );
}

export default App;
