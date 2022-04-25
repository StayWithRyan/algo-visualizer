import Constants from "../../constants"

const PathfindingConstants = {
    sleepMin: 25,
    sleepMax: 1000,
    sleepDefault: 250,
    sleepStep: 75,


    generatingDelayTimeout: 10,

    gridColor: Constants.textColor,
    emptyColor: "white",
    blockColor: [Constants.zimaBlue, Constants.darkCrimsonColor],
    checkingColor: [Constants.crimsonColor, Constants.pinkColor],
    pathColor: [Constants.darkCrimsonColor, Constants.crimsonColor],
    startColor: Constants.darkGreenColor,
    targetColor: Constants.darkGreenColor,

    elementSize: 30,

    DFSName: "Пошук у глибину",
    BFSName: "Пошук у ширину",
    BestFirstSearchName: `Жадібний пошук "Найкращий - перший"`,
    AStartName: "Алгоритм пошуку A*",

    RecursiveDivisionName: "Рекурсивний поділ",
    BinaryTreeAlgorithmName: "Бінарне дерево",
    BasicRandomMazeName: "Випадкові блоки"
}

export default PathfindingConstants;