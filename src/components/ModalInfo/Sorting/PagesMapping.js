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

import SortingConstants from '../../../screens/SortingPage/constants';

let SortingPagesMapping = [
    {
        page: <GeneralInfo/>,
        name: "Загальна інформація про сортування"
    },
    {
        page: <BubbleSortInfo/>,
        name: SortingConstants.BubbleSortName
    },
    {
        page: <CocktailSortInfo/>,
        name: SortingConstants.CocktailSortName
    },
    {
        page: <SelectionSortInfo/>,
        name: SortingConstants.SelectionSortName
    },
    {
        page: <InsertionSortInfo/>,
        name: SortingConstants.InsertionSortName
    },
    {
        page: <GnomeSortInfo/>,
        name: SortingConstants.GnomeSortName
    },
    {
        page: <ShellSortInfo/>,
        name: SortingConstants.ShellSortName
    },
    {
        page: <MergeSortInfo/>,
        name: SortingConstants.MergeSortName
    },
    {
        page: <QuickSortInfo/>,
        name: SortingConstants.QuickSortName
    },
    {
        page: <HeapSortInfo/>,
        name: SortingConstants.HeapSortName
    }
];

export {SortingPagesMapping};