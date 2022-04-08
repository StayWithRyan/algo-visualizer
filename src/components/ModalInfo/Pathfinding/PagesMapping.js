import GeneralInfo from './GeneralInfo';
import DFSInfo from './DFSInfo';
import BFSInfo from './BFSInfo';
import BestFirstSearchInfo from './BestFirstSearchInfo';
import AStarInfo from './AStarInfo';

let PathfindingPagesMapping = [
    {
        page : <GeneralInfo/>,
        name: "Загальна інформація"
    },
    {
        page : <DFSInfo/>,
        name: "Пошук у глибину"
    },
    {
        page : <BFSInfo/>,
        name: "Пошук у ширину (Алгоритм Дейкстри)"
    },
    {
        page : <BestFirstSearchInfo/>,
        name: "Пошук 'Найкращий - перший'"
    },
    {
        page : <AStarInfo/>,
        name: "Алгоритм пошуку A*"
    }
];

export {PathfindingPagesMapping};