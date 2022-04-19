import Constants from "./constants";
import {
    Routes,
    Route,
} from "react-router-dom";
import PathfindingPage from "./screens/PathfindingPage";
import SortingPage from "./screens/SortingPage";
import StringsearchingPage from "./screens/StringsearchingPage";
import TreeBasedPage from "./screens/TreeBasedPage";
import HomePage from "./screens/HomePage";

function App() {
    return (
        <div style = {{backgroundColor: Constants.mainBackground, height: "100vh"}}>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/sorting" element={<SortingPage/>}/>
                <Route path="/string-searching" element={<StringsearchingPage/>}/>
                <Route path="/tree-based" element={<TreeBasedPage/>}/>
                <Route path="/pathfinding" element={<PathfindingPage/>}/>
            </Routes>
        </div>
    );
}

export default App;
