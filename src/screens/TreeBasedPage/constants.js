import Constants from "../../constants"

const TreeBasedConstants = {
    sleepMin: 25,
    sleepMax: 1000,
    sleepDefault: 550,
    sleepStep: 75,


    treeSizeMin: 5,
    treeSizeDefault: 15,
    treeSizeStep: 1,

    elementSize: 50,

    textColor: "black",
    regularColor: ["black", Constants.blueColor],
    visitedColor: [Constants.blueColor, Constants.сrimsonColor],
    addedColor: Constants.lightGreenColor,
    checkingColor: Constants.yellowColor,
    swappingColor: Constants.сrimsonColor,
    doneColor: [Constants.lightGreenColor, Constants.greenColor],
    invisibleColor: "white",

    LNRTraversalName: "Обхід: серединний порядок (LNR)",
    NLRTraversalName: "Обхід: прямий порядок (NLR)",
    LRNTraversalName: "Обхід: зворотній порядок (LRN)",
    HeapSortName: "Пірамідальне сортування",
    TreeSortName: "Сортування бінарним деревом",
    TournamentSortName: "Метод вибірки з дерева",

    font: "36px serif"
}

export default TreeBasedConstants;