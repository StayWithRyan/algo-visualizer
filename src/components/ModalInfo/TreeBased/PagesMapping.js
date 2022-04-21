import GeneralInfo from './GeneralInfo';
import LNRTraversalInfo from './LNRTraversalInfo';
import NLRTraversalInfo from './NLRTraversalInfo';
import LRNTraversalInfo from './LRNTraversalInfo';
import HeapSortInfo from './HeapSortInfo';
import TreeSortInfo from './TreeSortInfo';
import TournamentSortInfo from './TournamentSortInfo';

import TreeBasedConstants from '../../../screens/TreeBasedPage/constants';

let TreeBasedPagesMapping = [
    {
        page : <GeneralInfo/>,
        name: "Загальна інформація про алгоритми на деревах"
    },
    {
        page : <NLRTraversalInfo/>,
        name: TreeBasedConstants.NLRTraversalName
    },
    {
        page : <LNRTraversalInfo/>,
        name: TreeBasedConstants.LNRTraversalName
    },
    {
        page : <LRNTraversalInfo/>,
        name: TreeBasedConstants.LRNTraversalName
    },
    {
        page : <HeapSortInfo/>,
        name: TreeBasedConstants.HeapSortName
    },
    {
        page : <TreeSortInfo/>,
        name: TreeBasedConstants.TreeSortName
    },
    {
        page : <TournamentSortInfo/>,
        name: TreeBasedConstants.TournamentSortName
    }
];

export {TreeBasedPagesMapping};