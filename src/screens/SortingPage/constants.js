import Constants from "../../constants"

const SortingConstants = {
    sleepMin: 25,
    sleepMax: 1000,
    sleepDefault: 550,
    sleepStep: 75,

    defaultColor: Constants.blueColor,
    checkingColor: Constants.yellowColor,
    swappingColor: Constants.crimsonColor,

    arraySizeMin: 10,
    arraySizeMax: 50,
    arraySizeDefault: 10,
    arraySizeStep: 10,


    BubbleSortName: "Сортування бульбашкою",
    CocktailSortName: "Сортування змішуванням",
    SelectionSortName: "Сортування простою вибіркою",
    InsertionSortName: "Сортування включенням",
    GnomeSortName: "Сортування гнома",
    ShellSortName: "Сортування Шелла",
    MergeSortName: "Сортування злиттям",
    QuickSortName: "Швидке сортування",
    HeapSortName: "Пірамідальне сортування"
}

export default SortingConstants;