import GeneralInfo from './GeneralInfo';
import DFSInfo from './DFSInfo';
import BFSInfo from './BFSInfo';
import BestFirstSearchInfo from './BestFirstSearchInfo';
import AStarInfo from './AStarInfo';
import RecursiveDivisionInfo from './RecursiveDivisionInfo';
import BinaryTreeAlgorithmInfo from './BinaryTreeAlgorithmInfo';
import BasicRandomMazeInfo from './BasicRandomMazeInfo';

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
    },
    {
        page: <RecursiveDivisionInfo/>,
        name: "Генерація: " + PathfindingConstants.RecursiveDivisionName
    },
    {
        page: <BinaryTreeAlgorithmInfo/>,
        name: "Генерація: " + PathfindingConstants.BinaryTreeAlgorithmName
    },
    {
        page: <BasicRandomMazeInfo/>,
        name: "Генерація: " + PathfindingConstants.BasicRandomMazeName
    }
];

export {PathfindingPagesMapping};