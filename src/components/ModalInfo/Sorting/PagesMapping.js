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
        name: "Загальна інформація"
    },
    {
        page : <BubbleSortInfo/>,
        name: "Сортування бульбашкою"
    },
    {
        page : <CocktailSortInfo/>,
        name: "Сортування змішуванням"
    },
    {
        page : <SelectionSortInfo/>,
        name: "Сортування вибором"
    },
    {
        page : <InsertionSortInfo/>,
        name: "Сортування включенням"
    },
    {
        page : <GnomeSortInfo/>,
        name: "Сортування гнома"
    },
    {
        page : <ShellSortInfo/>,
        name: "Сортування Шелла"
    },
    {
        page : <MergeSortInfo/>,
        name: "Сортування злиттям"
    },
    {
        page : <QuickSortInfo/>,
        name: "Швидке сортування"
    },
    {
        page : <HeapSortInfo/>,
        name: "Пірамідальне сортування"
    }
];

export {SortingPagesMapping};