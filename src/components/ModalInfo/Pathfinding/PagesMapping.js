import GeneralInfo from './GeneralInfo';
import DFSInfo from './DFSInfo';
import BFSInfo from './BFSInfo';
import BestFirstSearchInfo from './BestFirstSearchInfo';
import AStarInfo from './AStarInfo';

let PathfindingPagesMapping = [
    {
        page : <GeneralInfo/>,
        name: "General Info"
    },
    {
        page : <DFSInfo/>,
        name: "DFSInfo"
    },
    {
        page : <BFSInfo/>,
        name: "BFSInfo"
    },
    {
        page : <BestFirstSearchInfo/>,
        name: "BestFirstSearchInfo"
    },
    {
        page : <AStarInfo/>,
        name: "AStarInfo"
    }
];

export {PathfindingPagesMapping};