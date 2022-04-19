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
    regularColor: [Constants.mainBackground, Constants.blueColor],
    visitedColor: [Constants.blueColor, Constants.crimsonColor],
    addedColor: Constants.lightGreenColor,
    checkingColor: Constants.yellowColor,
    swappingColor: Constants.crimsonColor,
    doneColor: [Constants.lightGreenColor, Constants.greenColor],

    LNRTraversalName: "Змішаний обхід (LNR)",
    NLRTraversalName: "Низхідний обхід (NLR)",
    LRNTraversalName: "Висхідний обхід (LRN)",
    HeapSortName: "Пірамідальне сортування",
    TreeSortName: "Сортування бінарним деревом",
    TournamentSortName: "Метод вибірки з дерева",

    font: "36px serif"
}

export default TreeBasedConstants;