import Constants from "../../constants"

const PathfindingConstants = {
    sleepMin: 25,
    sleepMax: 1000,
    sleepDefault: 250,
    sleepStep: 75,


    generatingDelayTimeout: 10,

    gridColor: Constants.textColor,
    emptyColor: "white",
    blockColor: [Constants.blueColor, Constants.darkCrimsonColor],
    checkingColor: [Constants.crimsonColor, Constants.pinkColor],
    pathColor: [Constants.darkCrimsonColor, Constants.crimsonColor],
    startColor: Constants.darkGreenColor,
    targetColor: Constants.darkGreenColor,

    elementSize: 30,

    DFSName: "Пошук у глибину",
    BFSName: "Пошук у ширину (Алгоритм Дейкстри)",
    BestFirstSearchName: "Пошук 'Найкращий - перший'",
    AStartName: "Алгоритм пошуку A*",

    RecursiveDivisionName: "Рекурсивний поділ",
    EllersAlgorithmName: "Алгоритм Ейлера",
    BasicRandomMazeName: "Випадкові блоки"
}

export default PathfindingConstants;