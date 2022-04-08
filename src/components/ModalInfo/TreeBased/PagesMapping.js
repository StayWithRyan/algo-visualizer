import GeneralInfo from './GeneralInfo';
import LNRTraversalInfo from './LNRTraversalInfo';
import NLRTraversalInfo from './NLRTraversalInfo';
import LRNTraversalInfo from './LRNTraversalInfo';
import HeapSortInfo from './HeapSortInfo';
import TreeSortInfo from './TreeSortInfo';
import TournamentSortInfo from './TournamentSortInfo';

let TreeBasedPagesMapping = [
    {
        page : <GeneralInfo/>,
        name: "General Info"
    },
    {
        page : <LNRTraversalInfo/>,
        name: "LNRTraversalInfo"
    },
    {
        page : <NLRTraversalInfo/>,
        name: "NLRTraversalInfo"
    },
    {
        page : <LRNTraversalInfo/>,
        name: "LRNTraversalInfo"
    },
    {
        page : <HeapSortInfo/>,
        name: "HeapSortInfo"
    },
    {
        page : <TreeSortInfo/>,
        name: "TreeSortInfo"
    },
    {
        page : <TournamentSortInfo/>,
        name: "TournamentSortInfo"
    }
];

export {TreeBasedPagesMapping};