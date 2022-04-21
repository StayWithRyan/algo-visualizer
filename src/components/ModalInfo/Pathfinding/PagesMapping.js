import GeneralInfo from './GeneralInfo';
import DFSInfo from './DFSInfo';
import BFSInfo from './BFSInfo';
import BestFirstSearchInfo from './BestFirstSearchInfo';
import AStarInfo from './AStarInfo';

import PathfindingConstants from '../../../screens/PathfindingPage/constants';

let PathfindingPagesMapping = [
    {
        page: <GeneralInfo/>,
        name: "Загальна інформація про пошук шляху"
    },
    {
        page: <AStarInfo/>,
        name: PathfindingConstants.AStartName
    },
    {
        page: <BestFirstSearchInfo/>,
        name: PathfindingConstants.BestFirstSearchName
    },
    {
        page: <DFSInfo/>,
        name: PathfindingConstants.DFSName
    },
    {
        page: <BFSInfo/>,
        name: PathfindingConstants.BFSName
    }
];

export {PathfindingPagesMapping};