import Constants from "../../constants"

const PathfindingConstants = {
    sleepMin: 25,
    sleepMax: 1000,
    sleepDefault: 250,
    sleepStep: 75,


    generatingDelayTimeout: 10,

    gridColor: Constants.greyColor,
    emptyColor: "black",
    blockColor: [Constants.blueColor, Constants.darkСrimsonColor],
    checkingColor: ["black", Constants.pinkColor],
    pathColor: ["black", Constants.сrimsonColor],
    startColor: Constants.greenColor,
    targetColor: Constants.greenColor,

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