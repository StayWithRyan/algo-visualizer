import GeneralInfo from './GeneralInfo';
import BubbleSortInfo from './BubbleSortInfo';
import CocktailSortInfo from './CocktailSortInfo';
import SelectionSortInfo from './SelectionSortInfo';
import InsertionSortInfo from './InsertionSortInfo';
import GnomeSortInfo from './GnomeSortInfo';
import ShellSortInfo from './ShellSortInfo';
import MergeSortInfo from './MergeSortInfo';
import QuickSortInfo from './QuickSortInfo';
import HeapSortInfo from './HeapSortInfo';

let SortingPagesMapping = [
    {
        page : <GeneralInfo/>,
        name: "General Info"
    },
    {
        page : <BubbleSortInfo/>,
        name: "BubbleSortInfo"
    },
    {
        page : <CocktailSortInfo/>,
        name: "CocktailSortInfo"
    },
    {
        page : <SelectionSortInfo/>,
        name: "SelectionSortInfo"
    },
    {
        page : <InsertionSortInfo/>,
        name: "InsertionSortInfo"
    },
    {
        page : <GnomeSortInfo/>,
        name: "GnomeSortInfo"
    },
    {
        page : <ShellSortInfo/>,
        name: "ShellSortInfo"
    },
    {
        page : <MergeSortInfo/>,
        name: "MergeSortInfo"
    },
    {
        page : <QuickSortInfo/>,
        name: "QuickSortInfo"
    },
    {
        page : <HeapSortInfo/>,
        name: "HeapSortInfo"
    }
];

export {SortingPagesMapping};