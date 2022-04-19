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
        name: "Загальна інформація"
    },
    {
        page : <NLRTraversalInfo/>,
        name: "Низхідний обхід (NLR)"
    },
    {
        page : <LNRTraversalInfo/>,
        name: "Змішаний обхід (LNR)"
    },
    {
        page : <LRNTraversalInfo/>,
        name: "Висхідний обхід (LRN)"
    },
    {
        page : <HeapSortInfo/>,
        name: "Пірамідальне сортування"
    },
    {
        page : <TreeSortInfo/>,
        name: "Сортування бінарним деревом"
    },
    {
        page : <TournamentSortInfo/>,
        name: "Метод вибірки з дерева"
    }
];

export {TreeBasedPagesMapping};